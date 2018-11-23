import React, { Component } from "react";
import '../components/Login/Login.css';
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import server_url from '../url.json';
import book from "../img/book-img.png";

class SignUp extends Component {
  state = {
    // email : '',
    // password : '',
    confirmPassword : true,
    signUp_Done : false,
    signUp_Err: false,
    postedEmail:'',
  }

  user = {
    emailId: '',
    password: ''
  }

  _setEmail = (e) => {
    // console.log('Login.js의 setEmail함수입니다. e.target.value 찍는중', e.target.value)
    // this.setState({email : e.target.value});
    this.user.emailId = e.target.value
    //TODO: 이거 굳이 state 안에 둘 필요없을듯
  }

  _setPassword = (e) => {
    // console.log('Login.js의 setPw함수입니다. e.target.value 찍는중', e.target.value)
    // this.setState({password : e.target.value});
    this.user.password = e.target.value
    //TODO: 이거 굳이 state 안에 둘 필요없을듯

  }

  _checkPassword = (e) => {
    // console.log('Login.js의 checkPw함수입니다. e.target.value 찍는중', e.target.value)
    if(this.user.password === e.target.value) {
      this.setState({confirmPassword : true})
    }else{
      this.setState({confirmPassword : false})
    } //TODO:이거 이렇게 하면 되나염....'ㅁ'
  }

  _handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Login.js의 handleSubmit함수입니다. this.state 찍는중', this.state)
    if(this.user.emailId && this.user.password && this.state.confirmPassword) {
      try {
        await axios.post(`http://${server_url}:3000/api/user`, this.user, {headers:{'Access-Control-Allow-Origin':'*'}})
        this.setState({
          signUp_Done: true,
          signUp_Err: false,
          postedEmail: this.user.emailId, 
        })
      } catch(err) {
        console.log('signup.js > _handleSubmit 함수에서 axios.post 요청하고 실패후 받는 err__', err)
        console.log('signup.js > _handleSubmit 함수에서 axios.post 요청하고 실패후 받는 err.response.status__', err.response.status)
        // if (err.response.status === 400) { //400err 면 이미 가입 되어있는 아이디입니다.
          this.setState({
            signUp_Done: false,
            signUp_Err: true,
            postedEmail: this.user.emailId,
          })
        // }
      }

      
      // .then(res => {
      //   // console.log('signup.js > _handleSubmit 함수에서 axios.post 요청하고 나서 받는 res___', res);
      //   // console.log('signup.js > _handleSubmit 함수에서 axios.post 요청하고 나서 받는 res.data___', res.data);
      //     this.setState({
      //       signUp_Done: true,
      //       signUp_Err: false,
      //       // postedEmail: user.emailId, 
      //     })
      // })
      // .catch(err => {

      // })
    }
  }

  render() {
    if (this.state.signUp_Done) {
      return(
        <div>
          <div>{this.state.postedEmail}님! 이책반냥에 가입해주셔서 감사합니다.</div>
            <Link to="/"><div>로그인하러 가기</div></Link>
        </div>
      )
    } else {
      return (
        <div className="backImg">
          <div className='login_body' >
            <div className='login_container'>
              <div className='title2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="166" height="44">
                  <text fill="#FEFEFE" fontFamily="BM DoHyeon OTF" fontSize="47.061"
                        transform="translate(.392 35.64) scale(.93495)">
                    회원가입
                  </text>
                </svg>
              </div>
              {
              (this.state.signUp_Err)
              ? 
                <div className='title4'>
                  <div>{this.state.postedEmail}은</div>
                  <div>이미 가입되어 있는 아이디입니다</div>
                </div>
              : <div className='title3'>이책반냥에 오신 것을 환영합니다</div>
              }
              <form onSubmit={this._handleSubmit}>
                <div><input className='login_input' type="email"
                            placeholder="이메일을 입력해주세요"
                            onChange={this._setEmail}/></div>
                <div><input className='login_input' type="password"
                            placeholder="비밀번호를 입력해주세요"
                            onChange={this._setPassword}/></div>
                <div><input className='login_input' type="password"
                            placeholder="비밀번호를 다시 한번 입력해주세요"
                            onChange={this._checkPassword}/></div>
                {
                  this.state.confirmPassword
                ? <div style={{height: '40px'}}></div>
                : <div style={{color:'red', height: '40px'}}>비밀번호가 일치하지 않습니다.</div>
                }
                <div style={{marginTop: '30px'}}><button id="custom_btn_continue" className='login_btn' type='submit'>회원가입하기</button></div>
              </form>
              <div className='login_flex'>
                <Link to="/"><div style={{color: 'rgba(255, 255, 255, 0.5)'}}>로그인</div></Link>
                <Link to="/findpw"><div style={{color: 'rgba(255, 255, 255, 0.5)'}}>아이디/비밀번호 찾기</div></Link>
              </div>
            </div>
          </div>
          <div className="footer">
            <div>
              <img className="book_deco" src={book} style={{width: '85%', height: 'auto'}} alt='deco'></img>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default SignUp;
