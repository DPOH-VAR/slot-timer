import {ADD_SLOT_TIME, CLEAR_SLOT, SET_SLOT} from "../constants/actions";


export default function(slotState = null, action){
	switch (action.type) {
		case SET_SLOT: {
			const slot = slotState || {};
			return {...action.payload.slot, slot};
		}
		case CLEAR_SLOT: {
			return null;
		}
		case ADD_SLOT_TIME: {
			const slot = slotState || {};
			const date = slot.date || Date.now();
			return {...slot, date: date + action.payload.time};
		}
		default: {
			return slotState;
		}
	}
}