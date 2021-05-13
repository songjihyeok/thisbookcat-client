import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ModalAgree from "./ModalAgree";

class redirect extends Component {
  
  state={
    agreed: false,
    show: true,
  }

  agreeHandler=()=>{
    console.log("token", this.props.match)
    const token = this.props.match.params.token
    const agreed = this.props.match.params.agreed
    let parsedAgree = JSON.parse(agreed)
    console.log("token", token)
    console.log("agreed", agreed)
    if(!parsedAgree){
      return  <ModalAgree token={token} show={this.state.show}/>
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