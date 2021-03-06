import {ADD_SLOT_TIMEOUT, SET_SLOT_TIMEOUT, CLEAR_SLOT, SET_SLOT} from "../constants/actions";


export default function(slotState = null, action){
	switch (action.type) {
		case SET_SLOT: {
			const slot = slotState || {};
			return {...action.payload.slot, slot};
		}
		case CLEAR_SLOT: {
			return null;
		}
		case ADD_SLOT_TIMEOUT: {
			const slot = slotState || {};
			const date = slot.date || Date.now();
			return {...slot, date: date + action.payload.time};
		}
		case SET_SLOT_TIMEOUT: {
			const slot = slotState || {};
			return {...slot, date: Date.now() + action.payload.time};
		}
		default: {
			return slotState;
		}
	}
}