import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import closeOptionsModal from "../actionCreators/closeOptionsModal";
import setEventDescription from "../actionCreators/setEventDescription";
import setEventLocation from "../actionCreators/setEventLocation";
import setEventTitle from "../actionCreators/setEventTitle";
import setSlotsCount from "../actionCreators/setSlotsCount";
import {getSlotsCount, getOptionsModalOpened, getOptions,} from "../selectors/selectors";
import PropTypes from "prop-types";
import classNames from "classnames";

class OptionsModal extends Component {

	constructor(props){
		super(props);
	}

	render() {
		const {slotsCount, opened, title, description, location} = this.props;
		return (
			<div onClick={this.close} className={classNames("modalDialog", {open: opened})}>
				<div onClick={this.stopPropagation}>
					<h2>Количество слотов:</h2>
					<div className="btn-group">
						<span className="slot-index">{slotsCount}</span>
						<button className="btn btn-blue btn-long" onClick={this.addSlot}>+</button>
						<button className="btn btn-blue btn-long" onClick={this.removeSlot}>-</button>
					</div>

					<h2>Событие:</h2>
					<div className="btn-group">
						<span className="slot-time">Название</span>
						<input className="input" type="text" value={title} onChange={this.setTitle} />
					</div>
					<div className="btn-group">
						<span className="slot-time">Описание</span>
						<input className="input" type="text" value={description} onChange={this.setDescription} />
					</div>
					<div className="btn-group">
						<span className="slot-time">Место</span>
						<input className="input" type="text" value={location} onChange={this.setLocation} />
					</div>
					<div className="btn-group center">
						<button className="btn btn-blue btn-long" onClick={this.close} type="button">
							Закрыть
						</button>
					</div>
				</div>
			</div>
		)
	}

	addSlot = () => {
		this.props.setSlotsCount(this.props.slotsCount + 1);
	};

	removeSlot = () => {
		this.props.setSlotsCount(this.props.slotsCount - 1);
	};

	setTitle = (event) => {
		this.props.setEventTitle(event.target.value);
	};

	setDescription = (event) => {
		this.props.setEventDescription(event.target.value);
	};

	setLocation = (event) => {
		this.props.setEventLocation(event.target.value);
	};

	stopPropagation = (event) => {
		event.stopPropagation();
	};

	close = () => {
		this.props.closeOptionsModal();
	};

	static propTypes = {
		slotsCount: PropTypes.number,
		description: PropTypes.string,
		location: PropTypes.string,
		title: PropTypes.string,
		setSlotsCount: PropTypes.func,
		setEventDescription: PropTypes.func,
		setEventLocation: PropTypes.func,
		setEventTitle: PropTypes.func,
	};

}
export default connect(mapStateToProps, mapDispatchToProps)(OptionsModal);

function mapStateToProps(state) {
	const slotsCount = getSlotsCount(state);
	const opened = getOptionsModalOpened(state);
	const options = getOptions(state);
	return {
		slotsCount: slotsCount,
		opened: opened,
		description: options.description,
		location: options.location,
		title: options.title,

	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		setSlotsCount: setSlotsCount,
		closeOptionsModal: closeOptionsModal,
		setEventDescription: setEventDescription,
		setEventLocation: setEventLocation,
		setEventTitle: setEventTitle,
	}, dispatch)
}
