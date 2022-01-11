import axios from 'axios';
import store from "../utils/store";

const baseURL = process.env.API_HOST;

export function uploadUtilizationBudget(formData) {
  const st = store.getState();
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      'UserID': st.user.userId
    }
  }
  return (dispatch) => {
    return axios.post(baseURL + 'api/forecast-status/upload-utilizationBudget', formData, config).then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
    });
  };
}
