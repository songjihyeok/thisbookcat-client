import React, { Component, Fragment } from "react";
import FollowingBoard from "../components/Followings/FollowingBoard";
import Nav1 from "../components/Nav1";
import axios from 'axios'
import server_url from '../url.json'

import "../components/Followings/CSS/Followings.css"

class Followings extends Component {

  state = {
    page: 1,
    per: 4,
    totalPage:''
  };

  componentDidMount() {
    this._getFollowPosts()
    /* window.addEventListener('scroll', this._infiniteScroll, true) */
  }

  _infiniteScroll = () => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

    let clientHeight = document.documentElement.clientHeight;
    
    if(scrollTop + clientHeight === scrollHeight) {
      this.setState({
        items:this.state.items+20
      })
    }
  }

  _renderFollowingPost = () => {
    console.log(this.state.followPost)
    if(this.state.followPost) {
      const follow = this.state.followPost.map((url, index) => {
          return <FollowingBoard image={url.mainImage} key={index} title={url.title} likecount={url.likecount} contents={url.contents} />;
      })
      return follow;
    }
    return "Loading"
  };

  _getFollowPosts = async () => {
    const followPost = await this._callFollowAPI();
    this.setState({
      followPost
    })
    console.log(this.state.followPost)
  };

  _callFollowAPI = () => {
    let token = window.localStorage.getItem('token')
    return axios.get(`http://${server_url}:3000/api/follow/posts/${this.state.per}/${this.state.page}`, {headers:{Authorization: `bearer ${token}`}})
    .then(response => response.data.perArray)
  };

  render() {
    return (
      <Fragment>
         <Nav1/>
         <div className="Followings">
         <div className = 'gridOne'></div>
         <div className = 'gridTwo'>
         {this._renderFollowingPost()}
         </div>
         <div className = 'gridThree'></div>
         </div>
      </Fragment>
     
    );
  }
}

export default Followings;

/* _infiniteScroll = () => {
  let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

  let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

  let clientHeight = document.documentElement.clientHeight;
  
  if(scrollTop + clientHeight === scrollHeight) {
    console.log(this.state.coverurl)
    if(!this.state.preCoverUrl) {
      this.setState({preCoverUrl:this.state.coverurl})
    } else if (this.state.preCoverUrl) {
      this.setState({preCoverUrl:this.state.preCoverUrl.concat(this.state.coverurl)})
      console.log(this.state.preCoverUrl)
    }
    this.setState({
      preItems: this.state.items,
      items: this.state.items+20,
    })
    console.log(this.state.preItems)
    console.log(this.state.items)
    console.log(this.state.coverurl)
  }
  this._getUrls()
} */

  /* _renderPreBooKCoverImage = () => {
    if(this.state.preCoverUrl) {
      const bookcover = this.state.preCoverUrl.map((url) => {
        return < url={url.id} author={url.author} key={url.id} />;
      });
      return bookcover;
    }
  }; */


