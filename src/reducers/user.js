import { SET_USER_DATA } from '../actions/types';

const INITIAL_STATE = {
  userId: 0,
  userName: '',
  userRole: '',
  preferredUserName: '',
  isProjectExist: false,
  isFirstLogin: false,
  emailId: '',
  keycloak: {},
  // agencyArr: [],
  isEdit: false,
  bmUserData: {},
  unapprovedUsersList: [],
  registeredUserData: {},
  regionDetails: [],
  businessUnits: [],
  localeArr: []
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.content,
      };
    default:
      return state;
  }
};
