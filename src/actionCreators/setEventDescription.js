import {SET_EVENT_DESCRIPTION} from "../constants/actions";


export default function(count){
	return {type: SET_EVENT_DESCRIPTION, payload: count};
}