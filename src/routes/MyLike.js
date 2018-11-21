import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import server_url from '../url.json';
import Nav1 from "../components/Nav1";
import LikeBookBoard from "../components/MyLike/LikeBookBoard";

import "../components/MyLike/CSS/MyLike.css";

class MyLike extends Component {

  state = {

    per: 10,
    page: 1,
    totalPage: ''

  };

  componentDidMount() {
    this._setMyLikePost()
    window.addEventListener('scroll', this._infiniteScroll, true)
  }

  _infiniteScroll = () => {

    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

    let clientHeight = document.documentElement.clientHeight;

    if(scrollTop + clientHeight === scrollHeight) {

      if(this.state.page!==this.state.totalPage) {
        this.setState({
          page: this.state.page+1
        })
        this._setMyLikePost()
      }
    }
  }

  
  _getMyLikePost = () => {

    return axios.get(`http://${server_url}:3000/api/like/user/${this.state.per}/${this.state.page}`,{
        headers: {
          Authorization: `bearer ${window.localStorage.getItem('token')}`
        }
      })
       .then(res => {
         this.setState({
           totalPage: res.data.totalpage
         })
         return res.data.perArray
       })
       .catch(err => console.log('_getPostData get 못받음. error', err))
  }

  _setMyLikePost = async () => {
    const likePosts = await this._getMyLikePost()

    // console.log(likePosts)

    if(this.state.likePosts===undefined) {
      this.setState({
        likePosts
      })
    } else {
      this.setState({
        likePosts: this.state.likePosts.concat(likePosts)
      })
    }
  }

  _renderMyLikePost = () => {
      if(this.state.likePosts){
        const result = this.state.likePosts.map((likePost) => {
        if(likePost) {
          return <LikeBookBoard likePost={likePost} key={likePost.id} postid={likePost.id}/>
        }
      })
      return result;
      }
      return "Loading"
  };

  render() {
    // console.log(this.state.page)
    // console.log(this.state.totalPage)
    if(!window.localStorage.getItem("token")){
      return <Redirect to="/login" />
    }else{
    return (
      <div className="MyLike">
        <Nav1 />
        {this.state.likePosts===undefined?'아직 좋아요하신 포스트가 없습니다':this._renderMyLikePost()}<br/>
        {this.state.page===this.state.totalPage?<span>'더이상 콘텐츠가 없습니다!'</span>:''}
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