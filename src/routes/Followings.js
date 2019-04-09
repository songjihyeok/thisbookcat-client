import React, { Component, Fragment } from "react";
import FollowingBoard from "../components/Followings/FollowingBoard";
import Nav1 from "../components/Nav1";
import axios from 'axios';
import server_url from '../url.json';
import { Redirect } from "react-router-dom";
import Loading from '../components/Spinner'
//import "../components/Followings/CSS/Followings.css"

class Followings extends Component {

  state = {
    page: 0,
    per: 10,
    totalPage:'',
    followPost:[],
    getData: false,
    loaded: false,
    scrollY:0
  };

  async componentDidMount() {
    await this._getUrls();
    await this.getScrollY();
    window.addEventListener('scroll', this._infiniteScroll,false)
  }

  componentWillUnmount(){
    
    let previousInfo = {"scrollY": window.scrollY , "followPost": this.state.followPost, "page": this.state.page, "totalPage":this.state.totalPage }
    let stringifiedInfo = JSON.stringify(previousInfo)
    window.localStorage.setItem("previousFollow", stringifiedInfo);
    window.removeEventListener('scroll', this._infiniteScroll,false)
  }

  _infiniteScroll = () => {

    if (window.innerHeight + window.scrollY >= (document.body.offsetHeight-500)&&this.state.loaded) {

      if (this.state.page>1) {
         this.setState({page: this.state.page-1, loaded:false})
         console.log("써버 가져오즈아")
         this._getUrls();
      }
    }
  }

  _renderFollowingPost = () => {
    if (this.state.followPost.length>0) {
      let follow = this.state.followPost.map((url, index) => {
        if (url) {
          return <FollowingBoard image={url.mainImage} key={index} title={url.title} bookData={url.bookData}
                                likecount={url.likeCount} contents={url.contents} postid={url.id} writerName={url.writerName}
                                createdTime={url.createdTime} likeOrNot={url.likeOrNot} profileImage={url.imageName}
                                writerId ={url.writerId}
                                />
        }else {
          return null
        }
      })
      return follow
   
    }
    return <div className="dataNone">팔로우하신 유저가 없거나 팔로잉 유저의 컨텐츠가 없습니다.!</div>
  };

  getScrollY=()=>{
    console.log("실행이 안되니????",this.state.scrollY)
    window.scrollTo(0,this.state.scrollY)
  }

  _getUrls= async()=>{
    let previousInfo =window.localStorage.getItem("previousFollow");
    if(previousInfo){
       window.localStorage.removeItem("previousFollow");
      let parsedInfo = JSON.parse(previousInfo);
      let pageNumber= parsedInfo.page
      if(parsedInfo.page>=2){
        pageNumber-=1
      }
      console.log("scrollY", parsedInfo.scrollY)
      this.setState({page: pageNumber, 
                    scrollY: parsedInfo.scrollY,
                    getData:true,
                    followPost:this.state.followPost.concat(parsedInfo.followPost)})
      if(pageNumber==1){
        return;
      } 
    }
    console.log("page", this.state.page)
      let followPost= await this._callFollowAPI();
  }


  _callFollowAPI = async() => {

    let token = window.localStorage.getItem('token')

    let resultOfFollow = await axios.get(`https://${server_url}/api/follow/posts/${this.state.per}/${this.state.page}`, {
                      headers:{Authorization: `bearer ${token}`}})
    if(this.state.page===0){
      this.setState({page:resultOfFollow.data.totalpage})
    }
    let result = resultOfFollow.data.perArray || [] 
    let nextArray = this.state.followPost.concat(result)

    this.setState({totalPage: resultOfFollow.data.totalpage, 
                    loaded: true,
                    getData:true,
                    followPost: nextArray
                    })
  };


  render() {
    let { getData} = this.state;
  
    if (!window.localStorage.getItem("token")) {
      return <Redirect to="/login" />
    } else if(!getData){
      return <Fragment><Nav1/><Loading/></Fragment>
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

