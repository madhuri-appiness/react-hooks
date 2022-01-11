import axios from 'axios';
import { SET_BULK_PROJECT_REASSIGN_DATA } from './types';
import { decryptContent } from '../utils/utils';

const baseURL = process.env.API_HOST;

export function setUserData(content) {
  return {
    type: SET_BULK_PROJECT_REASSIGN_DATA,
    content,
  };
}

export function fetchBulkUserProjectsForReassign(obj) {
  return (dispatch) => {
    return axios.post(baseURL + 'api/admin/bulk-reassign-project-list', obj).then((response) => {
      dispatch(setUserData({
        // reassignUsersList: response.data.body ? response.data.body.userList : [],
        // milestoneStatus: response.data.body ? response.data.body.milestoneStatus : [],
        // projectId: response.data.body ? response.data.body.projectId : [],
        // roles: response.data.body ? response.data.body.roles : [],
        projectsList: response.data.body ? response.data.body.projectsList : [],
        totalReassignProjects: response.data.body ? response.data.body.totalRecords : []
      }));
    }).catch((error) => {
      console.log(error);
    });
  };
}



export function getUsersByRole(projectObj) {
  return (dispatch) => {
    return axios.get(baseURL + 'api/admin/fetch-users-by-role?roleId=' + projectObj.roleId + '&userId=' + projectObj.userId).then((response) => {
      let list = response.data.body ? response.data.body : [];
      list.forEach((e, i) => {
        list[i].emailId = decryptContent(list[i].emailId);
      })

      dispatch(setUserData({
        userLists: list
      }));
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
}


export function getFiltersByUser(userId) {
  return (dispatch) => {
    return axios.get(baseURL + 'api/admin/bulk-reassignment-master-data?userId=' + userId).then((response) => {
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function reassignProjectToUser(obj, userId) {
  const config = {
    headers: { 'X-UserId': userId }
  }
  return (dispatch) => {
    return axios.post(baseURL + 'api/admin/bulk-user-reassignment', obj, config).then((response) => {
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function fetchProjects() {
  const req = axios.get(baseURL + 'api/admin/fetch-project-reassign');
  return {
    type: SET_PROJECT_REASSIGNMENT_DATA,
    payload: req
  };
}


export function fetchReassignMasterData() {
  return (dispatch) => {
    return axios.get(baseURL + 'api/admin/user-master-data').then((response) => {
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
}


export function updateDataObj(obj) {
  return (dispatch) => {
    dispatch(setUserData(obj));
  };
}
