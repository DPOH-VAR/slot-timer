import React, {Component, Fragment} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import addSlotTime from "../actionCreators/addSlotTime";
import clearSlot from "../actionCreators/clearSlot";
import closeSlotOptionsModal from "../actionCreators/closeSlotOptionsModal";
import openOptionsModal from "../actionCreators/openOptionsModal";
import setSlotTime from "../actionCreators/setSlotTime";
import {getSlotsCount} from "../selectors/selectors";
import PropTypes from "prop-types";
import Alarm from "./Alarm";
import OptionsModal from "./OptionsModal";
import SlotOptionsModal from "./SlotOptionsModal";
import Slots from "./Slots";

class Main extends Component {

	render() {
		return (
			<div>
				{
					this.props.slotsCount <= 0 ? (
						<div >нет слотов</div>
					) : (
						<Fragment>
							<Slots/>
							<SlotOptionsModal/>
							<OptionsModal/>
							<Alarm/>
						</Fragment>
					)
				}
			</div>
		);
	}

	componentDidMount() {
		window.document.body.addEventListener('keydown', this.onKeyDown);
	}

	componentWillUnmount() {
		window.document.body.removeEventListener('keydown', this.onKeyDown);
	}

	static propTypes = {
		slotsCount: PropTypes.number,
	};

	onKeyDown = (event) => {
		if (event.ctrlKey && event.keyCode === 13 /*enter*/) {
			this.props.openOptionsModal();
		}
	}
}


function mapStateToProps(state) {
	return {
		slotsCount: getSlotsCount(state),
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		openOptionsModal: openOptionsModal,
	}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);