import axios from 'axios';
import qs from 'querystring';
import store from "../utils/store";
import { SET_TRANSLATOR_DATA } from './types';

const baseURL = process.env.API_HOST;
const localProxy = process.env.NODE_ENV === "development" ? 'apiv2/' : '';

export function setTranslationData(content) {
  return {
    type: SET_TRANSLATOR_DATA,
    content,
  };
}

export function getLocaleLanguageData(locale, list) {
  const config = {
    headers: {}
  };
  if (locale) {
    config.headers.locale = locale;
  }
  if (list) {
    config.headers.list = true;
  }
  return async (dispatch) => {
    return await axios.get(baseURL + localProxy + 'localeData', config).then(async (response) => {
      if (response.data.localeList && response.data.localeList) {
        return await dispatch(setTranslationData({
          [locale]: response.data.locale || {},
          localeList: response.data.localeList || []
        }));
        // return { [locale]: response.data.locale || {}, localeList: response.data.localeList || [] }
      } else if (response.data.locale) {
        return await dispatch(setTranslationData({
          [locale]: response.data.locale || {}
        }));
        // return { [locale]: response.data.locale || {} }
      } else if (response.data.localeList) {
        return await dispatch(setTranslationData({
          localeList: response.data.localeList || []
        }));
        // return { localeList: response.data.localeList || [] }
      }
    }).catch((error) => {
      console.log(error);
      return error;
    });
  };
}

export function saveLanguageData(urlencoded) {
  return (dispatch) => {
    return fetch(baseURL + localProxy + 'saveData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: urlencoded,
      redirect: 'follow'
    }).then(result => result.json())
      .then((response) => {
        debugger;
        if (response.length > 0) {
          // dispatch(setTranslationData({
          //   [locale]: response.data.locale || {}
          // }));
          return response;
        }
      }).catch((error) => {
        console.log(error);
        return error;
      });
  };
}

export function getTranslationEmailConfig(categoryId, typeId) {
  const config = {
    params: { categoryId, typeId }
  };

  return (dispatch) => {
    return axios.get(baseURL + 'api/admin/get-downtime-email-config', config).then((response) => {
      if (response.data.body) {
        dispatch(setTranslationData({
          downtimeEmailConfig: response.data.body || null
        }));
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function saveTranslationEmailConfig(formObj) {
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

export function sendTranslationEmailNotification(formObj) {
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
    dispatch(setTranslationData(obj));
  };
}
