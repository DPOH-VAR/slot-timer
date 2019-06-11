import {OPEN_OPTIONS_MODAL} from "../constants/actions";


export default function(index){
	return {type: OPEN_OPTIONS_MODAL, payload: index};
}