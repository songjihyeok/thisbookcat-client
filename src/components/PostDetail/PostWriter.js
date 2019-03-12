import React, { Component } from 'react';
import { Button} from "semantic-ui-react";
import axios from 'axios';
import server_url from '../../url.json';
import profileimage from "../../img/다운로드.png"
import { PropTypes} from 'prop-types';
import { Link} from "react-router-dom";

export default class PostWriter extends Component {

  state = {
    userId: '',
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
    const res_getUser = await axios.get(`https://${server_url}/api/post/postedUserName/${this.props.postId}`, this.authHeader)
    console.log('res_getUser',res_getUser)
    let userName = null
    let profileImage =null
    if(res_getUser.data[1]){
      userName= res_getUser.data[1].userName
      profileImage= res_getUser.data[1].profileImage
    }
    let userId= res_getUser.data[0]

    this.setState({
      userName: userName,
      userImage: profileImage,
      userId: userId
    })
  }

  _getFollowingData = async () => {
    const res_getFollowing = await axios.get(`https://${server_url}/api/follow/check/${this.props.userId}`, this.authHeader)
    // console.log('_getFollowingData 함수에서 axios.get 받아온 res_getFollowing.data 찍는중... this should be ture or false', res_getFollowing.data)
    this.setState({isFollowing: res_getFollowing.data})
  }

  _handleFollowing = async () => {

    if(this.props.userName === ''){
      alert("유저네임을 설정해주세요")
      return;
    }


    if (this.state.isFollowing) {

      const resultfollowDelete =await axios.delete(`https://${server_url}/api/follow/delete/${this.props.userId}`, this.authHeader)

      this.setState({isFollowing: false})
    } else {
      
      const followResult =await axios.post(`https://${server_url}/api/follow/${this.props.userId}`, {}, this.authHeader)

      this.setState({isFollowing: true})
    }
  }

  _handleDelete = async () => {
    const res_deletePost = await axios.delete(`https://${server_url}/api/post/${this.props.postId}`, this.authHeader)
    // console.log("props", this.props)
    // console.log(res_deletePost.data,'삭제되었습니다. res_deletePost.data');
    window.location.href ="/mypage"
  }

  _handleEdit = () => {
    this.props.history.push(`/writepost/${this.props.postId}`);
  }

  _userImagecontrollor =()=>{
      if(this.state.userImage){
      return <img src={`https://${server_url}/upload/${this.state.userImage}`} className='img-circle' alt={"user?"} />
      } else {
      return  <img src= {profileimage} className='img-circle' alt={"userImages"} />
      }  
    }
  
  render() {
    const {userName, isFollowing, userId} = this.state
    console.log("userId",userId)
    return (
      <div className='post_detail_right_1_postWriter'>
        <Link to={`/postWriter/${userId}`}>
          <div className="user_thumbs">{this._userImagecontrollor()}</div>
          <div className='post_detail_username'>{userName}</div>
        </Link>
        {(this.props.isMypost) //내 POST이면, 팔로우/팔로잉 을 보여주지 않고, post수정/삭제 를 보여줍니다.
        ? 
          <div className="user_buttons">
            <Button inverted color='black' onClick={this._handleEdit}>수정</Button>
            <Button inverted color='grey' onClick={this._handleDelete}>삭제</Button>
          </div>
        : 
          <div className="user_follow">
            {(isFollowing)
            ? <button className="ui teal button" onClick={this._handleFollowing}>팔로잉</button>
            : <button className="ui grey button" onClick={this._handleFollowing}>팔로우</button> 
            }
          </div>
        }
      </div>
    )
  }
}
