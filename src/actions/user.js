import React from "react";
import axios from 'axios';
import store from "../utils/store";
import { message, Icon } from 'antd';
import { SET_USER_DATA } from '../actions/types';

const baseURL = process.env.API_HOST;

export function setUserData(content) {
  return {
    type: SET_USER_DATA,
    content,
  };
}

export function updateUserProps(obj) {
  return (dispatch) => {
    dispatch(setUserData({ obj }));
  };
}

export function getUserInfo(email) {
  const st = store.getState();
  const isAlreadyFetched = st && st.user && st.user.userId && st.user.emailId && st.user.emailId === email ? true : false;
  if (!isAlreadyFetched) {
    const config = {
      headers: { email: email }
    };
    return (dispatch) => {
      return axios.get(baseURL + 'api/user/single-user', config).then((response) => {
        if (response.data.body) {
          dispatch(setUserData({
            userId: response.data.body.id,
            userName: response.data.body.userName,
            userRole: response.data.body.userRole,
            preferredUserName: response.data.body.preferredUserName,
            isProjectExist: response.data.body.isProjectExist,
            isFirstLogin: response.data.body.isFirstLogin,
          }));
        }
      }).catch((error) => {
        console.log(error);
      });
    };
  }
  else {
    return (dispatch) => { };
  }
}

export function getUserDetail(editUserId) {
  const st = store.getState();
  const config = {
    headers: { "X-UserId": st.user.userId }
  };
  return (dispatch) => {
    return axios.get(baseURL + 'api/admin/fetch-edit-user-details?editUserId=' + editUserId, config).then((response) => {
      if (response && response.data && response.data.status === 200 && response.data.body) {
        return response.data.body
      } else {
        message.error({
          content: "There is an error in fetching user detail",
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

export function updateUserInfo(obj, keycloak) {
  return (dispatch) => {
    dispatch(setUserData({
      emailId: obj.email,
      keycloak: keycloak
    }));
  };
}

// create user API
export function createUser(formData) {
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  return (dispatch) => {
    return axios.post(baseURL + 'api/admin/create-user', formData, config).then((response) => {
      dispatch(setUserData({

      }));
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
}

// edit user API
export function editUser(formData) {
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  return (dispatch) => {
    return axios.post(baseURL + 'api/admin/edit-user', formData, config).then((response) => {
      dispatch(setUserData({

      }));
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function clearFetchUsers() {
  return (dispatch) => {
    dispatch(setUserData({
      usersList: []
    }));
  };
}

// fetch user API
export function fetchUsers(obj) {
  const st = store.getState();
  const config = {
    headers: { "X-UserId": st.user.userId }
  };
  return (dispatch) => {
    return axios.post(baseURL + 'api/admin/fetch-view-users', obj, config).then((response) => {
      if (response && response.data && response.data.body) {
        const dataBody = response.data.body;
        dispatch(setUserData({
          usersList: dataBody.userAdminDtoList,
          totalRecords: dataBody.totalRecords,
          totalPages: dataBody.totalPages
        }));
        return dataBody.userAdminDtoList;
      }
      else {
        message.error({
          content: "There is an error in fetching the user",
          icon: <Icon type="close-circle" style={{ color: 'red', fontSize: '42px' }} />,
          top: 10
        });
        dispatch(setUserData({
          usersList: [],
        }));
        return []
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}

// export function fetchAgencyList() {
//   return (dispatch) => {
//     return axios.get(baseURL + 'api/agency/list').then((response) => {
//       if (response.status = 200) {
//         dispatch(setUserData({
//           agencyArr: response.data.body
//         }));
//       }
//       return response.data.body;
//     }).catch((error) => {
//       console.log(error);
//     });
//   }
// }

export function updateUserStatus(id) {
  return (dispatch) => {
    return axios.put(baseURL + 'api/admin/update-status', { userId: id }).then((response) => {
      return response.data;

    }).catch((error) => {
      console.log(error);
    });
  };
}

export function fetchBrandList() {
  return (dispatch) => {
    return axios.get(baseURL + 'api/agency/brand-list').then((response) => {
      if (response.status = 200) {
        dispatch(setUserData({
          brandArr: response.data.body
        }));
      }
      return response.data.body;
    }).catch((error) => {
      console.log(error);
    });
  }
}

// Removed below code during the implementation of medical
// export function fetchCountryCodeList() {
//   return (dispatch) => {
//     return axios.get(baseURL + 'api/country/getAllCountryCode').then((response) => {
//       dispatch(setUserData({
//         countryCodeArr: response.data
//       }));
//       return response.data;
//     }).catch((error) => {
//       console.log(error);
//     });
//   }
// }

export function updateUserObj(obj) {
  return (dispatch) => {
    dispatch(setUserData(obj));
  };
}

export function getBmUserData() {
  const st = store.getState();
  const config = {
    headers: { UserID: st.user.userId }
  };

  return (dispatch) => {
    return axios.get(baseURL + 'api/admin/master-data', config).then((response) => {
      if (response.data.status === 200) {
        dispatch(setUserData({
          bmUserData: {
            languageArr: [],
            campaignTypeArr: [],
            brandArr: [],
            countryArr: [],
            roleArr: response.data.body.masterRole,
            regionDetails: [],
            businessUnits: response.data.body.businessUnits ? response.data.body.businessUnits : [],
            adminMasterDataLoad: true
          },
        }));
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function downloadCSV(businessUnitId) {
  const st = store.getState();
  const config = {
    headers: {
      UserID: st.user.userId,
      businessUnitId: businessUnitId
    },
    responseType: "blob"
  };
  return (dispatch) => {
    return axios.post(baseURL + 'api/admin/download-all-users', {}, config).then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
      return false;
    });
  };
}

export function fetchUnapprovedUsers() {
  return (dispatch) => {
    return axios.get(baseURL + 'api/admin/fetch-unapproved-users').then((response) => {
      dispatch(setUserData({
        unapprovedUsersList: response.data.body
      }));
      return response.data.body;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function getOpenMasterData() {
  return (dispatch) => {
    return axios.get(baseURL + 'opapi/master-data').then((response) => {
      if (response && response.data && response.data.status === 200) {
        dispatch(setUserData({
          opapiMasterdataLoaded: true,
          opapiData: response.data.body
        }));
      } else {
        dispatch(setUserData({
          opapiMasterdataLoaded: false,
          opapiData: {}
        }));
      }
      return response;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function actionOnUser(obj) {
  return (dispatch) => {
    return axios.post(baseURL + 'api/admin/action-on-user', obj).then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function submitDownloadRequest(buId) {
  const st = store.getState();
  const config = {
    headers: {
      UserID: st.user.userId,
      businessUnitId: buId
    }
  };
  return (dispatch) => {
    return axios.get(baseURL + 'opapi/download-all-projects?userId=0', config).then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function getLanguageList() {
  return (dispatch) => {
    return axios.get(baseURL + 'opapi/app-multilingual-language-list').then((res) => {
      dispatch(setUserData({
        localeArr: res && res.data && res.data.body ? res.data.body : []
      }));
    }).catch((error) => {
      console.log(error);
    });
  };
}
