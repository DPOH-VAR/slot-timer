import React, {Component, PureComponent} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import {getSlots} from "../selectors/selectors";
import PropTypes from "prop-types";
import openSlotOptionsModal from "../actionCreators/openSlotOptionsModal";
import injectDate from "../HOCs/injectDate";
import timeFormat from "../util/timeFormat";
import classNames from "classnames";

class Slot extends Component {
	render() {
		const {slot, index} = this.props;
		if (slot && slot.date != null) {
			return <SlotWithTime slot={slot} index={index} onClick={this.click}/>
		} else {
			return <EmptySlot slot={slot} index={index} onClick={this.click}/>
		}
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
export default connect(() => ({}), mapDispatchToProps)(Slot);

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		openSlotOptionsModal: openSlotOptionsModal,
	}, dispatch)
}

const SlotWithTime = injectDate('date')(class SlotWithTime extends PureComponent {
	render() {
		const {slot, index, onClick} = this.props;
		const dateDiff = slot && slot.date ? slot.date - this.props.date : null;
		const slotWait = dateDiff != null && dateDiff > 0;
		const slotLate = dateDiff != null && dateDiff <= 0;
		const slotDisplayTime = !(slotWait || slotLate) ? 0 : timeFormat(Math.abs(dateDiff));
		return (
			<a
				className={classNames("slot", {"late": slotLate, "wait": slotWait})}
				onClick={onClick}
			>
				<div className="slot-index">{index+1}</div>
				{ (slotWait || slotLate) && <div className="slot-time">
					{slotDisplayTime}
				</div>}
			</a>
		);
	}

	static propTypes = {
		slot: PropTypes.object,
		index: PropTypes.number,
		date: PropTypes.number,
	}
});

const EmptySlot = ({index, onClick}) => (
	<a className="slot" onClick={onClick}>
		<div className="slot-index">{index+1}</div>
	</a>
);