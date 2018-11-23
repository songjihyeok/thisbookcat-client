import React, { Component } from "react";
// import Nav1 from "../components/Nav1";
import '../components/Login/Login.css';
import { Icon } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import { Button } from 'react-bootstrap'
import axios from 'axios';
import server_url from '../url.json';
import mainImg from '../img/main-logo.svg';

class Login extends Component {
  state = {
    email : '',
    password : '',
    isLogin : false,
    login_err: false,
    preference: [],
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

    const res_postLogin = await axios.post(`http://${server_url}:3000/api/user/login`, user, {
      headers: {'Access-Control-Allow-Origin': '*'}})
    window.localStorage.setItem('token', res_postLogin.data) //받은 토큰을 localStorage에 심고,
    const res_getPreference = await axios.get(`http://${server_url}:3000/api/user/pickedOrnot`,{ //preference가 있는지 확인한다.
      headers: {Authorization: `bearer ${res_postLogin.data}`}})
    // console.log('pickedOrnot에 get요청 후 받는 res_getPreference ___', res_getPreference)
    this.setState({
      isLogin: true,
      login_err: false,
      preference: res_getPreference.data,
    })
      // .catch(err => {
      //   console.log('login.js > _handleSubmit함수에서 axios.post 요청보냈는데, err___', err)
      //   this.setState({
      //         isLogin : false,
      //         login_err : true})
      // })
  }

  // _googleAuth = (e) => {
  //   /*axios.get(`{http://${url}:3000/api/post/postId}`)*/
  //   axios.get(`http://${server_url}:3000/auth/google`, {
  //     header:{'Access-Control-Allow-Origin':'*'}
  //   })
  //   .then(res => {
  //     console.log('google Auth res입니다.', res)
  //   })
  // }

  render() {
    if (window.localStorage.getItem('token') && this.state.preference.length) {
      return <Redirect to ='/' />;
    } else if (window.localStorage.getItem('token') && this.state.preference.length===0) {
      return <Redirect to ='/picktaste' />;
    } else {
      return (
        <div className="backImg">
          <div className='login_container' >
            <div className='login_container_1'>
              <div className='login_container_2'>
              <div className='title1'>북컨텐츠를 모두와 함께 공유하는</div>
              {/* <h1>이책반냥<Icon name="paw" size="small" /></h1> */}
              {/* <img src={mainImg}/> */}
              <div className='title2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="166" height="44">
                  <text fill="#FEFEFE" font-family="BM DoHyeon OTF" font-size="47.061" transform="translate(.392 35.64) scale(.93495)">
                    이책반냥
                  </text>
                </svg>
              </div>
              

              <div className='title3'>이책반냥에 오신 것을 환영합니다</div>
              {(this.state.login_err)
              ?
                <div>
                  <div>로그인할 수 없습니다.</div>
                  <div>이메일 혹은 비밀번호가 올바르지 않습니다.</div>
                </div>
              : <div></div>
              }
              </div>
              <form onSubmit={this._handleSubmit}>
                <div><input className='login_input' type="email" placeholder="이메일을 입력해주세요"
                            onChange={this._setEmail}/>
                </div>
                <div><input className='login_input' type="password" placeholder="비밀번호를 입력해주세요"
                            onChange={this._setPassword}/>
                </div>
                <div><Button bsClass="custom_btn_continue" type='submit' className='login_btn'>계속하기</Button></div>
              </form>
              <div style={{color: '#ffffff',
                          fontSize: '13.8px',
                          marginTop: '14px',
                          marginBottom: '24px'}}>
                또는
              </div>
              <div><Button bsClass="custom_btn_facebook" className='login_btn'>FACEBOOK으로 계속하기</Button></div>
              <div><Button bsClass="custom_btn_google" className='login_btn' onClick={this._googleAuth}>GOOGLE로 계속하기</Button></div>
              {/* <div><button className='login_btn'>FACEBOOK으로 계속하기</button></div>
              <div><Button className='login_btn' onClick={this._googleAuth}>GOOGLE로 계속하기</Button></div> */}
              {/* <div className='login_privacy'>{`계속하면 이책반냥 서비스 약관 및 개인정보 보호 정책에 동의하는 것으로 간주합니다.`}</div> */}
              {/* TODO: 재플린에는 위의 내용이 없습니다용? */}
              <div className='login_flex'>
                <Link to="/signup"><div style={{color: 'rgba(255, 255, 255, 0.5)'}}>회원가입</div></Link>
                <Link to="/findpw"><div style={{color: 'rgba(255, 255, 255, 0.5)'}}>아이디/비밀번호 찾기</div></Link>
              </div>
            </div>
          </div>
        </div>
    );
  }}
}

export default Login;