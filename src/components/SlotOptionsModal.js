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
						<button onClick={this.addTime(10*1000)}>+10 cекунд</button>
						<button onClick={this.addTime(30*60*1000)}>+30 минут</button>
						<button onClick={this.addTime(60*60*1000)}>+60 минут</button>
						<button onClick={this.addTime(90*60*1000)}>+90 минут</button>
						<button onClick={this.addTime(120*60*1000)}>+120 минут</button>
						<button onClick={this.clearSlot}>Очистить</button>
					</div>}
					{(slotLate) && <div>
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
