import React, { Component } from 'react';
import { Router, BrowserRouter, Route, Link, browserHistory, Redirect, Switch } from 'react-router-dom';
import * as actions from "actions/mainActions.js";
import axios from "axios" ;
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'

//Components
import Home from './Home.jsx';
import Callback from './Callback.jsx';
import Auth from 'auth/Auth.js'
import Hub from './Hub.jsx';
import Lists from './Lists.jsx';
import WithHeader from './WithHeader.jsx';


class App extends React.Component {
    
    constructor(props){
        super(props);
        this.handleAuthentication = this.handleAuthentication.bind(this)
        this.state = {auth: new Auth()}
    }
    

    handleAuthentication (nextState, replace) {
      if (/access_token|id_token|error/.test(nextState.location.hash)) {
        this.state.auth.handleAuthentication();
      }
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                <Switch>
                    <Route exact path="/" render={(props) =>{
                        return <WithHeader links={false}><Home /></WithHeader>
                    }} />
                    <Route exact path="/hub" render={(props) =>{
                        return this.state.auth.isAuthenticated() ? <WithHeader links={true}><Hub /></WithHeader> : <Redirect to="/" />
                    }} />
                    <Route exact path="/lists" render={(props) =>{
                        return this.state.auth.isAuthenticated() ? <WithHeader links={true}><Lists {...props} /></WithHeader> : <Redirect to="/" />
                    }} />
                    <Route exact path="/lists/:list" render={(props) =>{
                        return this.state.auth.isAuthenticated() ? <WithHeader links={true}><Lists {...props} /></WithHeader> : <Redirect to="/" />
                    }} />
                    <Route path="/callback" render={(props) => {
                      this.handleAuthentication(props);
                      return <WithHeader links={false}><Callback {...props} /></WithHeader> 
                    }}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
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
export default connect(mapStateToProps, mapDispatchToProps)(App);
