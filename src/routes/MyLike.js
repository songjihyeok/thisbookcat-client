import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import server_url from '../url.json';
import Nav1 from "../components/Nav1";
import LikeBookBoard from "../components/MyLike/LikeBookBoard";

//import "../components/MyLike/CSS/MyLike.css";

class MyLike extends Component {

  state = {
    per: 16,
    page: 0,
    totalPage: '',
    loading: false,
    likePost: [],
    scrollY:0
  };

  async componentDidMount() {
    await this._setMyLikePost();
    await this. getScrollY();
    window.addEventListener('scroll', this._infiniteScroll,false)
  }

  componentWillUnmount(){
    // let previousInfo = {"scrollY": window.scrollY , "likePost": this.state.likePost, "page": this.state.page, "totalPage":this.state.totalPage }
    // let stringifiedInfo = JSON.stringify(previousInfo)
    // window.localStorage.setItem("previouslikeData", stringifiedInfo);

    window.removeEventListener('scroll', this._infiniteScroll,false)
  }

  _infiniteScroll = async() => {
    
    if (window.innerHeight + window.scrollY >= (document.body.offsetHeight-500)&&this.state.loading) {
      if (this.state.page>1) {
       await this.setState({page: this.state.page-1 , loading:false})
       await this._setMyLikePost()
      }
    }
  }

  getScrollY=()=>{
    window.scrollTo(0,this.state.scrollY)
  }

  _getMyLikePost = async() => {
    let resultOflikeData=await axios.get(`https://${server_url}/api/like/user/${this.state.per}/${this.state.page}`,{
        headers: {Authorization: `bearer ${window.localStorage.getItem('token')}`}
      })
      if(this.state.page===0){
        this.setState({page: resultOflikeData.data.totalpage})
      }

      console.log("totalpage",resultOflikeData.data)
      this.setState({totalPage: resultOflikeData.data.totalpage, loading:true})
      return resultOflikeData.data.perArray || []
  }

  _setMyLikePost = async () => {
    // let previousInfo = window.localStorage.getItem("previouslikeData");
  
   
    // if(previousInfo){
    //   window.localStorage.removeItem("previouslikeData");
    //   let parsedInfo = JSON.parse(previousInfo);
    //   let pageNumber = parsedInfo.page
    //   if(parsedInfo.page>=2){
    //     pageNumber-=1
    //   }

    //   this.setState({likePost:this.state.likePost.concat(parsedInfo.likePost), 
    //                 page: pageNumber, 
    //                 scrollY: parsedInfo.scrollY ,
    //                 totalPage:parsedInfo.totalPage
    //               })
      
    //   if(parsedInfo.page == 1){
    //     return;
    //   }
    // }

      const likePosts = await this._getMyLikePost()
      this.setState({likePost: this.state.likePost.concat(likePosts)})
      
      console.log(likePosts, this.state.page)
      if(likePosts.length<12 && this.state.page>=2){
        this.setState({page:this.state.page-1})
        let secondlikePosts = await this._getMyLikePost()
        this.setState({likePost: this.state.likePost.concat(secondlikePosts)})
      } 


  }

  _renderMyLikePost = () => {
      if(this.state.likePost){
        const result = this.state.likePost.map((likePost) => {
          if (likePost) {
          return <LikeBookBoard likePost={likePost} key={likePost.id} postid={likePost.id} bookData={likePost.bookData}/>
          } else {
              return null;
          }
        })
      return result;
      }
    return "Loading"
  };

  render() {
    if (!window.localStorage.getItem("token")) {
      return <Redirect to="/login" />
    } else {
      return (
        <div className="MyLike">
          <Nav1 />
          <div className="bookBoardWrap">
            {this.state.likePost.length ===0 ? <div className="dataNone">'아직 좋아요하신 포스트가 없습니다'</div> : this._renderMyLikePost()}
          </div>
        </div>
      );
  }}
}

export default MyLike;


