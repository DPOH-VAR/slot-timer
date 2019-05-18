import {CLEAR_SLOT} from "../constants/actions";


export default function(index){
	return {type: CLEAR_SLOT, payload: {index}};
}