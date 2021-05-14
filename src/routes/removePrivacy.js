import React, { Component, Fragment } from "react";
import {Button} from 'react-bootstrap'

class RemovePrivacy extends Component {

    deleteHandler =()=>{
        window.localStorage.removeItem("token");
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
