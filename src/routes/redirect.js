import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ModalAgree from "./ModalAgree";

class redirect extends Component {
  
  state={
    agreed: false,
    show: true,
  }

  _handleHide=()=>{
    this.setState({show:false});
    window.location.href="/"
  }

  agreeHandler=()=>{
    const token = this.props.match.params.token
    const agreed = this.props.match.params.agreed
    const parsedAgree = JSON.parse(agreed)

    if(!parsedAgree){
      console.log("모달창으로 가즈아!!")
      return  <ModalAgree token={token} show={this.state.show} hide={this._handleHide}/>
    } else {
      window.localStorage.setItem('token', token);
      return <Redirect to="/" />
    }
  }



  render() {
    return (
      <div>
         {this.agreeHandler()}
      </div>
    )
  }
}

export default redirect;