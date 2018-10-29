import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import server_url from '../url.json';
import Nav1 from "../components/Nav1";
import BookBoard from "../components/Main/BookBoard";

import "../components/Main/CSS/Main.css";

class Main extends Component {
  state = {
    items: 20,
    preItems: 0
  };

  componentDidMount() {
    this._getUrls()
    window.addEventListener('scroll', this._infiniteScroll, true)
  }

   _infiniteScroll = () => {

    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

    let clientHeight = document.documentElement.clientHeight;

    if(scrollTop + clientHeight === scrollHeight) {
      
     /*  this.setState({
        preItems: this.state.items,
        items: this.state.items+20,
      }) */

      this._getUrls()
      
      console.log(this.state.preItems)
      console.log(this.state.items)
      console.log(this.state.coverurl)
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
          return <BookBoard url={url.id} author={url.author} key={url.filename}/>;
      });
      return bookcover;
    }
    return "Loading"
  };

  _getUrls = async () => {
    const coverurl = await this._callBookCoverAPI();
    
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

    return axios.get(`http://${server_url}:3000/api/userTagpost`,{headers:{Authorization: `bearer ${token}` }})
    .then((response) => {
      console.log('there should be data here',response.data)
      let result = response.data
      console.log(result)
      return result;
      })
  };

  render() {
    console.log(window.localStorage.getItem('token'))
    //토큰이 없으면 로그인 페이지로 가라.
    if(!window.localStorage.getItem("token")){
      return <Redirect to="/login" />
    }else{
    return (
      <div className="Main">
        <Nav1/>
       {/*  {this._renderPreBooKCoverImage()} */}
        {this._renderBooKCoverImage()}
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