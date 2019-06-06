import {ADD_SLOT_TIMEOUT} from "../constants/actions";


export default function(index, time){
	return {type: ADD_SLOT_TIMEOUT, payload: {index, time}};
}