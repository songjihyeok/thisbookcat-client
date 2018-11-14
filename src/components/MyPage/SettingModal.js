import React, {Component} from 'react'
import {Modal, Button} from 'react-bootstrap'
import './CSS/SettingModal.css'
import server_url from '../../url.json'
import axios from 'axios'

class SettingModal extends Component {

  state = {
    files:[]
  }

  _handlingImage= (event) =>{
    console.log("받은 files",event.target.files[0]);
    const file = event.target.files[0]
    this.setState({
      files : this.state.files.concat(file)
    })
  }



  _postProfileImagetoServer = () => {

    console.log("imageData---------",this.state.files[0])

    const token = window.localStorage.getItem('token');


    const formData = new FormData();

    formData.append('imgFile', this.state.files[0]);

    console.log(formData)

    axios.post(`http://${server_url}:3000/api/user/update`, formData, { headers: { 'content-type': 'multipart/form-data','Authorization': `bearer ${token}`}})
    /*axios.post('http://ec2-54-180-29-101.ap-northeast-2.compute.amazonaws.com:3000/api/user/update', this.imageData, { headers: { 'Authorization': `bearer ${token}` }})*/
    .then(response => console.log(response))
    .catch(error => console.log(error))
  }

  _handleConfirm = () => {
    // this._getProfileImage()
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