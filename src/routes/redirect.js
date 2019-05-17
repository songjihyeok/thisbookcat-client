import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ModalAgree from "./ModalAgree";

class redirect extends Component {
  
  state={
    agreed: false,
    show: true,
  }

  agreeHandler=()=>{
    const token = this.props.match.params.token
    const agreed = this.props.match.params.agreed
    let parsedAgree = JSON.parse(agreed)

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