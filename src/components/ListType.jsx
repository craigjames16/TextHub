import React, { Component } from 'react';
import { Router, BrowserRouter, Route, Link, browserHistory, Redirect, Switch } from 'react-router-dom';

import {axios} from 'config.js';
import loader from 'img/loader.gif'

//Components
import ViewList from 'components/ViewList.jsx'


class ListType extends Component {
    constructor(props) {
        super(props)
        this.state = {lists:[]}
        this.removeList = this.removeList.bind(this)
        this.sortLists = this.sortLists.bind(this)
    }

    componentWillReceiveProps(nextProps) {
      this.setState({lists:nextProps.lists})
    }

    componentWillMount() {
      this.setState({lists:this.props.lists})
    }

    removeList(list_id) {
      var c = confirm("Are you sure you want to remove list?")

      if (c) {
        this.setState({working:true})
        axios.delete('lists/',{data: {list_id:list_id}}).then((response)=>{
          if(response.status == 200) {
            location.reload()
          } else {
            alert('Error in Deleting.')
          }
        }).catch((error) => {
          if (error.response.status == 400) {
            this.setState({error:error.response.data.payload.error})
          } 
        })
      }
    }

  sortLists(list,sortBy) {
  const myData = [].concat(this.state.lists)

  switch(sortBy) {
    case 'status':
      myData.sort(function(first, second) {
        return second.status - first.status;
      });
      break;

    case 'name':
      myData.sort();
      break;

    default:
      myData.sort(function(first, second) {
        return second.list_name - first.list_name;
      });
      break;
    }
    
    this.setState({lists:myData})
  }

  render() {
  return(<div>
    <div className="container-white">
    <h5>{this.props.listType}</h5>
    {this.state.lists.length ? 
      <div className="lists-table-container">
      {this.state.working ? <div className="center-text" style={{width:'100%'}}><img src={loader} /> </div>:
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col" style={{width:'10px'}}>#</th>
                <th scope="col" onClick={() => {this.sortLists(this.state.lists,'name')}}>List Name</th>
                <th scope="col" onClick={() => {this.sortLists(this.state.lists,'date')}}>Date Added</th>
                <th scope="col" onClick={() => {this.sortLists(this.state.lists,'status')}}>Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
               {this.state.lists.map((list,index) => {
                  return  (<tr key={index}>

                    <th scope="row">{index+1}</th>
                    <td><Link to={"/lists/"+list.id}>{list.list_name}</Link></td>
                    <td>{list.added}</td>
                    <td>{list.status == 1 ? <p>Sent</p>:<p>Not Sent</p>}</td>
                    <td><p className="function" onClick={() => {this.removeList(list.id)}}>Remove</p></td>

                  </tr>)
              })}
            </tbody>
          </table>
          }</div>: <p>No Lists</p>}
      </div>
    </div>)
  }
}


export default ListType