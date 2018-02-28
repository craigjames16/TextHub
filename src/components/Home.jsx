//Dependencies
import React, { Component, createClass } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';

//Services
import * as actions from "actions/mainActions.js";
import axios from 'config.js';
import Auth from 'auth/Auth.js';

//Components

class Home extends Component {

  constructor() {
    super()
    this.state = {auth: new Auth()}
  }

  login() {
    this.state.auth.login()
  }

  render() {
    return (
      <div className="center-text">
        <h3>SJA Text Hub</h3>
        <p style={{color:'white'}}>Please login by click the login button below</p>
        <button onClick={this.login.bind(this)} className="btn btn-outline-light btn-lg">Login</button>

      </div>
      );
  }
}

function mapDispatchToProps(dispatch) {  
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}
function mapStateToProps(state){
    return {
        
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);