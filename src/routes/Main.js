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
import { string } from "prop-types";

class Main extends Component {
  
  state = {
    per: 16,//한페이지당 가지게될 포스트의 개수
    page: 0,//정해진 per만큼의 포스트를 가지는 페이지
    totalPage: '',
    show : false,
    loaded : false,
    userName: '',
    scrollY:0,
    coverurl: []
  };

  async componentDidMount () {
    await this._getUrls();
    this.getScrollY();
    window.addEventListener('scroll', this._infiniteScroll, false)
  }

  componentWillUnmount(){
    let previousInfo = {"scrollY": window.scrollY , "coverurl": this.state.coverurl, "page": this.state.page, "totalPage":this.state.totalPage }
    let stringifiedInfo = JSON.stringify(previousInfo)
    window.localStorage.setItem("previousInfo", stringifiedInfo);

    window.removeEventListener('scroll', this._infiniteScroll,false)
  }

  _infiniteScroll = async() => {

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && this.state.loaded) {
      if (this.state.page>1) {
       this.setState({page: this.state.page-1,loaded: false})
       this._getUrls()
      }
    } 
  }
  

  getScrollY=()=>{
    window.scrollTo(0,this.state.scrollY)
  }

  _renderBooKCoverImage =() => {
    
    if (this.state.coverurl) {
      const bookcover = this.state.coverurl.map((url) => {
        if (url) {  
          return <BookBoard url={url.mainImage}
                            postid={url.id}
                            title={url.title}
                            likecount={url.likeCount}
                            key={url.id}
                            bookData= {url.bookData}
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
    let pageNumber=0;
    let previousInfo = window.localStorage.getItem("previousInfo");
      if(previousInfo){
        let parsedInfo = JSON.parse(previousInfo);
        console.log("parsedInfo",parsedInfo)
        
        window.localStorage.removeItem("previousInfo");
        pageNumber = parsedInfo.page

        console.log("가지고 있는 내용이?",parsedInfo.coverurl)
        this.setState({coverurl:this.state.coverurl.concat(parsedInfo.coverurl), 
                      page: pageNumber, 
                      scrollY: parsedInfo.scrollY 
                    })
                    
        if(parsedInfo.page === 1){
        return;
      }
    }
    console.log("page----------",this.state.page)
    let coverurl = await this._callBookCoverAPI();
    this.setState({coverurl: this.state.coverurl.concat(coverurl)})

    if(coverurl.length<12){
      console.log("여기 오니?",this.state.page-1)
      this.setState({page:this.state.page-1})
      let secondcoverurl = await this._callBookCoverAPI();
      this.setState({coverurl: this.state.coverurl.concat(secondcoverurl)})
    }
  }

  _callBookCoverAPI = async() => {
      
      let token = window.localStorage.getItem('token')
      let resultOfPost= await axios.get(`https://${server_url}/api/userTagpost/${this.state.per}/${this.state.page}`,{
      headers:{Authorization: `bearer ${token}`}})
      console.log("들어오는 내용?",resultOfPost)
      if(this.state.page===0){
        this.setState({page: resultOfPost.data.totalpage})
      }
      this.setState({totalPage: resultOfPost.data.totalpage, loaded: true})
      let result = resultOfPost.data.perArray || null
      
      return result;
  };

 
  
  _handleHide = () => {
    this.setState({show: false});
  };
  _handleShow = () => {
    this.setState({show: true})
  }

  render() {
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
        </div>
      )
    }
  }
}
export default Main;