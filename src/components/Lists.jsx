import React, { Component } from 'react';

import {axios} from 'config.js';

//Components
import ViewList from 'components/ViewList.jsx'
import AllLists from 'components/AllLists.jsx'


class Lists extends Component {
    constructor(props) {
        super(props)
        this.state = {lists:[]}
    }

    render() {
        return(<div className="center-text">
            {this.props.match.params.list ? <ViewList listId={this.props.match.params.list}/> : <AllLists />
            }
        </div>)
    }
}


export default Lists