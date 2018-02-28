import React from 'react'
import {axios} from 'config.js';

//Components
import UploadForm from 'components/UploadForm.jsx';

class Hub extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null, contacts:[],uploading:false
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChangeDrop = this.onChangeDrop.bind(this)
    this.onChangeNav = this.onChangeNav.bind(this)
    this.onTextChange = this.onTextChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }

  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    var _this = this
    this.fileUpload(this.state.file)
  }
  
  onChangeDrop(files) {
    var listName = files[0].name.replace(/.xlsx|.xls/gi,'')
    this.setState({file:files[0],list_name:listName})
  }

  onChangeNav(e) {
    var listName = e.target.files[0].name.replace(/.xlsx|.xls/gi,'')
    this.setState({file:e.target.files[0],list_name:listName})
  }
  
  onTextChange(e) {
    this.setState({list_name:e.target.value})
  }
  
  fileUpload(file){
    var _this = this
    const formData = new FormData();
    this.setState({uploading:true})

    formData.append('file',file)
    formData.append('list_name',this.state.list_name)

    return  axios.post('lists/', formData).then((response)=>{
            if(response.status == 200) {
              _this.setListResponse(response.data.payload)  

            } else {
              alert('Error in uplaod.')

            }
            }).catch((error) => {
              if (error.response.status == 400) {
                this.setState({error:error.response.data.payload.error,uploading:false})
                
              } 
            })
  }
  
  removeError() {
    this.setState({error:undefined,success:undefined})
  }

  setListResponse(list) {
    this.setState({success:"List added successfully!",uploading:false})
  }

  render() {
    return (<div>
        <div className="center-text">
        <UploadForm uploading={this.state.uploading} success={this.state.success} removeError={this.removeError.bind(this)} error={this.state.error} onFormSubmit={this.onFormSubmit} onChangeDrop={this.onChangeDrop} onChangeNav={this.onChangeNav} onTextChange={this.onTextChange} list_name={this.state.list_name} />
      </div>
      </div>
   )
  }
}



export default Hub