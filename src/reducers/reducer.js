import {combineReducers} from "redux";
import {STATE} from "../constants/actions";
import optionsReducer from "./optionsReducer";
import slotOptionsModalReducer from "./slotOptionsModalReducer";
import slotsReducer from "./slotsReducer";

const combine = combineReducers({
	slots: slotsReducer,
	slotOptionsModal: slotOptionsModalReducer,
	options: optionsReducer,
});

export default function(state, action){
	if (action.type === STATE) return action.payload;
	return combine(state, action);
}
