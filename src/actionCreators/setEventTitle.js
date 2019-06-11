import {SET_EVENT_TITLE} from "../constants/actions";


export default function(count){
	return {type: SET_EVENT_TITLE, payload: count};
}