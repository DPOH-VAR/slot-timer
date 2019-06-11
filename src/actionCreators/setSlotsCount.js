import {SET_SLOTS_COUNT} from "../constants/actions";


export default function(count){
	return {type: SET_SLOTS_COUNT, payload: count};
}