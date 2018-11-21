import React, {Component} from 'react'
import {Modal, Button} from 'react-bootstrap'
import './CSS/SettingModal.css'
import server_url from '../../url.json'
import axios from 'axios'

class SettingModal extends Component {

  state = {
    files: ''
  }

  _getProfileImage = () => {
    let file = document.querySelector('input[type=file]').files[0]
    // console.log('this is the first file', file)
    this.setState({
      files: file,
      fileName: file.name
    })
    // console.log('this is imageData', this.state.files)
  }
  
  _postProfileImagetoServer = () => {
    // console.log('there should be something here', this.state.files)
    const token = window.localStorage.getItem('token');
    let formData = new FormData()
    formData.append('imgFile', this.state.files)
    axios.post(`http://${server_url}:3000/api/user/update`, 
      formData,
      { headers: { 'content-type': 'multipart/form-data','Authorization': `bearer ${token}`}}
    )
    .then(response => this.props.callback(response))
    .catch(error => console.log(error))
  }

  _handleConfirm = async () => {
    await this._postProfileImagetoServer()
    await this.props.hide()
  }

  render() {
      return (
           <Modal show={this.props.show}
                  onHide={this.props.hide}
                  container={this}
                  aria-labelledby="contained-modal-title">
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">UploadModal</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className = 'PhotoUploadModal'>
                  <Button bsStyle="primary">비밀번호변경</Button>
                  <input type="file" name="choose image" onChange={this._getProfileImage}></input>
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