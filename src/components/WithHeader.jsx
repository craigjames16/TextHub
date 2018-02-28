import React, { Component } from 'react';
import { Router, BrowserRouter, Route, Link, browserHistory, Redirect, Switch } from 'react-router-dom';
import * as actions from "actions/mainActions.js";

import {axios} from 'config.js';

//Components
import ViewList from 'components/ViewList.jsx'


class WithHeader extends Component {
    constructor(props) {
        super(props)
        
    }

    componentWillMount() {
        
    }

    render() {
        return(<div>
            <div className="page">
              {this.props.links ? <ul className="nav justify-content-end">
                <li className="nav-item">
                  <Link className="nav-link active" to="/lists">Lists</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/hub">Hub</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/logout">Logout</Link>
                </li>
              </ul> : null}
              <div className="main-content">
              {this.props.children}
              </div>
            </div>   
        </div>)
    }
}


export default WithHeader