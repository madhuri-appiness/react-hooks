import { SET_PROJECT_REASSIGNMENT_DATA } from '../actions/types';
export default function (state = [], action) {
  switch (action.type) {
    case SET_PROJECT_REASSIGNMENT_DATA:
      return [action.payload.data, ...state];
    default:
      break
  }
  return state;
}
