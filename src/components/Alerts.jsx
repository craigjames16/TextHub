import React from 'react'
import axios from 'config.js';

//Components
import ContactList from 'components/ContactList';

class Alerts extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
        
        {this.props.show ? <div className={"alert "+this.props.type+" alert-dismissible fade show"} role="alert">
          {this.props.message}
          <button type="button" className="close" onClick={this.props.removeError} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>: null}
      </div>
   )
}
}



export default Alerts