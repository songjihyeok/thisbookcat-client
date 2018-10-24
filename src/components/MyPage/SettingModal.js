import React, {Component} from 'react'
import {Modal, Button} from 'react-bootstrap'
import './CSS/SettingModal.css'
import axios from 'axios'

class SettingModal extends Component {

  state = {
    ImageData:''
  }

  _getProfileImage = () => {
    
    let file = document.querySelector('input[type=file]').files[0]

    /* let reader = new FileReader() */

    let formData = new FormData();

    /* reader.onload = (e) => {

      this.setState({
        ImageData: e.target.result
      })
    }

    reader.(file); */
  
    console.log('this should be binary form',this.state.ImageData)

    formData.append('imgFiles', file)

    this.setState({
      ImageData:formData
    })

    console.log('this should be formData', this.state.ImageData)
  }

  _postProfileImagetoServer = () => {

    console.log(this.state.ImageData)

    const token = window.localStorage.getItem('token');

    let filename = {
      filename: this.state.ImageData
    }

    axios.post('http://ec2-54-180-29-101.ap-northeast-2.compute.amazonaws.com:3000/api/user/update', filename, { headers: { 'Authorization': `bearer ${token}` }})
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
            <input name = '프로필사진등록' type="file" onChange={this._getProfileImage}/>
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