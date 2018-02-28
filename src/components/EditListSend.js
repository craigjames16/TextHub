import React, { Component } from 'react';
import { Router, BrowserRouter, Route, Link, browserHistory, Redirect, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import * as actions from "actions/mainActions.js";

import {axios} from 'config.js';

//Components
import ViewList from 'components/ViewList.jsx'
import Alerts from 'components/Alerts.jsx'
import ConfirmContactRow from 'components/ConfirmContactRow.jsx'


class EditListSend extends Component {
    constructor(props) {
        super(props)
        this.state = {messageBody:'Due to lack of registrations we have canceled the class.',appendedBody:'Please reply with "C" to confirm receipt of message, or "R" if you would like a representative to contact you'}

    }
    
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }    

    sendMessages() {
      var _this = this
      const formData = new FormData();

      formData.append('list',this.props.list.id)
      formData.append('message_body',this.state.messageBody)
      formData.append('append_body',this.state.appendedBody)

      axios.post('messages/', formData).then((response) => {
        if (response.status == 200) {
          _this.setState({success:response.data.payload.success})
          setTimeout(function(){location.reload()},3000)
        } 

      }).catch((error) => {
        if (error.hasOwnProperty('response')){
          if(error.response.status == 500) {
            _this.setState({error:error.response.statusText})
          } else if (error.response.status == 400) {
            _this.setState({error:error.response.data.payload.error})
          }  
        } else {
          console.log(error)
        }
      }) 
    }

    removeMessage() {
      this.setState({success:undefined,error:undefined})
    }

    render() {
      var disabled = this.props.list.status == 1 ? true : false
      
        return (<div>
         <div className="container-white">
         {this.state.success ? <Alerts show={this.state.success} type="alert-success" removeError={this.removeMessage.bind(this)} message={this.state.success} /> :<div>
         {this.state.error ? <Alerts show={this.state.error} type="alert-danger" removeError={this.removeMessage.bind(this)} message={this.state.error} /> :null}
          <div className="form-group">
            <label><h4>Message Body</h4></label>
            <textarea className="form-control" disabled={disabled} value={this.state.messageBody} onChange={this.handleInputChange.bind(this)} name="messageBody" />
          </div>
          <div className="form-group">
            <label><h5>Appended Message</h5></label>
            <textarea type="text" className="form-control" value={this.state.appendedBody} disabled="true"/>
          </div>
          {disabled ? <button type="button" disabled className="btn btn-danger" onClick={this.sendMessages.bind(this)}>Message Sent</button> : <button type="button" className="btn btn-info" onClick={this.sendMessages.bind(this)}>Send Messages</button>}
        </div>}</div></div>
      )
    }
}

export default EditListSend