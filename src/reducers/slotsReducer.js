import {ADD_SLOT_TIME, CLEAR_SLOT, SET_SLOT, SET_SLOTS_COUNT} from "../constants/actions";
import slotReducer from "./slotReducer";


export default function(slotsState = new Array(80).fill(null), action){
	switch (action.type) {
		case ADD_SLOT_TIME:
		case CLEAR_SLOT:
		case SET_SLOT: {
			return slotsState.map((slot, index) => (
				index === action.payload.index ? slotReducer(slot, action) : slot
			));
		}
		case SET_SLOTS_COUNT: {
			const newSlotsState = [...slotsState];
			newSlotsState.length = action.payload;
			return [...newSlotsState];
		}
		default: {
			return slotsState;
		}
	}
}