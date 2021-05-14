import React, { Component, Fragment } from "react";
import {Button} from 'react-bootstrap'
import server_url from '../url.json';
import axios from 'axios'
class RemovePrivacy extends Component {
    
     token = window.localStorage.getItem('token')
    deleteHandler =()=>{
  
        window.localStorage.removeItem("token");
  
        axios.post(`https://${server_url}/api/user/delete`,{},{headers: {Authorization: `bearer ${this.token}`}})
        
        this.props.history.push("/")
    }

    cancelHandler =()=>{
        this.props.history.push("/main")
    }

    render() {
        return <div className="removePrivacy">
            <div className="removeAskText">회원 탈퇴 및 회원 정보 삭제를 진행합니다.</div>
            <div className="removeButtonWrapper">
                <Button variant="primary" size="lg" active onClick={this.deleteHandler}>
                        삭제
                </Button>{' '}
                <Button variant="secondary" size="lg" active onClick={this.cancelHandler}>
                        취소
                </Button>
            </div>
        </div>
    }
}

export default RemovePrivacy;
