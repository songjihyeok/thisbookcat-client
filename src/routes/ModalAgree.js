import React, {Component} from 'react'
import {Modal, Button} from 'react-bootstrap'
import style from '../components/MyPage/SettingModal.css'
import Using from './PolicyHtml/usingPolicy.js'
import Privacy from './PolicyHtml/privacyPolicy.js'

class ModalAgree extends Component {
  render() {
    return (
      <Modal show={this.props.show} container={this}
            onHide={this.props.hide} aria-labelledby="contained-modal-title">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
        <div className="agreeLayout">
          <div className="agreeContent" id="usingPolicy">
            <h3>이용약관</h3>
            <div className="policy"><Using /></div>
            <p className="agreeCheck"><input type="checkbox" id="agreeUsing" /><label for="agreeUsing">동의합니다</label></p>
          </div>

          <div className="agreeContent" id="privacyPolicy">
            <h3>개인정보 보호 약관</h3>
            <div className="policy"><Privacy /></div>
            <p className="agreeCheck"><input type="checkbox" id="privacyUsing" /><label for="privacyUsing">동의합니다</label></p>
          </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this._handleConfirm}>동의</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}  
  
export default ModalAgree