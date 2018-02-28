//App Set Up
require("babel-polyfill");
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { Provider } from "react-redux";
import store from "./store";

//CSS
require("css/main.css");
require('bootstrap')

import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
    <Provider store={store}><App /></Provider>, document.getElementById('app')
);

