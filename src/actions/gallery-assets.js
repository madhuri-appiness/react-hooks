import axios from 'axios';
import store from "../utils/store";

import { SET_GALLERY_DATA } from '../actions/types';

const baseURL = process.env.API_HOST;

export function setGalleryData(content) {
  return {
    type: SET_GALLERY_DATA,
    content,
  };
}

export function getMasterData() {
  const st = store.getState();
  const config = {
    headers: { UserID: st.user.userId }
  };

  return (dispatch) => {
    return axios.get(baseURL + 'api/idea/master-data', config).then((response) => {
      if (response.data.status === 200) {
        dispatch(setGalleryData({
          brandArr: response.data.body.brands,
          channelArr: response.data.body.channels,
          countryArr: response.data.body.country,
          masterServiceTypeArr: response.data.body.serviceType
        }));
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function getGalleryMasterData() {
  const st = store.getState();
  const config = {
    headers: { UserID: st.user.userId }
  };

  return (dispatch) => {
    return axios.get(baseURL + 'api/gallery/admin-master-data', config).then((response) => {
      if (response.data.status === 200) {
        dispatch(setGalleryData({
          brands: [],
          channelArr: [],
          countries:[],
          businessUnit:response.data.body.businessUnits,
          regionDetails: [],
          masterServiceTypeArr: []
        }));
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function updateRoutePath(pathName, assetId) {
  return (dispatch) => {
    dispatch(setGalleryData({
      pathName: pathName,
      assetId: assetId || ''
    }));
  };
}

export function uploadAsset(formData) {
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  return (dispatch) => {
    return axios.post(baseURL + 'api/gallery/upload', formData, config).then((response) => {
      return response;

    }).catch((error) => {
      console.log(error);
    });
  };
}
