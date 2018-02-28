import React, { Component, createClass } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import Auth from 'auth/Auth.js';
import * as actions from 'actions/mainActions.js'

import loader from 'img/loader.gif'


class Callback extends Component {

  constructor() {
    super()
  }

  render() {
    return (
      <div className="center-text container-white">
      <img src={loader} />
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
export default connect(mapStateToProps, mapDispatchToProps)(Callback);