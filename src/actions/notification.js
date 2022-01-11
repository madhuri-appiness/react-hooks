import axios from 'axios';
import { SET_NOTIFICATION_CONFIG_DATA } from '../actions/types';

const baseURL = process.env.API_HOST;

export function setNotificationConfigData(content) {
  return {
    type: SET_NOTIFICATION_CONFIG_DATA,
    content,
  };
}

export function getAppNotificationConfigList() {
  return (dispatch) => {
    return axios.get(baseURL + 'api/admin/notification/fetch-app-config').then((response) => {
      if (response.data.body) {
        dispatch(setNotificationConfigData({
          appNotificationList: response.data.body.appConfigList,
          roleList: response.data.body.roles
        }));
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function getAppEmailConfigList() {
  return (dispatch) => {
    return axios.get(baseURL + 'api/admin/notification/fetch-email-config').then((response) => {
      if (response.data.body) {
        dispatch(setNotificationConfigData({
          appEmailList: response.data.body.emailConfigList,
          roleList: response.data.body.roles
        }));
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function editNotification(formData,userid) {
  const config = {
       headers: { 'X-UserId': userid }
  }
  return (dispatch) => {
    return axios.post(baseURL + 'api/admin/notification/edit-notification', formData, config).then((response) => {
      dispatch(setNotificationConfigData({

      }));
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
}
