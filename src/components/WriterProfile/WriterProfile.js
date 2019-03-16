import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import axios from "axios";
import MyBookBoard from "./MyBookBoard";
import server_url from '../../url.json';
import defaultimage from '../../img/다운로드.png';

class MyPageProFile extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      author:'',
      counter: 0,
      profileImage: defaultimage,
      myPosts: [],
      per: 16,
      page: 1,
      totalPage:'',
      followed: 0,
      following: 0,
      gotData:false,
      likes: 0,
      userName: "",
      howManyPosts: 0,
      loaded: false 
    };
  }

  token = window.localStorage.getItem('token')

   async componentDidMount() {
     await this._getFollowingFollowed()
     await this._callmyPostAPI()
     await this._getMyProfile()
     await window.addEventListener('scroll', this._infiniteScroll, false)
  }


  componentWillUnmount(){
    window.removeEventListener('scroll', this._infiniteScroll,false)
  }

  _infiniteScroll = async() => {
    
    if (window.innerHeight + window.scrollY >= (document.body.offsetHeight-500)&&this.state.loaded) {
      if (this.state.page !== this.state.totalPage) {
       await this.setState({page: this.state.page+1, loading:false})
       await this._callmyPostAPI()
      }
    }
  }

  _getMyProfile = () => {
    axios.get(`https://${server_url}/api/follow/profile/${this.props.writerId}}`, {headers: {Authorization: `bearer ${this.token}`}})
    .then(response => {
      if(response.status===400){
        alert("잘못된 접근입니다.")
        return;
      }
      let profileImage = `https://${server_url}/upload/${response.data.profileImage}`
      if(!response.data.profileImage){
        profileImage= defaultimage
      } 
      this.setState({
        userName: response.data.userName,
        profileImage: profileImage, 
        gotData: true
      })
    })
  }
  
  _callmyPostAPI = () => {

    axios.get(`https://${server_url}/api/writer/post/${this.props.writerId}/${this.state.per}/${this.state.page}`, {
      headers: {Authorization: `bearer ${this.token}`}
    })
    .then(response => {
      console.log("내용이 확실한가?", response)
      let allofarray = []
      if(response.data.perArray===undefined){
        return;
      }
      if(response.data.perArray.length>0){
      response.data.perArray.forEach((element)=>{
        if(element){
          allofarray.push(element)
        }
      })
     }
      this.setState({
        totalPage: response.data.totalpage,
        myPosts: this.state.myPosts.concat(allofarray),
        howManyPosts : response.data.howManyPosts,
        loaded: true 
      });
    })
  }

  _getFollowingFollowed = () => {
    axios.get(`https://${server_url}/api/writer/follow/${this.props.writerId}`, {
      headers: {Authorization : `bearer ${this.token}`}
    })
    .then(response => {
      console.log("follow?",response)
      this.setState({
        followed: response.data[1].length,
        following: response.data[3].length
      });
    })
  }


  _renderPost = () => {
    if(this.state.myPosts.length>0){
    const posts = this.state.myPosts.map(post => {

      if (post) {
        return <MyBookBoard image={post.mainImage} title={post.title} key={post.id} userName ={this.state.userName}
                            postid={post.id} likecount={post.likeCount} bookData={post.bookData}/>
      }else {
        return null;
      }
    });
    return posts
    }
  }

  _getImageFromModal = image => {
    if (image) {
      this._getMyProfile()
    }
  }


  setUserName = (userName)=>{
    this.setState({userName : userName})
  }


  _handleHide = () => {
    this.setState({show: false});
  };

  _handleShow = () => {
    this.setState({show: true})
  }


  _handlingUserName = ()=>{
    if(!this.state.userName){
      return null;
    }
    return <span className="ID_user">{this.state.userName}</span>
  }

  render() {
    if (!window.localStorage.getItem("token")) {
      window.location.href= '/login';
    } else if (!this.state.gotData){
      return (
      <div>
        <div className="loading">loading <br/>
        <button className="custom-icon" onClick={this._logout}>로그아웃</button>
        </div>
      </div>  
      )
    }
    else {
      return (
        <div className="MyPageProFile">
        <div className='profileContainer'>
          <div className='myName'>
            <span className='myNameText'><Icon name="user circle" size="big"/>프로필</span>
          </div>
          <div className="myProFileWrap">
            <dl className="ProFilePhotoContainer">
              <dt>
                <img className="ProfilePhoto" src={this.state.profileImage} alt=""/>
              </dt>
              <dd>
                {this._handlingUserName()}
              </dd>
            </dl>
            <ul className="ProFileDetailContainer">
              <li>
                <span className='InfoName'>게시물</span>
                <b>{this.state.howManyPosts}</b>
              </li>
              <li>
                <span className='InfoName'>팔로잉</span>
                <b>{this.state.following}</b>
              </li>
              <li>
                <span className="InfoName">팔로워</span>
                <b>{this.state.followed}</b>
              </li>
            </ul>
          </div>
        </div>
          <div className='myBookBoardContainer'>
            <div className='myBookShelf'>
              <span className='myBookShelfText'>
                <Icon name='book' size="big"/>서재
              </span>
            </div>
            <div className="bookBoardWrap" style={{'textAlign': this.state.myPosts.length>=4 ? 'left' : 'center'}}>
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