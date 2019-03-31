import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import server_url from '../url.json';
import Nav1 from "../components/Nav1";
import BookBoard from "../components/Main/BookBoard";
import "../default.css";
import  WaitingLoader from '../components/Spinner'
import LastLocation from '../components/PostDetail/lastLocation.js'
import ScrollMemory from 'react-router-scroll-memory'

class Main extends Component {
  
  state = {
    per: 16,//한페이지당 가지게될 포스트의 개수
    page: 1,//정해진 per만큼의 포스트를 가지는 페이지
    totalPage: '',
    show : false,
    loaded : false,
    userName: '',
    finalRender: false
  };

  async componentDidMount () {
    await this.getUserName();
    await this._getUrls();
    window.addEventListener('scroll', this._infiniteScroll, false)
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this._infiniteScroll,false)
  }

  _infiniteScroll = async() => {
    if (window.innerHeight + window.scrollY >= (document.body.offsetHeight-500) && this.state.loaded) {
      if (this.state.page !== this.state.totalPage) {
       this.setState({page: this.state.page+1,loaded: false})
       this._getUrls()
      }
    }
   
  }


  getScrollY=()=>{
    const theY = window.localStorage.getItem("scrollY");
    console.log("helloooo",theY)
    window.scrollTo(0,theY)
  }



  _renderBooKCoverImage = () => {
    
    if (this.state.coverurl) {
      const bookcover = this.state.coverurl.map((url) => {
        if (url) {  
          return <BookBoard url={url.mainImage}
                            postid={url.id}
                            title={url.title}
                            likecount={url.likeCount}
                            key={url.id}
                            bookData= {url.bookData}
                            userName={this.state.userName}
                            isUserLike = {url.isUserLike}
                            />;
        }else {
          return null;
        }
      });
      
      return bookcover
    }
    if(this.state.loaded&&!this.state.coverurl){
      return <div className="dataNone">컨텐츠가 없습니다. 취향을 재설정해주세요</div>
    }
    return <WaitingLoader/>    
  };

  _getUrls = async () => {
    const coverurl = await this._callBookCoverAPI();
    if (this.state.coverurl === undefined) {
     await this.setState({coverurl})
    } else {
     await this.setState({coverurl: this.state.coverurl.concat(coverurl)})
    }
  };

  _callBookCoverAPI = () => {
    let token = window.localStorage.getItem('token')

    return axios.get(`https://${server_url}/api/userTagpost/${this.state.per}/${this.state.page}`,{
      headers:{Authorization: `bearer ${token}`}})
    .then((response) => {
      console.log('there should be data here',response.data)
      this.setState({totalPage: response.data.totalpage, loaded: true})
      let result = response.data.perArray
      return result;
     })
     .catch(err => console.log(err))
  };

 
  async getUserName(){
    const token = window.localStorage.getItem('token')
    let resultOfget = await axios.get(`https://${server_url}/api/user`, {headers: {Authorization: `bearer ${token}`}})
    if(resultOfget.data.userName){
      this.setState({userName:resultOfget.data.userName})
    }
  }


  // getScrollY=(y)=>{
  //   this.setState({scrollY:y})
  // }
  
  _handleHide = () => {
    this.setState({show: false});
  };
  _handleShow = () => {
    this.setState({show: true})
  }

  render() {
    console.log("몇번 렌더링")
    if (!window.localStorage.getItem("token")) {
      return <Redirect to="/login" />
    } else {
      return (
        <div className="Main_ofmain">
          <Nav1/>
       
          {/* <div className='mostLikedPage'>
          {this._renderMostLikedPage()}
          </div> */}
          <div className="bookBoardWrap">
            {this._renderBooKCoverImage()}
          </div>       
          {this.getScrollY()}
          {/* <LastLocation scrollY={(y)=>this.getScrollY(y)}></LastLocation> */}
        </div>
      )
    }
  }
}
export default Main;