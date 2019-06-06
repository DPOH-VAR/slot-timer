import {SET_SLOT_TIMEOUT} from "../constants/actions";


export default function(index, time){
	return {type: SET_SLOT_TIMEOUT, payload: {index, time}};
}