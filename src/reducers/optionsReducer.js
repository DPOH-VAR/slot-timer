import {
	CLOSE_OPTIONS_MODAL,
	OPEN_OPTIONS_MODAL,
	SET_EVENT_DESCRIPTION,
	SET_EVENT_LOCATION,
	SET_EVENT_TITLE,
} from "../constants/actions";

const defaultState = {
	opened: false,
	title: 'Событие',
	description: 'Описание события',
	location: 'Место события',
};

export default function(optionsModalState = defaultState, action){
	switch (action.type) {
		case OPEN_OPTIONS_MODAL: {
			return {...optionsModalState, opened: true};
		}
		case CLOSE_OPTIONS_MODAL: {
			return {...optionsModalState, opened: false};
		}
		case SET_EVENT_LOCATION: {
			return {...optionsModalState, location: action.payload};
		}
		case SET_EVENT_DESCRIPTION: {
			return {...optionsModalState, description: action.payload};
		}
		case SET_EVENT_TITLE: {
			return {...optionsModalState, title: action.payload};
		}
		default: {
			return optionsModalState;
		}
	}
}