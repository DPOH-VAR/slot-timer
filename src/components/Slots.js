import React, {Component} from "react";
import {connect} from 'react-redux';
import {getSlots} from "../selectors/selectors";
import PropTypes from "prop-types";
import Slot from "./Slot";

class Slots extends Component {
	render() {
		return (

			<div className="slots">
				{
					this.props.slots.map((slot, index) => (
						<Slot key={index} slot={slot} index={index} />
					))
				}
			</div>
		)
	}

	static propTypes = {
		slots: PropTypes.array,
	}
}


function mapStateToProps(state) {
	return {
		slots: getSlots(state),
	}
}


export default connect(mapStateToProps)(Slots);