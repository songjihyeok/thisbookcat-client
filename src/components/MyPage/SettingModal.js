import React, {Component} from 'react'
import {Modal, Button} from 'react-bootstrap'
import './CSS/SettingModal.css'
import axios from 'axios'

class SettingModal extends Component {

  state = {
    files:[]
  }
  _getProfileImage = () => {
    
    let file = document.querySelector('input[type=file]').files[0]

    this.setState({
      ImageData:file
    })

  _handlingImage= (files) =>{
    console.log(files);
    this.setState({
      files : this.state.files.concat(files)
    })
  }


  _postProfileImagetoServer = () => {

    console.log(this.state.ImageData)

    const token = window.localStorage.getItem('token');


    const formData = new FormData();

    formData.append('imgFile', this.state.ImageData)

    console.log(formData)

    let file = {
      formData
    }

    axios.post('http://ec2-54-180-29-101.ap-northeast-2.compute.amazonaws.com:3000/api/user/update/', file, { headers: { 'content-type': 'multipart/form-data','Authorization': `bearer ${token}`}})
    /*axios.post('http://ec2-54-180-29-101.ap-northeast-2.compute.amazonaws.com:3000/api/user/update', this.imageData, { headers: { 'Authorization': `bearer ${token}` }})*/
    .then(response => console.log(response))
    .catch(error => console.log(error))
  }

  _handleConfirm = () => {
    this.props.hide()
    this._postProfileImagetoServer()
  }

    render() {
      return (
           <Modal
            show={this.props.show}
            onHide={this.props.hide}
            container={this}
            aria-labelledby="contained-modal-title">
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">
              UploadModal
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className = 'PhotoUploadModal'>
            <Button bsStyle="primary">비밀번호변경</Button>
            <input name = '프로필사진등록' type="file" onChange={this._handlingImage.bind(this)}/>
            <Button bsStyle="primary">로그아웃하기</Button>
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