import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import server_url from '../url.json';
import Nav1 from "../components/Nav1";
import BookBoard from "../components/Main/BookBoard";

import "../components/Main/CSS/Main.css";

class Main extends Component {
  
  state = {
    per: 10,
    //한페이지당 가지게될 포스트의 개수
    page: 1,
    //정해진 per만큼의 포스트를 가지는 페이지
    totalPage:'',
    myProfile:''
  };

//새로 추가된 사항: per와 page추가 됐습니다. per는 1페이지에 보여줄 포스트의 갯수이고 page는 정해주는 per만큼의 post를 가지고 있는 페이지 입니다.
//client에서 정해준대로 받아오는 것이 가능합니다. 그래서 현재 스크롤을 끝까지 내리면 페이지 수를 추가하여 페이지가 더 존재하면 컨텐츠를 받아오고 끝이면
//더이상 콘텐츠가 없다는 메시지가 나오게 했습니다. 해당사항은 main이외의 다른페이지도 똑같이 적용됐습니다.

  componentDidMount() {
    this._getUrls()
    window.addEventListener('scroll', this._infiniteScroll, true)
    this._getMyProfile()
  }

  _getMyProfile = () => {
    let token = window.localStorage.getItem('token')

     axios.get(`http://${server_url}:3000/api/user`, {headers:{Authorization: `bearer ${token}`}})
    .then(response => {
      console.log('this is myprofileresponse',response)
      this.setState({
        myProfile: response.data
      })
    })
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

  /* _renderPreBooKCoverImage = () => {
    if(this.state.preCoverUrl) {
      const bookcover = this.state.preCoverUrl.map((url) => {
        return <BookBoard url={url.id} author={url.author} key={url.id} />;
      });
      return bookcover;
    }
  }; */

  _renderBooKCoverImage = () => {
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
    const coverurl = await this._callBookCoverAPI();

    console.log(coverurl)
    
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

  _callBookCoverAPI = () => {

    let token = window.localStorage.getItem('token')

    return axios.get(`http://${server_url}:3000/api/userTagpost/${this.state.per}/${this.state.page}`,{headers:{Authorization: `bearer ${token}`}})
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
    console.log(window.localStorage.getItem('token'))
    console.log('this is coverurl',this.state.coverurl)
    console.log('this is totalpage', this.state.totalPage)
    //토큰이 없으면 로그인 페이지로 가라.
    if(!window.localStorage.getItem("token")){
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
export default Main;

  /* _infiniteScroll = () => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

    let clientHeight = document.documentElement.clientHeight;
    
    if(scrollTop + clientHeight === scrollHeight) {
      this.setState({
        items:this.state.items+20
      })
    }
 } */
//모든 사진데이터에서 일부 뽑아내서 보여주는 infinite scroll 함수//