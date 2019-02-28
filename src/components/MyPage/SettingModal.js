import React, {Component} from 'react'
import {Modal, Button} from 'react-bootstrap'
// import style from './CSS/SettingModal.css'
import style from './SettingModal.css'
import server_url from '../../url.json'
import axios from 'axios'
import CheckUserName from './checkuserName'



class SettingModal extends Component {
  constructor(props){
    super(props);
    const imageNameArray = this.props.beforeImage.split("/")
    const imageName = imageNameArray[imageNameArray.length-1];
    const userName = this.props.beforeUserName

    this.state = {
      isLogin: true,
      files: '',
      imageName : imageName,
      userName : userName
    }
  }


  _logout = e => {
    e.preventDefault();
    window.localStorage.removeItem('token');
    this.setState({isLogin: false})
  }


  _getProfileImage = () => {

    let file = document.querySelector('input[type=file]').files[0]
    this.setState({
      files: file,
      imageName: file.name,
    });
    document.getElementById('fileName').value = file.name;
    // console.log('this is imageData', this.state.files)
  }
  
  _postProfileImagetoServer = () => {
    // console.log('there should be something here', this.state.files)
    const token = window.localStorage.getItem('token');
    let formData = new FormData()

 
      this._deleteBeforeImage();
    
    if(this.state.files){
    formData.append('imgFile', this.state.files)
    axios.post(`https://${server_url}/api/user/update`, formData, {
      headers: { 'content-type': 'multipart/form-data','Authorization': `bearer ${token}`}
    })
    .then(response => this.props.callback(response))
    .catch(error => console.log(error))
    }
  }

  _deleteBeforeImage =()=>{
    const imageNameArray = this.props.beforeImage.split("/")
    const imageName = imageNameArray[imageNameArray.length-1];
    if(imageName!==this.state.imageName){
    const token = window.localStorage.getItem('token');
    axios.delete(`https://${server_url}/img/mainimage/${imageName}`,{headers: { 'Authorization': `bearer ${token}`}}) 
    }  
  }


  _handleConfirm = async () => {
    this.sendUserName();
    this._postProfileImagetoServer()
    this.props.hide()
  }

  setUserName = async(userName) =>{
    this.setState({userName})
  }

  sendUserName =async()=>{
    try{
    if(this.state.userName !== ''){
      const token = window.localStorage.getItem('token');
      const userNameResult =await axios.post(`https://${server_url}/api/user/updateUserName`,{
        userName: this.state.userName},{headers: {'Authorization': `bearer ${token}`}});
        if(userNameResult){
          this.props.setUserName(this.state.userName);
        }
      }
    }
    catch(err) { 
      throw new(err)
    }
  }

  render() {
    console.log("모달창??? ")
    return (
      <Modal show={this.props.show} container={this}
            onHide={this.props.hide} aria-labelledby="contained-modal-title" className="modal-manage">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">내 정보 변경하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="fileUploadContent">
          <div className="fileUpload">
            <input type="text" id="fileName" value={this.state.imageName} className="file_input_textbox" readOnly="readonly" />  
            <div className="file_input_div">
              <input type="button" value="프로필 변경" className="file_input_button" />
              <input type="file" className="file_input_hidden" id={style.setting_input} name="choose image" onChange={this._getProfileImage} />
            </div>
          </div>
          <CheckUserName beforeUserName={this.state.userName}checked={(e)=>{this.setUserName(e)}}/>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this._handleConfirm}>닫기</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}  
  
  export default SettingModal