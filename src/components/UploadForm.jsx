import React from 'react'
import axios from 'config.js';
import FileDrop from 'react-file-drop';

import loader from 'img/loader.gif';

//Components
import Alerts from 'components/Alerts.jsx'

class UploadForm extends React.Component {

  constructor(props) {
    super(props);
    this.state ={}

  }

  render() {
    return (<div>
        <h3 className="title">Add List</h3>
        <div className="form-box box-shadow">
          <form onSubmit={this.props.onFormSubmit}>
            
            <Alerts show={this.props.error} removeError={this.props.removeError} message={this.props.error} type="alert-warning" />
            <Alerts show={this.props.success} message={this.props.success} type="alert-success" removeError={this.props.removeError} />
            
            <FileDrop frame={document} onDrop={this.props.onChangeDrop} targetAlwaysVisible={true}>
              Drop some files here!
            </FileDrop>

            <div className="form-group center-text">
              <label><b>Or</b></label>
              <input className="form-control-file" style={{margin:'0 auto'}} type="file" onChange={this.props.onChangeNav} name="file" id="file"  /><br />
            </div>

            <div className="form-group left-text">
              <label>List Name</label>
              <input className="form-control" type="text" onChange={this.props.onTextChange} name="list_name" value={this.props.list_name} /><br />
            </div>

            {this.props.uploading ? <img src={loader} className="loader" />:<button className="btn btn-info btn-lg" type="submit">Submit</button>}

          </form>
      </div>
      </div>
   )
}
}



export default UploadForm