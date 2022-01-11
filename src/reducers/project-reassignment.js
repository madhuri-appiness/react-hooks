import { SET_PROJECT_REASSIGN_DATA } from '../actions/types';
const INITIAL_STATE = {
  projectId: 0,
  projectName:'',
  userRole: '',
  userName: '',
  projectStatus:'',
  userLists: [],
  activeUsersList: [],
  projectList: [],
  totalProjects: 0
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
  case SET_PROJECT_REASSIGN_DATA:
    return {
      ...state,
      ...action.content,
    };
  default:
    return state;
  }
};
