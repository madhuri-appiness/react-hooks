/* eslint-disable no-unused-vars, object-shorthand */

import axios from 'axios';
import { SET_INPUT_VALIDATOR_DATA } from '../actions/types';

const baseURL = process.env.API_HOST;

export function setInputValidatorData(content) {
  return {
    type: SET_INPUT_VALIDATOR_DATA,
    content,
  };
}

//Master API for Input Validator Master Data
export function getChannelServiceTypeList(){

  return (dispatch) => {
    return axios.get(baseURL + 'api/master-data-cst').then((response) => {
      dispatch(setInputValidatorData({
        //channelArr: response.data.body.channels //All Channel List
        channelArr: response.data.body.channelsFiltered // includes iDetails and RTE channels only
      }));
    }).catch((error) => {
      console.log(error);
    });
  };
}

//Update Current Channel state for Input Validator
export function updateCurrentChannel(channelId, channelName){
  return (dispatch) => {
      dispatch(setInputValidatorData({
        currentChannelId: channelId,
        currentChannelName: channelName
      }));

  };
}

//API for Input Validator Rule List
export function getRuleList(channelId){

  return (dispatch) => {
    return axios.get(baseURL + 'api/iv/rule-list?channelId='+channelId).then((response) => {
      dispatch(setInputValidatorData({
        serviceTypeList: response.data.body.serviceTypeList,
        ruleList: response.data.body.ruleList
      }));
      return response.data.body.ruleList;
    }).catch((error) => {
      console.log(error);
    });
  };
}

// Update Rule Configuration API
export function updateRuleConfiguration(formData) {

  return (dispatch) => {
    return axios.put(baseURL + 'api/iv/update-rule-config', formData).then((response) => {

      //console.log(response);
        if (response.status === 200) {
          dispatch(setInputValidatorData({
            showSuccessMsg: true
          }));

        } else {
          dispatch(setInputValidatorData({
            showErrorMsg: true,
            errorMsg: response.data.body ?  response.data.body :  response.data.message
          }));
        }
      //return response.data;
    }).catch((error) => {
      console.log(error);
      dispatch(setInputValidatorData({
            showErrorMsg: true,
            errorMsg: error
          }));
    });
  };
}
