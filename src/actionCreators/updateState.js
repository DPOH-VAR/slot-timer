import {STATE} from "../constants/actions";


export default function(state){
	return {type: STATE, payload: state};
}