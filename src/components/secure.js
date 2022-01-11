
import React, { Component } from 'react';
import Keycloak from 'keycloak-js';
import axios from "axios";
import store from "../utils/store";
import {notification} from 'antd';
// import { updateUserInfo, getUserInfo } from "../actions/user";
// import { Provider } from "react-redux";
const kc = Keycloak('/keycloak.json');

axios.interceptors.request.use(config => {
	const st = store.getState();
	config.headers = Object.assign({}, config.headers, {
		'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
		Accept: 'application/json',
		Authorization: 'Bearer ' + kc.token,
		Provider: 'keycloak',
	});
	return config;
});

axios.interceptors.response.use((response) => {
	// Do something with response data
	return response;
}, (error) => {
	// Do something with response error
	if (error.response.status === 401) {
		const NOTIFICATION_DURATION = parseInt(5);
		notification.error({
			message: "Session timeout",
			description: `Your session has been expired. Please refresh the page and try again.`,
			duration: NOTIFICATION_DURATION
		});
		kc.redirectUri = "http://localhost:3000/";
		kc.logout();
	}
	return error;
})
class Secured extends Component {

  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false };
  }

  componentDidMount() {
    // const keycloak = Keycloak('/keycloak.json');
    kc.init({ onLoad: "check-sso", checkLoginIframe: false }).success(authenticated => {
      if (authenticated) {
        // if (kc.realmAccess.roles.indexOf('ROLE_ADMIN') !== -1) {
          console.log(kc.tokenParsed,kc)
          // store.dispatch(updateUserInfo(kc.tokenParsed, kc));    
          this.setState({ keycloak: kc, authenticated: authenticated })
        // } else {
        //   kc.logout();
        // }
      } else {
        kc.login();
      }
    });

  }

  render() {
    console.log(this.state.keycloak, this.state.authenticated)
    if (this.state.keycloak) {
      if (this.state.authenticated) return (
        <div>
          <p>This is a Keycloak-secured component of your application. You shouldn't be able
            to see this unless you've authenticated with Keycloak.</p>
        <button onClick={()=>kc.logout()}>Log out</button>

        </div>
      ); else return (<div>Unable to authenticate!</div>)
    }
    return (
      <div>Initializing Keycloak...</div>
    );
  }
}
export default Secured;
