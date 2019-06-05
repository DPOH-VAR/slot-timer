import React, {Component, Fragment} from "react";
import {connect} from 'react-redux';
import {getSlotCount} from "../selectors/selectors";
import PropTypes from "prop-types";
import Alarm from "./Alarm";
import SlotOptionsModal from "./SlotOptionsModal";
import Slots from "./Slots";

class Main extends Component {
	render() {
		if (this.props.slotsCount <= 0) {
			return (<div>Все еще нет слотов</div>);
		}
		return <Fragment>
			<Slots/>
			<SlotOptionsModal/>
			<Alarm/>
		</Fragment>
	}

	static propTypes = {
		slotsCount: PropTypes.number,
	}
}


function mapStateToProps(state) {
	return {
		slotsCount: getSlotCount(state),
	}
}


export default connect(mapStateToProps)(Main);