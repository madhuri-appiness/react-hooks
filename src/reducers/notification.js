import { SET_NOTIFICATION_CONFIG_DATA } from '../actions/types';

const INITIAL_STATE = {
  appNotificationList: [],
  appEmailList: [],
  roleList:[]
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
  case SET_NOTIFICATION_CONFIG_DATA:
    return {
      ...state,
      ...action.content,
    };
  default:
    return state;
  }
};
