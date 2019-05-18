import {OPEN_SLOT_OPTIONS_MODAL} from "../constants/actions";


export default function(index){
	return {type: OPEN_SLOT_OPTIONS_MODAL, payload: index};
}