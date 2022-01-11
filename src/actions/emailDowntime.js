import axios from 'axios';
import store from "../utils/store";
import { SET_DOWNTIME_DATA } from './types';

const baseURL = process.env.API_HOST;

export function setDowntimeData(content) {
  return {
    type: SET_DOWNTIME_DATA,
    content,
  };
}

export function getNotificationMasterInfo() {
  return (dispatch) => {
    return axios.get(baseURL + 'api/admin/downtime-notification-master-data').then((response) => {
      if (response.data.body) {
        dispatch(setDowntimeData({
          noticeNotificationTypes: response.data.body.noticeNotificationTypes || []
        }));
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function getDowntimeEmailConfig(categoryId, typeId) {
  const config = {
    params: { categoryId, typeId }
  };

  return (dispatch) => {
    return axios.get(baseURL + 'api/admin/get-downtime-email-config', config).then((response) => {
      if (response.data.body) {
        dispatch(setDowntimeData({
          downtimeEmailConfig: response.data.body || null
        }));
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function saveDowntimeEmailConfig(formObj) {
  const st = store.getState();
  const config = {
    headers: { 'X-UserId': st.user.userId }
  };

  return (dispatch) => {
    return axios.post(baseURL + 'api/admin/save-downtime-email-config', formObj, config).then((response) => {
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function sendDowntimeEmailNotification(formObj) {
  const st = store.getState();
  const config = {
    headers: { 'X-UserId': st.user.userId }
  };

  return (dispatch) => {
    return axios.post(baseURL + 'api/admin/send-downtime-email-notification', formObj, config).then((response) => {
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function updateDataObj(obj) {
  return (dispatch) => {
    dispatch(setDowntimeData(obj));
  };
}

export function getPromoContent() {
  const st = store.getState();
  const config = {
    headers: { 'X-UserId': st.user.userId }
  };

  return (dispatch) => {
    return axios.get(baseURL + 'api/notification/get-promotional-content', config).then((response) => {
      if (response.data) {
        dispatch(setDowntimeData({
          promotionalContent: response.data.body || ''
        }));
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function updatePromoContent(obj) {
  const st = store.getState();
  const config = {
    headers: { 'X-UserId': st.user.userId }
  };

  return (dispatch) => {
    return axios.post(baseURL + 'api/notification/update-promotional-content', obj, config).then((response) => {
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
}