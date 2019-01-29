import React, { Component } from 'react';
import { Button, button } from "semantic-ui-react";
import axios from 'axios';
import path from 'path';
import server_url from '../../url.json';
//import "./PostDetail.css";
import { pathToFileURL } from 'url';
import profileimage from "../../img/다운로드.png"
import { PropTypes} from 'prop-types';


export default class PostWriter extends Component {

  state = {
    userName: '',
    userImage: '',
    isFollowing:false,
    router : PropTypes.object
  }
 
  authHeader = {headers:{Authorization: `bearer ${window.localStorage.getItem('token')}`}}

  async componentDidMount(){
    await this._getUserData()
    await this._getFollowingData()
    await this._userImagecontrollor();
  }

  _getUserData = async () => {
    console.log("user 데이터를 가져와야하는데?")
    const res_getUser = await axios.get(`https://${server_url}/api/post/postedUserName/${this.props.postId}`, this.authHeader)
    console.log('_getUserData에서 res_getUser =========',res_getUser)
    this.setState({
      userName: res_getUser.data.userName,
      userImage: res_getUser.data.profileImage,
      userId: res_getUser.data.id
    })
  }

  _getFollowingData = async () => {
    const res_getFollowing = await axios.get(`https://${server_url}/api/follow/check/${this.props.userId}`, this.authHeader)
    // console.log('_getFollowingData 함수에서 axios.get 받아온 res_getFollowing.data 찍는중... this should be ture or false', res_getFollowing.data)
    this.setState({isFollowing: res_getFollowing.data})
  }

  _handleFollowing = async () => {
    if (this.state.isFollowing) {

      const resultfollowDelete =await axios.delete(`https://${server_url}/api/follow/delete/${this.props.userId}`, this.authHeader)
      console.log ("resultfollowDelete",resultfollowDelete)
      this.setState({isFollowing: false})
    } else {
      
      const followResult =await axios.post(`https://${server_url}/api/follow/${this.props.userId}`, {}, this.authHeader)
      console.log("followResult", followResult)
      this.setState({isFollowing: true})
    }
  }

  _handleDelete = async () => {
    const res_deletePost = await axios.delete(`https://${server_url}/api/post/${this.props.postId}`, this.authHeader)
    console.log("props", this.props)
    console.log(res_deletePost.data,'삭제되었습니다. res_deletePost.data');
    window.location.href ="/mypage"
  }

  _handleEdit = () => {
    this.props.history.push(`/writepost/${this.props.postId}`);
  }

  _userImagecontrollor =()=>{
    console.log("userImage는?",this.state.userImage)
      if(this.state.userImage!==null && this.state.userImage.length>0){
      return  <img src={`https://${server_url}/upload/${this.state.userImage}`} className='img-circle' alt={"user?"} />
      } else {
      return  <img src= {profileimage} className='img-circle' alt={"userImages"} />
      }  
    }
  
  render() {
    const {userImage, userName, isFollowing} = this.state
    return (
      <div className='post_detail_right_1_postWriter'>
        <div className="user_thumbs">{this._userImagecontrollor()}</div>
        <h3 className='post_detail_username'>{userName}</h3>
        <div className="user_buttons">
        {(this.props.isMypost) //내 POST이면, 팔로우/팔로잉 을 보여주지 않고, post수정/삭제 를 보여줍니다.
        ? 
          <div>
            <Button inverted color='black' onClick={this._handleEdit}>수정</Button>
            <Button inverted color='grey' onClick={this._handleDelete}>삭제</Button>
          </div>
        : 
          <div>
            {(isFollowing)
            ? <button className="ui teal button" onClick={this._handleFollowing}>팔로우중입니다</button>
            : <button className="ui grey button" onClick={this._handleFollowing}>팔로우하기</button> 
            }
          </div>
        }
        </div>
      </div>
    )
  }
}
