import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class redirect extends Component {
  
  render() {
    const token = this.props.match.params.token
    console.log("token과 취향 선택여부", token)
    window.localStorage.setItem('token', token);
    return <Redirect to="/" />
  }
}

export default redirect;