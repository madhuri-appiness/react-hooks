/* eslint-disable no-unused-vars, object-shorthand */

import axios from 'axios';
import { SET_PM_DATA } from '../actions/types';

const baseURL = process.env.API_HOST

export function setPmData(content) {
  return {
    type: SET_PM_DATA,
    content,
  };
}

// API for Attributes
export function getAttributeData() {
  return (dispatch) => {
    return axios.get(baseURL + 'api/reports/master-data').then((response) => {
      dispatch(setPmData({
        countryList: response.data.body.country,
        regionList: response.data.body.region,
        channelList: response.data.body.channels
      }));
    }).catch((error) => {
      console.log(error);
    });
  };
}

// API for PM List
export function getPmList() {
  return (dispatch) => {
    return axios.get(baseURL + 'api/admin/pmgroup/pm-users').then((response) => {
      dispatch(setPmData({
        pmList: response.data.body
      }));
    }).catch((error) => {
      console.log(error);
    });
  };
}

// API for Active PM List
export function getActivePmList() {
  return (dispatch) => {
    return axios.get(baseURL +'api/admin/pmgroup/all-active-groups').then((response) => {
      dispatch(setPmData({
        activePmList: response.data.body
      }));
    }).catch((error) => {
      console.log(error);
    });
  };
}

// API for get PM Group Users
export function getPMGroupUsers(id) {
  return (dispatch) => {
    return axios.get(baseURL +'api/admin/pmgroup/pm-group-users?groupId='+id).then((response) => {

      return response.data.body.groupUsers;
    }).catch((error) => {
      console.log(error);
    });
  };
}

// API for get PM Group Users
export function getPMForGroup(id) {
  return (dispatch) => {
    return axios.get(baseURL +'api/admin/pmgroup/view-group?groupId='+id).then((response) => {
      dispatch(setPmData({
        pmsForGroup: response.data.body
      }));
      return response.data.body;
    }).catch((error) => {
      console.log(error);
    });
  };
}

// Edit Group API
export function editGroup(formData) {
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  return (dispatch) => {
    return axios.post(baseURL +'api/admin/pmgroup/all-active-groups', formData, config).then((response) => {
      dispatch(setPmData({

      }));
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
}

// create new group API
export function createNewGroup(userid, formData) {
  const config = {
    headers: {
      'X-UserId': userid
    }
  }
  return (dispatch) => {
    return axios.post(baseURL +'api/admin/pmgroup/create-group', formData, config).then((response) => {
      dispatch(setPmData({

      }));
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
}

// update group API
export function updateGroup(userid, formData) {
  const config = {
    headers: {
      'X-UserId': userid
    }
  }
  return (dispatch) => {
    return axios.post(baseURL +'api/admin/pmgroup/update-group', formData, config).then((response) => {
      dispatch(setPmData({

      }));
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
}

// delete group API
export function deleteGroup(userid, formData) {
  const config = {
    headers: {
      'X-UserId': userid
    }
  }
  return (dispatch) => {
    return axios.post(baseURL +'api/admin/pmgroup/deactive-groups', formData, config).then((response) => {
      dispatch(setPmData({

      }));
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
}
