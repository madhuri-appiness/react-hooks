import axios from 'axios';
import { SET_RESOURCE_DATA  } from './types';

const baseURL = process.env.API_HOST;

export function setResourceData(content) {
  return {
    type: SET_RESOURCE_DATA,
    content,
  };
}

export function updateDataObj(obj) {
  return (dispatch) => {
    dispatch(setResourceData(obj));
  };
}

export function getDynamicResources(id,userid) { 
  const config = {
    params: {
      'X-UserId': userid,
      'categoryId':id
    }
  };
  return (dispatch) => {
    return axios.get(baseURL + 'api/admin/resource/get', config).then((response) => {
      if (response.data.body) {
        const data = {
          dynamicResources:response.data.body,          
        };
        data[id]=response.data.body;
        dispatch(setResourceData(data));
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function updateDynamicResource(formData,userid) {
  const config = {
    headers: {
      'X-UserId':userid,
      'content-type': 'multipart/form-data'
    }
  }
  return (dispatch) => {
    return axios.post(baseURL + 'api/admin/resource/add', formData, config).then((response) => {
      dispatch(setResourceData({

      }));
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function fetchCountryList() {
  return (dispatch) => {
    return axios.get(baseURL + 'api/country/list').then((response) => {
      dispatch(setResourceData({
        countryListArr: response.data
      }));
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  }
}
export function deleteDynamicResource(categoryId,userid,assetId) { 
  const config = {
    headers: {
      'X-UserId':userid,
      'content-type': 'multipart/form-data'
    },
    params: { 
      'categoryId':categoryId,
      'resourceId': assetId
    }
  }
  return (dispatch) => {
    return axios.get(baseURL + 'api/admin/resource/delete', config).then((response) => {
      dispatch(setResourceData({

      }));
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function getCountryCombinationCount(formData,userid) {
  const config = {
    headers: {
      'X-UserId':userid,
      'content-type': 'multipart/form-data'
    }
  }
  return (dispatch) => {
    return axios.post(baseURL + 'api/admin/resource/count', formData, config).then((response) => {
       
      
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
} 