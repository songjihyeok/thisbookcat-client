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
    per: 8,
    totalPage:'',
    followPost:[],
    getData: false,
    loaded: false
  };

  token = window.localStorage.getItem('token')


  componentDidMount() {
    this._callFollowAPI();
    window.addEventListener('scroll', this._infiniteScroll,false)
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this._infiniteScroll,false)
  }

  _infiniteScroll = () => {
    console.log(window.innerHeight, " ", window.scrollY, ' ', document.body.offsetHeight)
    if (window.innerHeight + window.scrollY >= (document.body.offsetHeight-600)&&this.state.loaded) {
      if (this.state.page !== this.state.totalPage) {
         this.setState({page: this.state.page+1, loaded:false})
         this._callFollowAPI();
      }
    }
  }

  _renderFollowingPost = () => {
    // console.log('this is following post',this.state.followPost)
    if (this.state.followPost) {
      const follow = this.state.followPost.map((url, index) => {
        if (url) {
          return <FollowingBoard image={url.mainImage} key={index} title={url.title} bookData={url.bookData}
                                likecount={url.likeCount} contents={url.contents} postid={url.id} writerName={url.writerName}
                                createdTime={url.createdTime} likeOrNot={url.likeOrNot} profileImage={url.imageName}
                                writerId ={url.writerId}
                                />
        }else {
          return <div className="dataNone">팔로우하신 유저가 없거나 팔로잉 유저의 컨텐츠가 없습니다.!</div>
        }
      })
      return follow
    }
    return "Loading"
  };

  _callFollowAPI = () => {
    let token = window.localStorage.getItem('token')
    return axios.get(`https://${server_url}/api/follow/posts/${this.state.per}/${this.state.page}`, {
                      headers:{Authorization: `bearer ${token}`}})
    .then(response => {
      let result = response.data.perArra

      this.setState({totalPage: response.data.totalpage, 
                      loaded: true,
                      getData:true,
                      followPost: this.state.followPost.concat(result)
                      })
      return result;
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
              {this._renderFollowingPost()}
            </div>
          </div>
        </Fragment>
      );
    }
  }  
}

export default Followings;

