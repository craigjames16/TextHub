import React, { Component } from 'react';
import { Router, BrowserRouter, Route, Link, browserHistory, Redirect, Switch } from 'react-router-dom';
import * as actions from "actions/mainActions.js";

import {axios} from 'config.js';
import loader from 'img/loader.gif';

//Components
import ViewList from 'components/ViewList.jsx'
import ListType from 'components/ListType.jsx'


class AllLists extends Component {
    constructor(props) {
        super(props)
        this.state = {lists:{unsentLists:[],sentLists:[]}}
    }

    componentWillMount() {
      var _this=this

      this.setState({getting:true})

      axios.get('lists/').then((response) => {
        _this.sortLists(response.data.payload)
      })
    }
    sortLists(lists) {
      var sentLists = []
      var unsentLists = []

      for (var i=0;i < lists.length;i++) {
        if (lists[i].status == 1) {
          sentLists.push(lists[i])

        } else if (lists[i].status == 0) {
          unsentLists.push(lists[i])
        
        }
      }

      this.setState({getting:false,lists:{unsentLists:unsentLists,sentLists:sentLists,allList:lists}})
    }

    render() {
    return(<div>
      <h3>Lists</h3>
      {this.state.getting ?  <div className="container"><div className="container-white"><img src={loader} /></div></div> : 
      <div className="container">
        <ListType lists={this.state.lists.unsentLists} listType="Unsent Lists" />
        <ListType lists={this.state.lists.sentLists} listType="Sent Lists" /><br />
      </div>}</div>)
    }
}


export default AllLists