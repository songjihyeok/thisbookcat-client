import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import axios from "axios";
import SettingModal from "./SettingModal";
import MyBookBoard from "./MyBookBoard";
import server_url from '../../url.json';
import './CSS/MyPageProFile.css'

class MyPageProFile extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      author:'',
      counter: 0,
      ProfileImage: "http://profilepicturesdp.com/wp-content/uploads/2018/06/default-profile-picture-png-12.png",
      myPosts: [],
      myProfile: [],
      per: 8,
      page: 1,
      totalPage:'',
      followed: 0,
      following: 0
    };
  }

  token = window.localStorage.getItem('token')

   componentDidMount() {
     this._getFollowingFollowed()
     this._callmyPostAPI()
     this._getMyProfile()
     window.addEventListener('scroll', this._infiniteScroll, true)
  }

  _infiniteScroll = () => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight === scrollHeight) {
      if (this.state.page !== this.state.totalPage) {
        this.setState({page: this.state.page + 1})
        this._callmyPostAPI()
      }
    }
  }

  _getMyProfile = () => {
    axios.get(`http://${server_url}:3000/api/user`, {headers: {Authorization: `bearer ${this.token}`}})
    .then(response => {
      // console.log('this is myprofileresponse',response)
      this.setState({
        myProfile: response.data,
        ProfileImage: `http://${server_url}:3000/upload/${response.data.profileImage}`,
      })
    })
  }
  
  _callmyPostAPI = () => {
    axios.get(`http://${server_url}:3000/api/post/mypage/${this.state.per}/${this.state.page}`, {
      headers: {Authorization: `bearer ${this.token}`}
    })
    .then(response => {
      // console.log("MyBook.js의 componentDidMount함수 안에서 axios.get 요청 후 받은 response.data___", response.data);
      this.setState({
        totalPage: response.data.totalpage,
        myPosts: this.state.myPosts.concat(response.data.perArray),
      });
    })
  }

  _getFollowingFollowed = () => {
    axios.get(`http://${server_url}:3000/api/follow/followingFollowedIds`, {
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
        return <MyBookBoard image={post.mainImage} title={post.title} key={post.id}
                            postid={post.id} likecount={post.likeCount} />
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

  render() {
    // console.log("MyPageProfile.js의 render함수 안에서 this.state.ProfileImage 찍어보는 중입니다. ___", this.state.ProfileImage);
    // console.log('myprofile', this.state.myProfile)
    // console.log('totalpage', this.state.totalPage)
    // console.log('myprofile', this.state.myPosts)
    // console.log(this.state.page)
    // console.log(this.state.totalPage)
    // console.log('this is profileImage', this.state.ProfileImage)
    return (
      <div className="MyPageProFile">
      <div className='profileContainer'>
      <div className='myName'>
      <span className='myNameText'><Icon name="user circle" size="big"/>내 프로필</span>
      </div><br/>
      <div className="ProFilePhotoContainer">
          <img className="ProfilePhoto" src={this.state.ProfileImage} alt=""/>
          <span className="ID_user">{this.state.myProfile.userName}</span>
          <button className="custom-icon" onClick={this._handleShow}>관리</button>
        </div>
        <div className="ProFileDetailContainer">
        <div className='MyPostNumberContainer'>
        <span className='PostNumberText'>게시물</span><br/>
        <span className='PostNumber'>10</span>
        </div>
        <div className='FollowingContainer'>
        <span className='FollowingText'>팔로잉</span><br/>
        <span className='FollowingNumber'>{this.state.following}</span>
        </div>
        <div className='FollowerContainer'>
          <span className="FollowerText">팔로워</span><br/>
          <span className='FollowerNumber'>{this.state.followed}</span>
          </div>
        </div>
      </div>
        <SettingModal show={this.state.show} hide={this._handleHide} callback={this._getImageFromModal}/>
        <div className='myBookBoardContainer'>
        <div className='myBookShelf'>
        <span className='myBookShelfText'>
        <Icon name='book' size="big"/>
        내 서재
        </span>
        </div>
          {(this.state.myPosts[0] === undefined) ? <span>아직 올린 게시물이 없습니다!</span> : this._renderPost()}<br/>
          {(this.state.page === this.state.totalPage) ? <span /* style={{'textAlign':'center'}} */>'더이상 콘텐츠가 없습니다!'</span> : ''}
        </div>
      </div>
    )
  }
}

export default MyPageProFile;
