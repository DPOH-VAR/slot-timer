import React, {Component, Fragment, PureComponent} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import addSlotTime from "../actionCreators/addSlotTime";
import clearSlot from "../actionCreators/clearSlot";
import closeSlotOptionsModal from "../actionCreators/closeSlotOptionsModal";
import openSlotOptionsModal from "../actionCreators/openSlotOptionsModal";
import setSlotTime from "../actionCreators/setSlotTime";
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
			<div onClick={this.close} className={classNames("modalDialog", {open: modalOpen})}>
				<div onClick={this.stopPropagation} className="center">
					<div className="btn-group">
						<Slot slot={slot} index={index}/>
					</div>
					<div className="btn-group">
						<button className="btn btn-blue btn-long" onClick={this.addTime(30*60*1000)}>+ 30:00</button>
						<button className="btn btn-blue btn-long" onClick={this.addTime(- 30*60*1000)}>- 30:00</button>
					</div>

					<div className="btn-group">
						<button className="btn btn-blue btn-tall" onClick={this.setTime(90*60*1000)}>1:30</button>
						<button className="btn btn-blue btn-tall" onClick={this.setTime(120*60*1000)}>2:00</button>
						<button className="btn btn-blue btn-tall" onClick={this.setTime(150*60*1000)}>2:30</button>
						<button className="btn btn-blue btn-tall" onClick={this.setTime(180*60*1000)}>3:00</button>
					</div>

					<div>
						<button className="btn btn-blue btn-long" onClick={this.close} type="button">
							Закрыть
						</button>
						<button className="btn btn-blue btn-long" onClick={this.clearSlot} disabled={!slotWait && !slotLate}>
							Очистить
						</button>
					</div>
				</div>
			</div>
		)
	}

	stopPropagation = (event) => {
		event.stopPropagation();
	};

	addTime = (time) => {
		return () => {
			this.props.addSlotTime(this.props.index, time);
		}
	};

	setTime = (time) => {
		return () => {
			this.props.setSlotTime(this.props.index, time);
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
		addSlotTime: PropTypes.func,
		setSlotTime: PropTypes.func,
		clearSlot: PropTypes.func,
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
		setSlotTime: setSlotTime,
		clearSlot: clearSlot,
	}, dispatch)
}
