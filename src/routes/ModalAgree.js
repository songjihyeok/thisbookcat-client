import React, {Component} from 'react'
import {Modal, Button} from 'react-bootstrap'
// import style from '../components/MyPage/SettingModal.css'
import Using from './PolicyHtml/usingPolicy.js'
import Privacy from './PolicyHtml/privacyPolicy.js'
import axios from 'axios';
import serverUrl from '../url.json'



class ModalAgree extends Component {

  constructor(props){
    super(props);
    this.state={
      usingPolicy: false,
      privacyUsing: false,
      postAgree: false
    }
    this.settingToken = this.props.token;
  }


  _handleConfirm=async()=>{
    if(this.state.usingPolicy&&this.state.privacyUsing){

      const agreeResult =await axios.post(`https://${serverUrl}/api/user/agree`,{}, {headers: {'authorization': `bearer ${this.settingToken}`}} )

      if(agreeResult){
        window.localStorage.setItem('token', this.settingToken);
        window.location.href="/"
      }
    
    } else {
      alert("상기 내용에 모두 동의 해주시기 바랍니다")
    }
  }

  policyHandler1=()=>{
    if(!this.state.usingPolicy){
      this.setState({usingPolicy:true})
    } else {
      this.setState({usingPolicy:false})
    }
  }

  policyHandler2=()=>{
    if(!this.state.privacyUsing){
      this.setState({privacyUsing:true})
    } else {
      this.setState({privacyUsing:false})
    }
  }


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
            <p className="agreeCheck"><input type="checkbox" id="agreeUsing" onClick={this.policyHandler1}/><label for="agreeUsing">동의합니다</label></p>
          </div>

          <div className="agreeContent" id="privacyPolicy">
            <h3>개인정보 보호 약관</h3>
            <div className="policy"><Privacy /></div>
            <p className="agreeCheck"><input type="checkbox" id="privacyUsing" onClick={this.policyHandler2}/><label for="privacyUsing">동의합니다</label></p>
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