import React, { Component } from "react";
//import '../components/Login/Login.css';
import { Icon } from "semantic-ui-react";

class ResetPw extends Component {
  // TODO:  이 컴포넌트 함수형으로 바꾸기.
  render() {
    return (
      <div className='login_container' >
        <div className='resetPw_container_1'>
          <div className='login_container_2'>
            <h5>책, 콘텐츠를 모두와 공유하기</h5>
            <h1>이책반냥<Icon name="paw" size="small" /></h1>
            <h3>비밀번호 재설정하기</h3>
          </div>
          <h2>sueminee@gmail.com 님!</h2>
          <h4>새로운 비밀번호를 입력해주세요</h4>
          {/* <div className='signup_email'><input className='login_input' type="email" placeholder="이메일을 입력해주세요"></input></div> */}
          <div className='signup_email'>
            <div><input className='login_input' type="password" placeholder="비밀번호를 입력해주세요"></input></div>
            <div><input className='login_input' type="password" placeholder="비밀번호를 다시 한번 입력해주세요"></input></div>
          </div>
          <div><button className='login_btn'>비밀번호 재설정하기</button></div>
        </div>
      </div>
    )
  }
}

export default ResetPw;
