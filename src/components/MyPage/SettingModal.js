import React, {Component} from 'react'
import {Modal, Button} from 'react-bootstrap'
// import style from './CSS/SettingModal.css'
import style from './SettingModal.css'
import server_url from '../../url.json'
import axios from 'axios'
import CheckUserName from './checkuserName'


class SettingModal extends Component {

  state = {
    isLogin: true,
    files: null,
    userName : ''
  }

  _logout = e => {
    e.preventDefault();
    window.localStorage.removeItem('token');
    this.setState({isLogin: false})
  }


  _getProfileImage = () => {
    let file = document.querySelector('input[type=file]').files[0]
    // console.log('this is the first file', file)
    this.setState({
      files: file,
      fileName: file.name,
    });
    document.getElementById('fileName').value = file.name;
    // console.log('this is imageData', this.state.files)
  }
  
  _postProfileImagetoServer = () => {
    // console.log('there should be something here', this.state.files)
    const token = window.localStorage.getItem('token');
    let formData = new FormData()

    if(this.state.files){
    formData.append('imgFile', this.state.files)
    axios.post(`https://${server_url}/api/user/update`, formData, {
      headers: { 'content-type': 'multipart/form-data','Authorization': `bearer ${token}`}
    })
    .then(response => this.props.callback(response))
    .catch(error => console.log(error))
    }
  }

  _handleConfirm = async () => {
    await this.sendUserName();
    await this._postProfileImagetoServer()
    await this.props.hide()
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
      console.log("userName 변경 결과",userNameResult);
      }
    }
    catch(err) { 
      throw new(err)
    }
  }


  render() {

    return (
      <Modal show={this.props.show} container={this}
            onHide={this.props.hide} aria-labelledby="contained-modal-title">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">내 정보 변경하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="fileUploadContent">
          <div className="fileUpload">
            <input type="text" id="fileName" className="file_input_textbox" readOnly="readonly" />  
              <div className="file_input_div">
                <input type="button" value="프로필 사진 변경" className="file_input_button" />
                <input type="file" className="file_input_hidden" id={style.setting_input} name="choose image" onChange={this._getProfileImage} />
              </div>
              <CheckUserName checked={(e)=>{this.setUserName(e)}}/>
          </div>
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