import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import {axios} from 'config.js';

//Components
import ViewList from 'components/ViewList.jsx'
import AllLists from 'components/AllLists.jsx'


class ConfirmContactRow extends Component {
    constructor(props) {
        super(props)
        this.state = {colors:['white','#a1e09a','#fffda8','#db5151']}
    }

    componentWillMount() {
        //Set Status and color
        if (this.props.contact.replies.length) {
            if (this.props.contact.replies[0].body == "C") {
                this.setState({confirmed:1,status:"Confirmed"})
            } else if (this.props.contact.replies[0].body == "R") {
                this.setState({confirmed:2,status:"Contact"})
            } else {
                this.setState({confirmed:3,status:this.props.contact.replies[0].body})
            }
        } else {
            this.setState({confirmed:0,status:"No Reply"})
        }
    }

    render() {
        const rowStyle = {"backgroundColor":this.state.colors[this.state.confirmed]}

        return(<tr key={this.props.index} style={rowStyle} ><td>{this.props.index+1}</td>
                <td>{this.props.contact.name}</td>
                <td>{this.props.contact.number}</td>
                <td>{this.state.status}</td>
                </tr>)
    }
}


export default ConfirmContactRow