import axios from 'axios';
import Auth from 'auth/Auth.js';

const DEV = true;

var auth = new Auth();
const AUTH_TOKEN = auth.getAccessToken();
var APP_URL;

if (DEV) {
    //API_URL
    axios.defaults.baseURL = 'http://api.devserver:8000/';

    //APP_URL
    APP_URL = 'http://devserver:8080/'
    
 } else {
    //API_URL
    axios.defaults.baseURL = 'http://api.productionserver.com/';

    //APP_URL
    APP_URL = 'http://app.productionserver.com/'
 }

axios.defaults.headers.common['Authorization'] = "Bearer " +AUTH_TOKEN;

export {axios}
export {APP_URL}