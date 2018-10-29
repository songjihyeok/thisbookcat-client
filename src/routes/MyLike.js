import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import server_url from '../url.json';
import Nav1 from "../components/Nav1";
import LikeBookBoard from "../components/MyLike/LikeBookBoard";

import "../components/MyLike/CSS/MyLike.css";

class MyLike extends Component {

  state = {
    likePosts : [],
  };

  // componentDidMount() {
  //   this._getMyLikePost();
  // }

  
  _getMyLikePost = () => {
    axios.get(`http://${server_url}:3000/api/like/user`,{
        headers: {
          Authorization: `bearer ${window.localStorage.getItem('token')}`
        }
      })
       .then((res) => {
         console.log('MyLike.js 컴포 > _getMyLikePost 함수 > axios.get 요청 후 받는 res', res);
        this.setState({
          likePosts : res.data[0].posts
        })
       })
       .catch(err => console.log('_getPostData get 못받음. error', err))
  }

  componentWillMount() {
    this._getMyLikePost();
    // this._renderBooKCoverImage();
  }

  _renderBooKCoverImage = () => {
    // console.log(this.state.likePost)
    if(this.state.likePosts.length){
      this.state.likePosts.map((likePost) => {
      // console.log(likePost)
      return <LikeBookBoard likePost={likePost}/>
      })
    
      // if(url.author===this.state.author) {
      //   return <LikeBookBoard url={url.id} author={url.author} key={url.id}/>;
      // }
    }
    // return bookcover;
  };

  render() {
    if(!window.localStorage.getItem("token")){
      return <Redirect to="/login" />
    }else{
    return (
      <div className="MyLike">
        <Nav1 />

        {this.state.likePosts.length ? 
          this.state.likePosts.map((likePost, index) => <LikeBookBoard likePost={likePost} key={index}/>) :
          "Loading"}
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