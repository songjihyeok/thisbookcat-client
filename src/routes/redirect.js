import React, { Component } from "react";
import Login from './Login';


class redirect extends Component {
  
  render() {
    const token = this.props.match.params.token
    const pickedOrNot =[this.props.match.params.pickedOrNot];
    console.log("token과 취향 선택여부", token, pickedOrNot);
    window.localStorage.setItem('token', token);
    return (
     <div>
       <Login pickedOrNot={pickedOrNot}></Login>
     </div> 
    )
  }
}

export default redirect;