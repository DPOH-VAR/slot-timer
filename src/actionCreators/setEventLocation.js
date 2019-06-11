import {SET_EVENT_LOCATION} from "../constants/actions";


export default function(count){
	return {type: SET_EVENT_LOCATION, payload: count};
}