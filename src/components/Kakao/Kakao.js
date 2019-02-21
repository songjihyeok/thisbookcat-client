import React, {Component} from 'react';
import KakaoLogin from 'react-kakao-login';


export default class Kakao extends Component {
  state ={ 
    isLoggedIn : false,
    userID : '',
    name : '',
    email:'',
    picture:''
  }
  success = (response) => {
    console.log(response);
  };
   
  failure = (error) => {
    console.log(error);
  };


  render(){
    const key = '3b654961919be4524c870b594dff61f4'
    return (
    <div>
      <KakaoLogin
      jsKey= {key}
      useDefaultStyle
      onSuccess={this.success}
      onFailure={this.failure} />
      </div>
    )
  }
}

