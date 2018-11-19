import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import server_url from '../url.json';
import Nav1 from "../components/Nav1";
import BookBoard from "../components/Main/BookBoard";

class TagSearchPage extends Component {
  
  
  state = {
    per: 8,
    //한페이지당 가지게될 포스트의 개수
    page: 1,
    //정해진 per만큼의 포스트를 가지는 페이지
    totalPage:''
  };

  componentDidMount() {
    this._getUrls()
    window.addEventListener('scroll', this._infiniteScroll, true)
   // this._getMyProfile()
  }

  _infiniteScroll = () => {

    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

    let clientHeight = document.documentElement.clientHeight;

    if(scrollTop + clientHeight === scrollHeight) {

      if(this.state.page!==this.state.totalPage) {
        this.setState({
          page: this.state.page+1
        })
        this._getUrls()
      }
    }
  }

  _renderBooKCoverImage = () => {
    console.log("rendering")
    if(this.state.coverurl) {
      const bookcover = this.state.coverurl.map((url) => {
        if(url) {
          return <BookBoard url={url.mainImage} postid={url.id} title={url.title} likecount={url.likeCount} key={url.id}/>;
        }
      });
      return bookcover;
    }
    return "Loading"
  };

  _getUrls = async () => {
    console.log("gettingUrls")
    const coverurl = await this._callTheTagBookCoverAPI();

    console.log("get url 과정?",coverurl)
    
    if(this.state.coverurl===undefined) {
      this.setState({
        coverurl
      })
    } else {
      this.setState({
        coverurl: this.state.coverurl.concat(coverurl)
      })
    }
  };

  _callTheTagBookCoverAPI = () => {
    console.log("uri 가져옵시다")
    let token = window.localStorage.getItem('token')

    return axios.post(`http://${server_url}:3000/api/post/tag/${this.state.per}/${this.state.page}`,{tagName : this.props.match.params.TagName},{headers:{Authorization: `bearer ${token}`}})
    .then((response) => {
      console.log('there should be data here',response.data)
      this.setState({
        totalPage: response.data.totalpage
      })
      let result = response.data.perArray
      console.log(result)
      return result;
      })
      .catch(err => console.log(err))
  };



  render() {
    console.log("params--------------",this.props.match.params.TagName)
    console.log(window.localStorage.getItem('token'))
    console.log('this is totalpage', this.state.totalPage)
    console.log("이미 커버유알엘?",this.state.coverurl)
    
    //토큰이 없으면 로그인 페이지로 가라.
    if(!window.localStorage.getItem("token")){
      console.log("picka")
      return <Redirect to="/login" />
    }else{
    return (
      <div className="Main">
        <Nav1/>
        {this._renderBooKCoverImage()}<br/>
        {this.state.page===this.state.totalPage?<span>'더이상 콘텐츠가 없습니다!'</span>:''}
      </div>
    );
  }}
}

export default TagSearchPage