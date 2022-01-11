import axios from 'axios';
import { SET_PM_ALLOCATION_DATA } from '../actions/types';

const baseURL = process.env.API_HOST;

export function setPMAllocationData(content) {
  return {
    type: SET_PM_ALLOCATION_DATA,
    content,
  };
}

export function getUnclaimedProjects() {
  return (dispatch) => {
    return axios.get(baseURL + 'api/admin/pmgroup/unclaimed-projects').then((response) => {
      if (response.data.body) {
        dispatch(setPMAllocationData({
          unClaimProjects: response.data.body
        }));
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function getPMUserList(obj) {
  return (dispatch) => {
    return axios.get(baseURL + 'api/admin/pmgroup/pm-user-list?regionId=' + obj.regionId + '&channelId=' + obj.channelId + '&countryId=' + obj.countryId).then((response) => {
      if (response.data.body) {
        dispatch(setPMAllocationData({
          pmUserList: response.data.body
        }));
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function assignProjectToPM(dataObj) {
  return (dispatch) => {
    return axios.post(baseURL + 'api/admin/pmgroup/assign-project-to-pm', dataObj).then((response) => {
      if (response.data.status) {
        return response.data
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}
