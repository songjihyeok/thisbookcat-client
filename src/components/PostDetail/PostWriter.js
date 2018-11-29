import React, { Component } from 'react';
import { Button, button } from "semantic-ui-react";
import axios from 'axios';
import server_url from '../../url.json';
import "./PostDetail.css";

export default class PostWriter extends Component {
  state = {
    userName: '',
    userImage: '',
    isFollowing:false,
  }

  authHeader = {headers:{Authorization: `bearer ${window.localStorage.getItem('token')}`}}

  async componentWillMount(){
    await this._getUserData()
    await this._getFollowingData()
  }

  _getUserData = async () => {
    const res_getUser = await axios.get(`http://${server_url}:3000/api/post/postedUserName/${this.props.postId}`, this.authHeader)
    // console.log('_getUserData에서 res_getUser =========',res_getUser)
    this.setState({
      userName: res_getUser.data.userName,
      userImage: `http://${server_url}:3000/upload/${res_getUser.data.profileImage}`,
      //TODO: profileImage 를 등록하지 않았을때, 디폴트값을 넣어줘야 할듯?
      userId: res_getUser.data.id
    })
  }

  _getFollowingData = async () => {
    const res_getFollowing = await axios.get(`http://${server_url}:3000/api/follow/check/${this.props.userId}`, this.authHeader)
    // console.log('_getFollowingData 함수에서 axios.get 받아온 res_getFollowing.data 찍는중... this should be ture or false', res_getFollowing.data)
    this.setState({isFollowing: res_getFollowing.data})
  }

  _handleFollowing = async () => {
    if (this.state.isFollowing) {

      const resultfollowDelete =await axios.delete(`http://${server_url}:3000/api/follow/delete/${this.props.userId}`, this.authHeader)
      console.log ("resultfollowDelete",resultfollowDelete)
      this.setState({isFollowing: false})
    } else {
      
      const followResult =await axios.post(`http://${server_url}:3000/api/follow/${this.props.userId}`, {}, this.authHeader)
      console.log("followResult", followResult)
      this.setState({isFollowing: true})
    }
  }

  _handleDelete = async () => {
    const res_deletePost = await axios.delete(`http://${server_url}:3000/api/post/${this.props.postId}`, this.authHeader)
    console.log(res_deletePost.data,'삭제되었습니다. res_deletePost.data');
    //사진도 삭제해야...
    this.props.history.goBack();
  }

  _handleEdit = () => {
    this.props.history.push(`/writepost/${this.props.postId}`);
  }

  render() {
    const {userImage, userName, isFollowing} = this.state
    return (
      <div className='post_detail_right_1_postWriter'>
        <img src={userImage} className='img-circle' alt={"hello"} />
        <h3 className='post_detail_username'>{userName}</h3>
        {(this.props.isMypost) //내 POST이면, 팔로우/팔로잉 을 보여주지 않고, post수정/삭제 를 보여줍니다.
        ? 
          <div>
            <Button inverted color='blue' onClick={this._handleEdit}>이 POST 수정</Button>
            <Button inverted color='red' onClick={this._handleDelete}>이 POST 삭제</Button>
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
    )
  }
}
