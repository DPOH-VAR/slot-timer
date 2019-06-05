import React, {PureComponent} from "react";
import injectDate from "../HOCs/injectDate";
import {getSlotDates} from "../selectors/selectors";
import audioSrc from '../static/alarm.mp3'
import {connect} from 'react-redux';
import PropTypes from "prop-types";

class Alarm extends PureComponent {

	audioRef = React.createRef();
	lastAlarmDate = Date.now();

	render() {
		return (
			<audio src={audioSrc} preload="auto" ref={this.audioRef} controls={false}/>
		);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const now = Date.now();
		const maxExpiredDate = Math.max(...this.props.dates.filter(date => date < now));
		if (maxExpiredDate > this.lastAlarmDate) {
			this.lastAlarmDate = now;
			this.alarm();
		}
	}

	alarm(){
		this.audioRef.current.currentTime = 0;
		this.audioRef.current.play();
	}

	static propTypes = {
		slot: PropTypes.object,
		index: PropTypes.number,
		openSlotOptionsModal: PropTypes.func,
	};

	click = () => {
		this.props.openSlotOptionsModal(this.props.index)
	}
}

function mapStateToProps(state){
	const dates = getSlotDates(state);
	return {
		dates: dates,
	}
}

export default injectDate('date')(connect(mapStateToProps)(Alarm));