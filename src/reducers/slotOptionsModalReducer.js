import {CLOSE_SLOT_OPTIONS_MODAL, OPEN_SLOT_OPTIONS_MODAL} from "../constants/actions";

const defaultState = {
	index: null,
};

export default function(slotOptionsModalState = defaultState, action){
	switch (action.type) {
		case OPEN_SLOT_OPTIONS_MODAL: {
			return {...slotOptionsModalState, index: action.payload};
		}
		case CLOSE_SLOT_OPTIONS_MODAL: {
			return {...slotOptionsModalState, index: null};
		}
		default: {
			return slotOptionsModalState;
		}
	}
}