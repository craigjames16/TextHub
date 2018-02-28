import React from 'react'
import axios from 'config.js';

class ContactList extends React.Component {

  constructor(props) {
    super(props);
    this.state ={}

  }

  sendMessages() {
    const formData = new FormData();

    formData.append('list',this.props.list)
    
    axios.post('messages/', formData,config).then((response) => {
      console.log(response)
    })
  }
  

  render() {
    return (<div className="lists-table-container contacts-list box-shadow">
      {this.props.contacts.length ? <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col" style={{width:'10px'}}>#</th>
                  <th scope="col">Contact Name</th>
                  <th scope="col">Contact Number</th>
                </tr>
              </thead>
              <tbody>
                {this.props.contacts.map((contact,index) => {
                    return  (<tr>
                        <th scope="row">{index+1}</th>
                        <td>{contact.name}</td>
                        <td>{contact.mobile_number}</td>
                    </tr>)
                })}
              </tbody>
            </table>:null}
      
   {this.props.list ? <button className="btn btn-info" onClick={this.sendMessages.bind(this)}>Send Messages</button>:null}
   </div>
   )
  }
}



export default ContactList