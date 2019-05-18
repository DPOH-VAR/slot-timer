import {ADD_SLOT_TIME} from "../constants/actions";


export default function(index, time){
	return {type: ADD_SLOT_TIME, payload: {index, time}};
}