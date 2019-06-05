import React, {Component, Fragment, PureComponent} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import addSlotTime from "../actionCreators/addSlotTime";
import clearSlot from "../actionCreators/clearSlot";
import closeSlotOptionsModal from "../actionCreators/closeSlotOptionsModal";
import openSlotOptionsModal from "../actionCreators/openSlotOptionsModal";
import injectDate from "../HOCs/injectDate";
import {getSlotOptionsModalIndex, getSlots} from "../selectors/selectors";
import PropTypes from "prop-types";
import classNames from "classnames";
import Slot from "./Slot";

const timeodifierButtonsData = [
	{time: 10*1000, timeValue: '0:00:10'},
	{time: 30*60*1000, timeValue: '0:30:00'},
	{time: 60*60*1000, timeValue: '1:00:00'},
	{time: 90*60*1000, timeValue: '1:30:00'},
	{time: 120*60*1000, timeValue: '2:00:00'},
	{time: 150*60*1000, timeValue: '2:30:00'},
	{time: 180*60*1000, timeValue: '3:00:00'},
];

class SlotOptionsModal extends Component {
	render() {
		const {slot, index} = this.props;
		const modalOpen = index != null;
		const dateDiff = slot && slot.date ? slot.date - this.props.date : null;
		const slotWait = dateDiff != null && dateDiff > 0;
		const slotLate = dateDiff != null && dateDiff <= 0;
		return (
			<div className={classNames("modalDialog", {open: modalOpen})}>
				<div>
					<Slot slot={slot} index={index}/>
					{(slotWait || !slotLate) && <div>
						{timeodifierButtonsData.map(({time, timeValue}, key) => <div key={key}>
							<button onClick={this.addTime(time)}>+ {timeValue}</button>
						</div>)}
					</div>}

					{(slotWait || slotLate) && <div>
						<button onClick={this.clearSlot}>Очистить</button>
					</div>}


					<button onClick={this.close} type="button">
						Закрыть
					</button>
				</div>
			</div>
		)
	}

	addTime = (time) => {
		return () => {
			this.props.addSlotTime(this.props.index, time);
		}
	};

	clearSlot = () => {
		this.props.clearSlot(this.props.index);
	};

	close = () => {
		this.props.closeSlotOptionsModal()
	};

	static propTypes = {
		slot: PropTypes.object,
		index: PropTypes.number,
		closeSlotOptionsModal: PropTypes.func,
	};

}
export default injectDate('date')(connect(mapStateToProps, mapDispatchToProps)(SlotOptionsModal));

function mapStateToProps(state) {
	const index = getSlotOptionsModalIndex(state);
	const slots = getSlots(state);
	return {
		index: index,
		slot: slots[index],
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		closeSlotOptionsModal: closeSlotOptionsModal,
		addSlotTime: addSlotTime,
		clearSlot: clearSlot,
	}, dispatch)
}
