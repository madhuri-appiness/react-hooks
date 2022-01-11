import axios from 'axios';
import { SET_PROJECT_REASSIGN_DATA } from '../actions/types';
import store from "../utils/store";

const baseURL = process.env.API_HOST;

export function setUserData(content) {
  return {
    type: SET_PROJECT_REASSIGN_DATA,
    content,
  };
}

export function fetchProjectsForReassign(obj) {
  return (dispatch) => {
    return axios.post(baseURL + 'api/admin/fetch-project-reassign', obj).then((response) => {
      dispatch(setUserData({
        projectList: response && response.data && response.data.body ? response.data.body.projectsList : [],
        totalProjects: response && response.data && response.data.body ? response.data.body.totalRecords : 0
      }));
      return response && response.data && response.data.body ? response.data.body : {};
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function getUsersByRole(obj) {
  return (dispatch) => {
    return axios.get(baseURL + 'api/admin/fetch-role-users?role=' + obj.role + '&globalRegionId=' + obj.globalRegionId + '&businessUnitId=' + obj.businessUnitId).then((response) => {
      dispatch(setUserData({
        userLists: response.data.body
      }));
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function reassignProjectToUser(obj) {
  const config = {
    headers: {
      globalRegionId: obj.globalRegionId,
      businessUnitId: obj.businessUnitId
   }
  };
  return (dispatch) => {
    return axios.post(baseURL + 'api/admin/reassign-project', obj, config).then((response) => {
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
}

// fetch user API
export function fetchActiveUsers() {
  return (dispatch) => {
    return axios.get(baseURL + 'api/admin/fetch-all-users').then((response) => {
      dispatch(setUserData({
        activeUsersList: response.data.body
      }));
      return response.data.body;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function getUserBU(userId) {
  return (dispatch) => {
    return axios.get(baseURL + 'api/admin/user-bu?userId='+userId).then((response) => {
      dispatch(setUserData({
        businessUnits: response.data.body
      }));
      return response.data.body;
    }).catch((error) => {
      console.log(error);
      return [];
    });
  };
}

export function getUserGR(userId, businessUnitId) {
  return (dispatch) => {
    return axios.get(baseURL + 'api/admin/user-gr?userId='+userId+'&businessUnitId='+businessUnitId).then((response) => {
      dispatch(setUserData({
        regionDetails: response.data.body
      }));
      return response.data.body;
    }).catch((error) => {
      console.log(error);
      return [];
    });
  };
}

export function getCountries(userId, businessUnitId, globalRegionId) {
  const config = {
    headers: {
      globalRegion: globalRegionId,
      businessUnitId: businessUnitId
   }
  };
  return (dispatch) => {
    return axios.get(baseURL + 'api/get-country-data', config).then((response) => {
      dispatch(setUserData({
        regionCountries: response.data.body
      }));
      return response.data.body;
    }).catch((error) => {
      console.log(error);
      return [];
    });
  };
}

export function reassignBulkProjectToUser(obj) {
  const st = store.getState();
  const config = {
    headers: {
      "X-UserId": st.user.userId,
      globalRegionId: obj.globalRegionId,
      businessUnitId: obj.businessUnitId
   }
  };
  return (dispatch) => {
    return axios.post(baseURL + 'api/admin/reassign-bulk-project', obj, config).then((response) => {
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
}
