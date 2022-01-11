import { SET_PM_DATA } from '../actions/types';

const INITIAL_STATE = {
  channelList: [],
  regionList : [],
  countryList : [],
  pmList : [],
  activePmList : [],
  pmDetails: [],
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
  case SET_PM_DATA:
    return {
      ...state,
      ...action.content,
    };
  default:
    return state;
  }
};
