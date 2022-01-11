import React from "react";
import axios from 'axios';
import store from "../utils/store";
import { message, Icon } from 'antd';
import { SET_MAPPING_DATA } from '../actions/types';

const baseURL = process.env.API_HOST;

export function setMappingData(content) {
  return {
    type: SET_MAPPING_DATA,
    content,
  };
}

export function uploadCatalogueFile(formData, obj) {
  const st = store.getState();
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      'UserID': st.user.userId,
      businessUnitId: obj.businessUnitId,
      globalRegionId: obj.globalRegionId
    }
  }
  return (dispatch) => {
    return axios.post(baseURL + 'api/admin/catalog-file-upload', formData, config).then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function updateMappingProps(obj) {
  return (dispatch) => {
    dispatch(setMappingData(obj));
  };
}

export function getResourceCategory(businessUnitId, globalRegionId) {
  return (dispatch) => {
    return axios.get(`${baseURL}api/resource-center/get-resource-categories?globalRegionId=${globalRegionId}&businessUnitId=${businessUnitId}`).then((response) => {
      if (response && response.data && response.data.status === 200 && response.data.body) {
        dispatch(setMappingData({ resourceCategoryList: response.data.body }));
        return response.data.body;
      } else {
        message.error({
          content: "There is an error in fetching Resource Category",
          icon: <Icon type="close-circle" style={{ color: 'red', fontSize: '42px' }} />,
          top: 10
        });
        return false
      }
    }).catch((error) => {
      console.log(error);
      return false
    });
  };
}

export function getChannels(businessUnitId, globalRegionId, categoryId) {
  return (dispatch) => {
    return axios.get(`${baseURL}api/resource-center/get-channels-for-category?globalRegionId=${globalRegionId}&businessUnitId=${businessUnitId}&categoryId=${categoryId}`).then((response) => {
      if (response && response.data && response.data.status === 200 && response.data.body) {
        dispatch(setMappingData({ channelList: response.data.body }));
        return response.data.body;
      } else {
        message.error({
          content: "There is an error in fetching Channels",
          icon: <Icon type="close-circle" style={{ color: 'red', fontSize: '42px' }} />,
          top: 10
        });
        return false
      }
    }).catch((error) => {
      console.log(error);
      return false
    });
  };
}

export function uploadRCfile(formData, obj) {
  const st = store.getState();
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      'UserID': st.user.userId,
      businessUnitId: obj.businessUnitId,
      globalRegionId: obj.globalRegionId
    }
  }
  return (dispatch) => {
    return axios.post(baseURL + 'api/admin/resource-category-upload', formData, config).then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function uploadKeyContactfile(formData) {
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  return (dispatch) => {
    return axios.post(baseURL + 'api/admin/keycontact-upload', formData, config).then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function updateKeyContactfile(formData) {
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  return (dispatch) => {
    return axios.post(baseURL + 'api/admin/edit-keycontact', formData, config).then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function getKeyContactList(businessUnitId, globalRegionId) {
  const config = {
    headers: {
      businessUnitId: businessUnitId,
      globalRegionId: globalRegionId
    }
  }
  return (dispatch) => {
    return axios.get(`${baseURL}api/admin/get-keycontact`, config).then((response) => {
      if (response && response.data && response.data.status === 100 && response.data.body) {
        dispatch(setMappingData({ resourceCategoryList: response.data.body }));
        return response.data.body;
      } else {
        message.error({
          content: "There is an error in fetching Key Contact List",
          icon: <Icon type="close-circle" style={{ color: 'red', fontSize: '42px' }} />,
          top: 10
        });
        return false
      }
    }).catch((error) => {
      console.log(error);
      return false
    });
  };
}

export function deleteKeyContact(item) {
  const config = {
    headers: {
      businessUnitId: item.businessUnitId,
      globalRegionId: item.globalRegionId
    }
  }
  return (dispatch) => {
    return axios.post(`${baseURL}api/admin/delete-keycontact?email=${item.emailId}`, {}, config).then((response) => {
      if (response && response.data) {
        return response;
      } else {
        message.error({
          content: "There is an error in Deleting Keycontact",
          icon: <Icon type="close-circle" style={{ color: 'red', fontSize: '42px' }} />,
          top: 10
        });
        return false
      }
    }).catch((error) => {
      console.log(error);
      return false
    });
  };
}

export function getBrandList(businessUnitId, globalRegionId, pageno, totalRecordsPerPage, searchStr) {
  const config = {
    headers: {
      businessUnitId: businessUnitId,
      globalRegionId: globalRegionId
    },
    params: {
      pageno,
      totalRecordsPerPage,
      searchStr
    }
  }
  return (dispatch) => {
    return axios.get(`${baseURL}api/admin/brand/fetch`, config).then((response) => {
      if (response && response.data && response.data.status === 200 && response.data.body) {
        dispatch(setMappingData({ brandListData: response.data.body }));
        return response.data.body;
      } else {
        message.error({
          content: response && response.data && response.data.body ? response.data.body : "There is an error in fetching Brand List",
          icon: <Icon type="close-circle" style={{ color: 'red', fontSize: '42px' }} />,
          top: 10
        });
        return false
      }
    }).catch((error) => {
      console.log(error);
      return false
    });
  };
}

export function fetchTherapeuticArea(businessUnitId, globalRegionId) {
  const config = {
    headers: {
      businessUnitId: businessUnitId,
      globalRegionId: globalRegionId
    }
  }
  return (dispatch) => {
    return axios.get(`${baseURL}api/admin/brand/fetch-therapeuticAreaTypes`, config).then((response) => {
      if (response && response.data && response.data.status === 200 && response.data.body) {
        dispatch(setMappingData({ therapeuticAreaList: response.data.body }));
        return response.data.body;
      } else {
        message.error({
          content: "There is an error in fetching Therapeutic Area List",
          icon: <Icon type="close-circle" style={{ color: 'red', fontSize: '42px' }} />,
          top: 10
        });
        return false
      }
    }).catch((error) => {
      console.log(error);
      return false
    });
  };
}

export function addBrand(formData, businessUnitId, globalRegionId) {
  const config = {
    headers: {
      businessUnitId: businessUnitId,
      globalRegionId: globalRegionId
    }
  }
  return (dispatch) => {
    return axios.post(baseURL + 'api/admin/brand/add-brand', formData, config).then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function editBrand(formData, businessUnitId, globalRegionId) {
  const config = {
    headers: {
      businessUnitId: businessUnitId,
      globalRegionId: globalRegionId
    }
  }
  return (dispatch) => {
    return axios.post(baseURL + 'api/admin/brand/edit-brand', formData, config).then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function downloadCSV(businessUnitId, globalRegionId) {
  const st = store.getState();
  const config = {
    headers: {
      businessUnitId: businessUnitId,
      globalRegionId: globalRegionId
    },
    responseType: "blob"
  };
  return (dispatch) => {
    return axios.post(baseURL + 'api/admin/brand/download-brands', {}, config).then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
      return false;
    });
  };
}