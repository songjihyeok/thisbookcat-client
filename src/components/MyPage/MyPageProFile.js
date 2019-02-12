import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import axios from "axios";
import SettingModal from "./SettingModal";
import MyBookBoard from "./MyBookBoard";
import server_url from '../../url.json';
//import './CSS/MyPageProFile.css'
import defaultimage from '../../img/다운로드.png';
import { Redirect} from "react-router-dom";

class MyPageProFile extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      author:'',
      counter: 0,
      ProfileImage: defaultimage,
      myPosts: [],
      myProfile: [],
      per: 16,
      page: 1,
      totalPage:'',
      followed: 0,
      following: 0
    };
  }

  token = window.localStorage.getItem('token')

   async componentDidMount() {
     await this._getFollowingFollowed()
     await this._callmyPostAPI()
     await this._getMyProfile()
     await window.addEventListener('scroll', this._infiniteScroll, true)
  }

  _infiniteScroll = () => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      if (this.state.page !== this.state.totalPage) {
        this.setState({page: this.state.page + 1})
        this._callmyPostAPI()
      }
    }
  }

  _getMyProfile = () => {
    axios.get(`https://${server_url}/api/user`, {headers: {Authorization: `bearer ${this.token}`}})
    .then(response => {
      console.log( "이미지 있나?", response.data.profileImage)
      if(response.data.profileImage){
      this.setState({
        myProfile: response.data,
        ProfileImage: `https://${server_url}/upload/${response.data.profileImage}`
      })
      } else {
        this.setState({
          myProfile: response.data,
          ProfileImage: defaultimage
        })
      }
    })
  }
  
  _callmyPostAPI = () => {
    axios.get(`https://${server_url}/api/post/mypage/${this.state.per}/${this.state.page}`, {
      headers: {Authorization: `bearer ${this.token}`}
    })
    .then(response => {
      console.log("MyBook.js의 componentDidMount함수 안에서 axios.get 요청 후 받은 response.data___", response.data);
      const allofarray = []
      if(response.data.perArray){
      response.data.perArray.forEach((element)=>{
        if(element){
          allofarray.push(element)
        }
      })
     }
      console.log(allofarray);
      this.setState({
        totalPage: response.data.totalpage,
        myPosts: this.state.myPosts.concat(allofarray),
      });
    })
  }

  _getFollowingFollowed = () => {
    axios.get(`https://${server_url}/api/follow/followingFollowedIds`, {
      headers: {Authorization : `bearer ${this.token}`}
    })
    .then(response => {
      //  console.log("follow response----" ,response);
      //  console.log("response.data",response.data[1].length, "response.data2",response.data[3].length); 
      this.setState({
        following: response.data[1].length,
        followed: response.data[3].length
      });
    })
  }

  _renderPost = () => {
    const posts = this.state.myPosts.map(post => {
      if (post) {
        console.log("post는",post)
       
        return <MyBookBoard image={post.mainImage} title={post.title} key={post.id}
                            postid={post.id} likecount={post.likeCount} bookData={post.bookData}/>
      }
    });
    // console.log(this.state.myPosts)
    return posts
  };

  _getImageFromModal = image => {
    // console.log('_getImageFromModal 이 작동하고 있어요!!')
    if (image) {
      this._getMyProfile()
    }
  }

  _handleHide = () => {
    this.setState({show: false});
  };

  _handleShow = () => {
    this.setState({show: true})
  }
  _logout = e => {
    e.preventDefault();
    window.localStorage.removeItem('token');
    this.setState({isLogin: false})
  }

  render() {
    // console.log("MyPageProfile.js의 render함수 안에서 this.state.ProfileImage 찍어보는 중입니다. ___", this.state.ProfileImage);
    // console.log('myprofile', this.state.myProfile)
    // console.log('totalpage', this.state.totalPage)
    // console.log('myprofile', this.state.myPosts)
    // console.log(this.state.page)
    // console.log(this.state.totalPage)
    // console.log('this is profileImage', this.state.ProfileImage)
    if (!window.localStorage.getItem("token")) {
      return <Redirect to="/login" />
    } else {
      return (
        <div className="MyPageProFile">
        <div className='profileContainer'>
          <div className='myName'>
            <span className='myNameText'><Icon name="user circle" size="big"/>내 프로필</span>
          </div>
          <div className="myProFileWrap">
            <dl className="ProFilePhotoContainer">
              <dt>
                <img className="ProfilePhoto" src={this.state.ProfileImage} alt=""/>
              </dt>
              <dd>
                <span className="ID_user">{this.state.myProfile.userName}</span>
                <div className="button_area">
                  <button className="custom-icon" onClick={this._handleShow}>관리</button>
                  <button className="custom-icon" onClick={this._logout}>로그아웃</button>
                </div>
              </dd>
            </dl>
            <ul className="ProFileDetailContainer">
              <li className='MyPostNumberContainer'>
                <span className='InfoName'>게시물</span>
                <b>{this.state.myPosts.length}</b>
              </li>
              <li className='FollowingContainer'>
                <span className='InfoName'>팔로잉</span>
                <b>{this.state.following}</b>
              </li>
              <li className='FollowerContainer'>
                <span className="InfoName">팔로워</span>
                <b>{this.state.followed}</b>
              </li>
            </ul>
          </div>
        </div>
          <SettingModal show={this.state.show} hide={this._handleHide} callback={this._getImageFromModal}/>
          <div className='myBookBoardContainer'>
            <div className='myBookShelf'>
              <span className='myBookShelfText'>
                <Icon name='book' size="big"/>내 서재
              </span>
            </div>
            <div className="bookBoardWrap">
            {(this.state.myPosts[0] === undefined) ? <div className="dataNone">아직 올린 게시물이 없습니다!</div> : this._renderPost()}<br/>
            {(this.state.page === this.state.totalPage) ? <div className="dataNone" /* style={{'textAlign':'center'}} */>'더이상 콘텐츠가 없습니다!'</div> : ''}
            </div>
          </div>
        </div>
      )
    }
  }
}

export default MyPageProFile;
