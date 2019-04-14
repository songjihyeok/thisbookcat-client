import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import server_url from '../url.json';
import Nav1 from "../components/Nav1";
import BookBoard from "../components/Main/BookBoard";
import "../default.css";
import  WaitingLoader from '../components/Spinner'


class Main extends Component {
  
  state = {
    per: 16,//한페이지당 가지게될 포스트의 개수
    page: 0,//정해진 per만큼의 포스트를 가지는 페이지
    totalPage: '',
    show : false,
    loaded : false,
    userName: '',
    scrollY:0,
    coverurl: [],
    refreshPost: []
  };

  async componentDidMount () {
  
    await this._getUrls();
    await this.getScrollY();
   // await this.refreshLIke();
    window.addEventListener('scroll', this._infiniteScroll, false)
  }

  componentWillUnmount(){
    
    let previousInfo = {"scrollY": window.scrollY , "coverurl": this.state.coverurl, "page": this.state.page, "totalPage":this.state.totalPage }
    let stringifiedInfo = JSON.stringify(previousInfo)
    window.localStorage.setItem("previousInfo", stringifiedInfo);
    window.scrollTo(0,0)
    window.removeEventListener('scroll', this._infiniteScroll,false)
  }

  _infiniteScroll = async() => {
    if (window.innerHeight + window.scrollY >= (document.body.offsetHeight-500) && this.state.loaded) {
      if (this.state.page>1) {
       this.setState({page: this.state.page-1,loaded: false})
       this._getUrls()
      }
    } 
  }
  
  // refreshLIke=async(refreshPost)=>{

    // if(refreshPost.length>0){
  //     let postArray=[];
  //     for(let element of refreshPost){
  //       postArray.push(element.id)
  //     }

  //     let token = window.localStorage.getItem('token')
  //     let resultOfRefresh = await axios.post(`https://${server_url}/api/like/getRefresh/refresh`,{ "postArray": postArray},{
  //       headers:{Authorization: `bearer ${token}`}})
  //     console.log("결과물은?",resultOfRefresh)

      
  //   }
  //   return refreshPost
  // }

  getScrollY=async()=>{
    await window.scrollTo(0,this.state.scrollY)
  }

  _renderBooKCoverImage =() => {

    if (this.state.coverurl.length>0) {
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
    if(this.state.loaded){
      return <div className="dataNone">컨텐츠가 없습니다. 취향을 재설정해주세요</div>
    }
    return <WaitingLoader/>    
  };


  _getUrls = async () => {

    let previousInfo =  window.localStorage.getItem("previousInfo");
    window.localStorage.removeItem("previousInfo");
    let parsedInfo = JSON.parse(previousInfo);
      if(previousInfo){
       
        let pageNumber =parsedInfo.page
     
 
        if(parsedInfo.page>=2){
          pageNumber = parsedInfo.page-1
        } 
        console.log(parsedInfo)

       await this.setState({coverurl:this.state.coverurl.concat(parsedInfo.coverurl), 
                      page: pageNumber, 
                      scrollY: parsedInfo.scrollY, 
                    })   
        if(parsedInfo.page===1){
          return 
        }
      }
    
    let coverurl = await this._callBookCoverAPI();
    this.setState({coverurl:  this.state.coverurl.concat(coverurl)})
    
    if(coverurl.length<12 && this.state.page>=2){
      this.setState({page:this.state.page-1})
      let secondcoverurl = await this._callBookCoverAPI();
      this.setState({coverurl: this.state.coverurl.concat(secondcoverurl)})
    }
  }

  _callBookCoverAPI = async() => {
      let token = window.localStorage.getItem('token')
      let resultOfPost= await axios.get(`https://${server_url}/api/userTagpost/${this.state.per}/${this.state.page}`,{
      headers:{Authorization: `bearer ${token}`}})
      if(this.state.page===0){
        this.setState({page: resultOfPost.data.totalpage})
      }
      this.setState({totalPage: resultOfPost.data.totalpage, loaded: true})
      let result = resultOfPost.data.perArray || []
      
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
