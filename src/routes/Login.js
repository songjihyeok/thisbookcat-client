import React, { Component } from "react";
import {Link,Redirect } from "react-router-dom";
import axios from 'axios';
import server_url from '../url.json';



class Login extends Component {
  state = {
    email : '',
    userID: '',
    picture:'',
    password : '',
    isLogin : false,
    login_err: false,
    preference: this.props.pickedOrNot || [],
  }

  _setEmail = e => {
    // console.log('Login.js의 setEmail함수입니다. e.target.value___', e.target.value)
    this.setState({email : e.target.value});
  }

  _setPassword = e => {
    // console.log('Login.js의 setPw함수입니다. e.target.value___', e.target.value)
    this.setState({password : e.target.value});
  }

  _handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Login.js의 handleSubmit함수입니다. this.state___', this.state)
    const user = {
      emailId: this.state.email,
      password: this.state.password
    }; 
    try {
      const res_postLogin = await axios.post(`https://${server_url}/api/user/login`, user, {
        headers: {'Access-Control-Allow-Origin': '*'}})
      window.localStorage.setItem('token', res_postLogin.data) //받은 토큰을 localStorage에 심고,
      //preference가 있는지 확인한다.
      const res_getPreference = await axios.get(`https://${server_url}/api/user/pickedOrnot`,{
        headers: {Authorization: `bearer ${res_postLogin.data}`}})
      // console.log('pickedOrnot에 get요청 후 받는 res_getPreference ___', res_getPreference)

      this.setState({
        isLogin: true,
        login_err: false,
        preference: res_getPreference.data,
      })
    } catch(err) {
        console.log('login.js > _handleSubmit함수에서 axios.post 요청보냈는데, err___', err)
        this.setState({
              isLogin : false,
              login_err : true})
    }
  }

  render() {

    if (window.localStorage.getItem('token')) {
      return <Redirect to ='/' /> 
    } else {
      return (
        <div className="backImg">
                <div className='login_body'>
                  <div className='login_container'>
                    <h1 id="logo">
                      <div className="textLogo">책 관련 행사, 이야기 그리고 모든 것</div>
                      <div className="imageLogo">애프터리드</div>
                      <div className="textLogo">로그인 해주세요</div>
                    </h1>

                    {/*}
                    {(this.state.login_err)?<div className='title4'>이메일 혹은 비밀번호가 올바르지 않습니다</div>: <div className='title3'>애프터리드에 오신 것을 환영합니다</div>}
                    */}
                    <form onSubmit={this._handleSubmit}>
                      <div><input className='login_input' type="email" placeholder="이메일을 입력해주세요"
                                  onChange={this._setEmail}/>
                      </div>
                      <div><input className='login_input' type="password" placeholder="비밀번호를 입력해주세요"
                                  onChange={this._setPassword}/>
                      </div>
                      <div><button id="custom_btn_continue" type='submit' className='login_btn'>계속하기</button></div>
                    </form>


                    <div><a href="https://server.afteread.net/auth/kakao"><button id="custom_btn_kakao" className='login_btn' >KAKAO로 계속하기</button></a></div> 
                    {/* <div><a href="https://server.afteread.net/auth/naver"><button id="custom_btn_naver" className='login_btn' >NAVER로 계속하기</button></a></div>  */}
                    <div><a href="https://server.afteread.net/auth/facebook"><button id="custom_btn_facebook" className='login_btn' >FACEBOOK으로 계속하기</button></a></div>
                   
                   {/* <FACEBOOK></FACEBOOK>  */}
                    <div><a href="https://server.afteread.net/auth/google"><button id="custom_btn_google" className='login_btn' onClick={this._googleAuth}>GOOGLE로 계속하기</button></a></div>
                    {/* <div className='login_privacy'>{`계속하면 이책반냥 서비스 약관 및 개인정보 보호 정책에 동의하는 것으로 간주합니다.`}</div> */}
                    {/* TODO: 재플린에는 위의 내용이 없습니다용? */}
                     
                     <div className='login_flex'>
                        <Link to="/signup"><div style ={{color: 'rgba(255, 255, 255, 0.5)'}}>회원가입</div></Link>
                    </div> 
                  </div>
                </div>
            </div>
    );
  }}
}

export default Login;