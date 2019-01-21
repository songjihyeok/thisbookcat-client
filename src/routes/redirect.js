import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Login from './Login';
import axios from 'axios';


class redirect extends Component {

  redirect = async ()=>{
    try{
    window.localStorage.setItem('token', this.props.match.params.token);
    
    let preferenceList = await this.getgoogleloginData();

    console.log("취향 리스트",preferenceList);
    return <Login preference={preferenceList}></Login>
    }
    catch(err){
      throw new Error(err)
    }
  }

  getgoogleloginData = async()=>{

    let token = window.localStorage.getItem('token')
    const res_getPreference = await axios.get(`https://server.afteread.net/api/user/pickedOrnot`,{headers: {Authorization: `bearer ${token}`}})
    console.log("데이터",res_getPreference)
    return res_getPreference;
  }

  render() {
    return (
     <div>
       {this.redirect()}
     </div> 
    )
  }
}

export default redirect;