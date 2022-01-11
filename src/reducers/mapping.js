import { SET_MAPPING_DATA } from '../actions/types';

const INITIAL_STATE = {
  resourceCategoryList: [],
  channelList: [],
  keyContact: {},
  brandListData: [],
  therapeuticAreaList: []
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SET_MAPPING_DATA:
      return {
        ...state,
        ...action.content,
      };
    default:
      return state;
  }
};