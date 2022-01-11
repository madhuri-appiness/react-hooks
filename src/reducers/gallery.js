import { SET_GALLERY_DATA } from '../actions/types';

const INITIAL_STATE = {
	brandArr: [],
	channelArr: [],
	countryArr: [],
	masterServiceTypeArr: []
};

export default (state = INITIAL_STATE, action = {}) => {
	switch (action.type) {
		case SET_GALLERY_DATA:
			return {
				...state,
				...action.content,
			};
		default:
			return state;
	}
};
