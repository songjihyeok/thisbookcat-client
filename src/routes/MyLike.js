import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import server_url from '../url.json';
import Nav1 from "../components/Nav1";
import LikeBookBoard from "../components/MyLike/LikeBookBoard";

import "../components/MyLike/CSS/MyLike.css";

class MyLike extends Component {

  state = {

    per: 1,
    page: 1,
    totalPage: ''

  };

  componentDidMount() {
    this._setMyLikePost()
  }

  
  _getMyLikePost = () => {

    return axios.get(`http://${server_url}:3000/api/like/user/${this.state.per}/${this.state.page}`,{
        headers: {
          Authorization: `bearer ${window.localStorage.getItem('token')}`
        }
      })
       .then(res => res.data.perArray)
       .catch(err => console.log('_getPostData get 못받음. error', err))
  }

  _setMyLikePost = async () => {
    const likePosts = await this._getMyLikePost()

    console.log(likePosts)

    this.setState({
      likePosts
    })
  }

  _renderMyLikePost = () => {
    console.log(this.state.likePosts)
    if(this.state.likPosts===undefined) {
      return "아직 좋아요하신 포스트가 없습니다."
    }
    if(this.state.likePosts){
      const mylike = 
      this.state.likePosts.map((likePost) => {
      return <LikeBookBoard likePost={likePost} key={likePost.id}/>
      })
      return mylike
    }
    return "Loading"
  };

  render() {
    if(!window.localStorage.getItem("token")){
      return <Redirect to="/login" />
    }else{
    return (
      <div className="MyLike">
        <Nav1 />
        {this._renderMyLikePost()}
      </div>
    );
  }}
}

export default MyLike;




  // _getUrls = async () => {
  //   const imageUrl = await this._callBookCoverAPI();
  //   console.log(imageUrl);
  //   this.setState({
  //     imageUrl
  //   });
  // };

  // _callBookCoverAPI = () => {
  //   const booklistAPI = "https://picsum.photos/list";
  //   return axios.get(booklistAPI).then(response => response.data);
  // };