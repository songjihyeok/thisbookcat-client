import React, { Component, Fragment } from "react";
import FollowingBoard from "../components/Followings/FollowingBoard";
import Nav1 from "../components/Nav1";
import axios from 'axios';
import server_url from '../url.json';
import { Redirect } from "react-router-dom";

//import "../components/Followings/CSS/Followings.css"

class Followings extends Component {

  state = {
    page: 1,
    per: 3,
    totalPage:'',
    followPost:[],
    getData: false,
    loaded: false
  };

  componentDidMount() {
    this._getFollowPosts()
    window.addEventListener('scroll', this._infiniteScroll,false)
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this._infiniteScroll,false)
  }

  _infiniteScroll = () => {
    
    if (window.innerHeight + window.scrollY >= (document.body.offsetHeight-500)&&this.state.loaded) {
      if (this.state.page !== this.state.totalPage) {
         this.setState({page: this.state.page+1, loaded:false})
         this._getFollowPosts()
      }
    }
  }


  _renderFollowingPost = () => {
    // console.log('this is following post',this.state.followPost)
    if (this.state.followPost) {
      const follow = this.state.followPost.map((url, index) => {
        if (url) {
          return <FollowingBoard image={url.mainImage} key={index} title={url.title} bookData={url.bookData}
                                likecount={url.likeCount} contents={url.contents} postid={url.id} />
        }else {
          return null;
        }
      })
      return follow
    }
    return "Loading"
  };

  _getFollowPosts = async () => {
    const followPost = await this._callFollowAPI()
    if(followPost){
      this.setState({followPost: this.state.followPost.concat(followPost)})
    }
  };

  _callFollowAPI = () => {
    let token = window.localStorage.getItem('token')
    return axios.get(`https://${server_url}/api/follow/posts/${this.state.per}/${this.state.page}`, {
                      headers:{Authorization: `bearer ${token}`}})
    .then(response => {
      this.setState({totalPage: response.data.totalpage, getData:true, loaded:true})
      console.log(response.data)
      return response.data.perArray
    })
  };

  render() {
    let { followPost, getData } = this.state;
    if (!window.localStorage.getItem("token")) {
      return <Redirect to="/login" />
    } else if(!getData){
      return <div>loading</div>
    } else {
      return (
        <Fragment>
          <Nav1/>
          <div className="Followings">
            <div className='FollowingBoards'>
            {followPost.length===0? <div className="dataNone">팔로우하신 유저가 없습니다!</div> : this._renderFollowingPost()}
            </div>
          </div>
        </Fragment>
      );
    }
  }  
}

export default Followings;

