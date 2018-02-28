import { browserHistory } from 'react-router-dom';
import {APP_URL} from 'config.js';

export default class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'domain.auth0.com',
      clientID: '000000000000000000000',
      redirectUri: APP_URL+'callback',
      audience: 'http://api.audience.com',
      responseType: 'token id_token',
      scope: 'openid'
    });
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
         window.location = '/hub';
      } else if (err) {
         window.location = '/';
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
     window.location = '/hub';
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
     window.location = '/';
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
  getAccessToken() {
    var token;

    try {
      token = localStorage.getItem('access_token')
    } catch(e) {
      token = null
    }
    return token
  }
}