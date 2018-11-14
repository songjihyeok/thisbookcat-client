import React, { Component } from 'react'
import axios from 'axios';
import server_url from '../../url.json';
import "./PostDetail.css";

export default class PostWriter extends Component {
  state = {
    userName: '',
    userImage: '',
    isFollowing:'',
  }

  authHeader = {headers:{Authorization: `bearer ${window.localStorage.getItem('token')}`}}

  async componentWillMount(){
    await this._getUserData()
    await this._getFollowingData()
  }

  _getUserData = async() => {
    const res_getUser = await axios.get(`http://${server_url}:3000/api/post/postedUserName/${this.props.postId}`, this.authHeader)
    // console.log('_getUserData에서 res_getUser =========',res_getUser)
    this.setState({
      userName: res_getUser.data.userName,
      userImage: `http://${server_url}:3000/upload/${res_getUser.data.profileImage}`,
      //TODO: profileImage 를 등록하지 않았을때, 디폴트값을 넣어줘야 할듯?
      userId: res_getUser.data.id
    })
  }

  _getFollowingData = async() => {
    const res_getFollowing = await axios.get(`http://${server_url}:3000/api/follow/check/${this.props.userId}`, this.authHeader)
    // console.log('_getFollowingData 함수에서 axios.get 받아온 res_getFollowing.data 찍는중... this should be ture or false', res_getFollowing.data)
    this.setState({
      isFollowing: res_getFollowing.data
    })
  }

  _handleFollowing = async() => {
    // let token = window.localStorage.getItem('token')
    if(this.state.isFollowing){
      // const res_deleteFollowing = 
      await axios.delete(`http://${server_url}:3000/api/follow/delete/${this.props.userId}`, this.authHeader)
      // console.log('postDetail.js의 _handleFollowing 함수에서 팔로우 off(삭제)요청 보낸 후 res_deleteFollowing', res_deleteFollowing)
      this.setState({isFollowing: false})
    }else{
      // const res_postFollowing = 
      await axios.post(`http://${server_url}:3000/api/follow/${this.props.userId}`, {}, this.authHeader)
      // console.log('postDetail.js의 _handleFollowing 함수에서 팔로우 on(포스트)요청 보낸 후 res_postFollowing', res_postFollowing)
      this.setState({isFollowing: true})
    }
  }


  render() {
    const {userImage, userName, isFollowing} = this.state
    return (
      <div className='post_detail_right_1'>
        <img src={userImage} className='img-circle' alt={"hello"} />
          {isFollowing ?
              <h5 className='post_detail_following' onClick={this._handleFollowing}>팔로잉</h5> :
              <h5 className='post_detail_follow' onClick={this._handleFollowing}>팔로우</h5>}
          <h3 className='post_detail_username'>{userName}</h3>
      </div>
    )
  }
}
