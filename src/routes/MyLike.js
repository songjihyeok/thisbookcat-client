import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import server_url from '../url.json';
import Nav1 from "../components/Nav1";
import LikeBookBoard from "../components/MyLike/LikeBookBoard";

//import "../components/MyLike/CSS/MyLike.css";

class MyLike extends Component {

  state = {
    per: 16,
    page: 1,
    totalPage: '',
    loading: false
  };

  componentDidMount() {
    this._setMyLikePost()
    window.addEventListener('scroll', this._infiniteScroll,false)
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this._infiniteScroll,false)
  }

  _infiniteScroll = async() => {
    
    if (window.innerHeight + window.scrollY >= (document.body.offsetHeight-500)&&this.state.loading) {
      if (this.state.page !== this.state.totalPage) {
       await this.setState({page: this.state.page+1 , loading:false})
       await this._setMyLikePost()
      }
    }
  }

  _getMyLikePost = () => {
    return axios.get(`https://${server_url}/api/like/user/${this.state.per}/${this.state.page}`,{
        headers: {Authorization: `bearer ${window.localStorage.getItem('token')}`}
      })
       .then(res => {
         console.log("totalpage",res.data)
         this.setState({totalPage: res.data.totalpage, loading: true})
         return res.data.perArray
       })
       .catch(err => console.log('_getPostData get 못받음. error', err))
  }

  _setMyLikePost = async () => {
    const likePosts = await this._getMyLikePost()
    // console.log(likePosts)
    if (this.state.likePosts === undefined) {
      this.setState({likePosts})
    } else {
      this.setState({likePosts: this.state.likePosts.concat(likePosts)})
    }
  }

  _renderMyLikePost = () => {
      if(this.state.likePosts){
        const result = this.state.likePosts.map((likePost) => {
          if (likePost) {
          return <LikeBookBoard likePost={likePost} key={likePost.id} postid={likePost.id} bookData={likePost.bookData}/>
          } else {
              return null;
          }
        })
      return result;
      }
    return "Loading"
  };

  render() {
    if (!window.localStorage.getItem("token")) {
      return <Redirect to="/login" />
    } else {
      return (
        <div className="MyLike">
          <Nav1 />
          <div className="bookBoardWrap">
            {this.state.likePosts === undefined ? <div className="dataNone">'아직 좋아요하신 포스트가 없습니다'</div> : this._renderMyLikePost()}
          </div>
        </div>
      );
  }}
}

export default MyLike;


