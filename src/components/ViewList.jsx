import React, { Component } from 'react';
import { Router, BrowserRouter, Route, Link, browserHistory, Redirect, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import * as actions from "actions/mainActions.js";

import {axios} from 'config.js';
import loader from 'img/loader.gif';

//Components
import EditListSend from 'components/EditListSend'
import ViewList from 'components/ViewList.jsx'
import ConfirmContactRow from 'components/ConfirmContactRow.jsx'


class Lists extends Component {
    constructor(props) {
        super(props)
        this.state = {list:{contacts:[]}}
    }

    componentWillMount() {
      var _this = this

      this.setState({getting:true})

      axios.get('lists/'+this.props.listId).then((response) => {
        _this.setListData(response.data.payload)
      })
    }

    setListData(list) {
      var totalReplies = 0;
      var totalContacts = list.contacts.length

      for(var i=0;i<list.contacts.length;i++) {
        var currentContact = list.contacts[i]
        totalReplies += currentContact.replies.length
      }

      this.setState({list:list,totalContacts:totalContacts, totalReplies:totalReplies,getting:false})
    }

    render() {
        return(<div>
          <h3>{this.state.list.list_name}</h3>
          { this.state.getting ?  <div className="container"><div className="container-white"> <img src={loader} /></div></div> :
          <div className="container">
            <div className="row no-gutters">
              <div className="col-sm-6">
                <EditListSend list={this.state.list} />
                <div className="right-side-panel container-white">
                  <div className="totals-box">
                    <h5>Total Replies</h5>
                    <p>{this.state.totalReplies}</p>
                  </div>
                  <div className="totals-box">
                    <h5>Total Contacts</h5>
                    <p>{this.state.totalContacts}</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="container-white">
                  <h5>Contacts</h5>
                    
                  <div className="lists-table-container">
                    <table className="table">
                      <thead className="thead-dark">
                        <tr>
                          <th scope="col" style={{width:'10px'}}>#</th>
                          <th scope="col">Contact Name</th>
                          <th scope="col">Number</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                         {this.state.list.contacts.map((contact,index) => {
                        return <ConfirmContactRow contact={contact} index={index} key={index} />})}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>}
        </div>
        )
    }
}

export default Lists