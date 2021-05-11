import React, { Component } from "react";
import server_url from '../../url.json';
import defaultimage from '../../img/다운로드.png';
import axios from 'axios';

class followList extends Component {

  state={
    follow: false
  }

  authHeader = {headers:{Authorization: `bearer ${window.localStorage.getItem('token')}`}}

  handleProfileImage=()=>{
    if(this.props.data[0].profileImage){
      return `https://${server_url}/upload/${this.props.data[0].profileImage}`
    }
    return defaultimage
  }

  _handleFollowings=()=>{
    if(this.state.follow){
     return <button className="ui teal button" onClick={this.following}>팔로잉</button>
    }
    return <button className="ui grey button" onClick={this.following}>팔로우</button> 
  }

   following=async()=>{
   
     if(this.state.follow) {
      const resultfollowDelete =await axios.delete(`https://${server_url}/api/follow/delete/${this.props.data[0].id}`, this.authHeader)  
      console.log(resultfollowDelete)
      this.setState({follow:false})
     } else {
      const followResult =await axios.post(`https://${server_url}/api/follow/${this.props.data[0].id}`, {}, this.authHeader)
      console.log(followResult)
      this.setState({follow:true})
     }
   }   
   componentDidMount(){
    if(this.props.data[1]){
      this.setState({follow:true})
    }  
   }

  render(){
    return (
      <ul className="followList">
        <li>
        <p className="thumbs">
        <img className="followListProfile" src={this.handleProfileImage()} alt="이미지가 등록되지 않았습다"/>
        </p>
        <dl>
          <dt>{this.props.data[0].userName}</dt>
        </dl>
          <div className="user_follow">
           {this._handleFollowings()}   
          </div>
        </li>
      </ul>
    )
  }
}


export default followList;
