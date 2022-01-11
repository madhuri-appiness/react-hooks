import { SET_INPUT_VALIDATOR_DATA } from '../actions/types';

const INITIAL_STATE = {
  channelArr: [],
  serviceTypeList: [],
  ruleList: {},
  currentChannelId: 1,
  currentChannelName: 'iDetails',
  showSuccessMsg: false,
  showErrorMsg: false,
  errorMsg: ''
  
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
  case SET_INPUT_VALIDATOR_DATA:
    return {
      ...state,
      ...action.content,
    };
  default:
    return state;
  }
};
