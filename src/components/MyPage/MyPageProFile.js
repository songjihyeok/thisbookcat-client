import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import axios from "axios";
import SettingModal from "./SettingModal";
import MyBookBoard from "./MyBookBoard";
import server_url from '../../url.json';
//import './CSS/MyPageProFile.css'
import defaultimage from '../../img/다운로드.png';
// import FollowingModal from './followingModal';
import FollowedModal from './followedModal';
import FollowingModal from './followingModal';
import  WaitingLoader from '../Spinner'
import reactTruncateHtml from "react-truncate-html";

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
      followData: '',
      gotData:false,
      likes: 0,
      userName: "",
      howManyPosts: 0,
      loaded: false, 
      followingModalShow:false,
      followedModalShow:false,
      followingList: '',
      followedList: '',
      scrollY:0
    };
  }
                    
  token = window.localStorage.getItem('token')

   async componentDidMount() {
     await this._getFollowingFollowed();
     await this._getPosts();
     await this._getMyProfile();
     await this.getUsingTags();
     await this.getScrollY();
     await window.addEventListener('scroll', this._infiniteScroll, false)
  }


  componentWillUnmount(){
    let previousInfo = {"scrollY": window.scrollY , "myPost": this.state.myPosts, "page": this.state.page, "totalPage":this.state.totalPage }
    let stringifiedInfo = JSON.stringify(previousInfo)
    window.localStorage.setItem("previousMypage", stringifiedInfo);

    window.removeEventListener('scroll', this._infiniteScroll,false)
  }

  _infiniteScroll = async() => {
    
    if (window.innerHeight + window.scrollY >= (document.body.offsetHeight-500)&&this.state.loaded) {
      if (this.state.page !== this.state.totalPage) {
       await this.setState({page: this.state.page+1, loading:false})
       await this._getPosts();
      }
    }
  }

  getScrollY=()=>{
    window.scrollTo(0,this.state.scrollY)
  }

  _getPosts=async()=>{
    let previousInfo =window.localStorage.getItem("previousMypage");
    window.localStorage.removeItem("previousMypage");
    
    let parsedInfo = JSON.parse(previousInfo);
  
    console.log("parsedInfo---------------", parsedInfo);
    let pageNumber = 0
    if(parsedInfo){
      pageNumber = parsedInfo.page
      this.setState({myPosts:this.state.myPosts.concat(parsedInfo.myPost), 
                    page: pageNumber, 
                    scrollY: parsedInfo.scrollY ,
                    totalPage:parsedInfo.totalPage,
                    gotData:reactTruncateHtml,
                    loaded:true
                  })
      console.log(this.state.myPosts)
      
      if(pageNumber === parsedInfo.totalPage){    
        return;
      }
    }

      let mypagePost= await this._callmyPostAPI();

      this.setState({myPosts: this.state.myPosts.concat(mypagePost)})
  }
  
  _callmyPostAPI = async() => {
    let resultOfMypage = await axios.get(`https://${server_url}/api/post/mypage/${this.state.per}/${this.state.page}`, {
      headers: {Authorization: `bearer ${this.token}`}
    })    
    this.setState({
        totalPage: resultOfMypage.data.totalpage,
        loaded: true,
        gotData: true
    });
    let result = resultOfMypage.data.perArray || null

    return result;
  }



  _renderPost = () => {
    if(this.state.myPosts.length>0){
    const posts = this.state.myPosts.map(post => {
      if (post) {
        return <MyBookBoard image={post.mainImage} title={post.title} key={post.id} userName ={this.state.userName}
                            postid={post.id} likecount={post.likeCount} bookData={post.bookData} likeCount={post.likeCount} 
                            isUserLike={post.isUserLike}/>
      }else {
        return null;
      }
    });
    return posts
    }
    if(this.state.loaded&&!this.state.myPosts.length){
      return <div className="dataNone">컨텐츠가 없습니다. 컨텐츠를 올려주세요</div>
    }
    return <WaitingLoader />    
  }



  render() {
    if (!window.localStorage.getItem("token")) {
      window.location.href= '/login';
    } else if (!this.state.gotData || !this.state.followData){
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
            <span className='myNameText'><Icon name="user circle" size="big"/>내 프로필</span>
          </div>
          <div className="myProFileWrap">
            <dl className="ProFilePhotoContainer">
              <dt>
                <img className="ProfilePhoto" src={this.state.profileImage} alt=""/>
              </dt>
              <dd>
                {this._handlingUserName()}
                <div className="button_area">
                  <button className="custom-icon" onClick={this._handleShow}>프로필 관리</button>
                  <button className="custom-icon" onClick={this._logout}>로그아웃</button>
                </div>
              </dd>
            </dl>
            <ul className="ProFileDetailContainer">
              <li>
                <span className='InfoName'>선택한 취향</span>
                <b>{this.state.likes}<button className="change_taste" onClick={()=>this.changeTaste()}>변경</button></b>
              </li>
              <li>
                <span className='InfoName'>게시물</span>
                <b>{this.state.howManyPosts}</b>
              </li>
                <li onClick={()=>this.followedModel()}>
                  <span className='InfoName'>팔로워</span>
                  <b>{this.state.followData[1].length}</b>
                  {/* <FollowingModal/> */}
                </li>
                <li onClick={()=>this.followingModal()}>
                  <span className="InfoName">팔로잉</span>
                  <b>{this.state.followData[3].length}</b>
                </li>
            </ul>
          </div>
        </div>
         {this._handleFollowModal()}
          <SettingModal beforeUserName={this.state.userName} beforeImage={this.state.profileImage} show={this.state.show} hide={this._handleHide} callback={this._getImageFromModal} setUserName={(e)=>{this.setUserName(e)}}/>
          <div className='myBookBoardContainer'>
            <div className='myBookShelf'>
              <span className='myBookShelfText'>
                <Icon name='book' size="big"/>내 서재
              </span>
            </div>
            <div className="bookBoardWrap" style={{'textAlign': this.state.myPosts.length>=3 ? 'left' : 'center'}}>
             {this._renderPost()}<br/>
            </div>
          </div>
        </div>
      )
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
  _logout = e => {
    e.preventDefault();
    window.localStorage.removeItem('token');
    this.setState({isLogin: false})
  }

  changeTaste =()=>{
    window.location.href="/picktaste";
  }

  _handlingUserName = ()=>{
    if(!this.state.userName){
      return null;
    }
    return <span className="ID_user">{this.state.userName}</span>
  }

  followingModal=()=>{
    this.setState({followingModalShow: true})
  }

  followedModel=()=>{
    this.setState({followedModalShow: true})
  }


  _handleFollowModalhide=()=>{
    this._getFollowingFollowed();
    this.setState({followedModalShow: false, followingModalShow:false})
  }

 _handleFollowModal=()=>{
   if(this.state.followingModalShow){
     return <FollowingModal show={this.state.followingModalShow} hide={this._handleFollowModalhide}/> 
   }
   if(this.state.followedModalShow){
     return <FollowedModal show={this.state.followedModalShow} hide={this._handleFollowModalhide}/>
   }
 }

  _getFollowingFollowed = () => {
    axios.get(`https://${server_url}/api/follow/followingFollowedIds`, {
      headers: {Authorization : `bearer ${this.token}`}
    })
    .then(response => {
  
      this.setState({
        followData: response.data
      });
    })
  }

  getUsingTags = async() =>{
    const token = window.localStorage.getItem('token')
	
		const selectedTags = await axios.get(`https://${server_url}/api/user/getpreference`, {
			headers: {Authorization: `bearer ${token}`}
		})
    let {usingPreference} = selectedTags.data
    this.setState({likes: usingPreference.length})
  }

  _getMyProfile = () => {
    axios.get(`https://${server_url}/api/user`, {headers: {Authorization: `bearer ${this.token}`}})
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

}

export default MyPageProFile;
