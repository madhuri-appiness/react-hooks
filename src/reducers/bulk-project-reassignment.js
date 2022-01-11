import { SET_BULK_PROJECT_REASSIGN_DATA } from '../actions/types';
const INITIAL_STATE = {
  projectId: 0,
  projectName: '',
  userRole: '',
  userName: '',
  projectStatus: '',
  userLists: [],
  reassignUsersList: [],
  milestoneStatus: [],
  projectId: [],
  roles: [],
  reassignProjectsList: null,
  totalReassignProjects: 0,
  projectsList: [],
  roleList: [],
  userList: [],
  projectRoles: [],
  projectNames: [],
  countries: [],
  failCount: null,
  successCount: null,
  failStatus: [],
  selectedRowKeys: []
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SET_BULK_PROJECT_REASSIGN_DATA:
      return {
        ...state,
        ...action.content,
      };
    default:
      return state;
  }
};
