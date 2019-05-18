import {combineReducers} from "redux";
import {STATE} from "../constants/actions";
import slotOptionsModalReducer from "./slotOptionsModalReducer";
import slotsReducer from "./slotsReducer";

const combine = combineReducers({
	slots: slotsReducer,
	slotOptionsModal: slotOptionsModalReducer,
});

export default function(state, action){
	if (action.type === STATE) return action.payload;
	return combine(state, action);
}
