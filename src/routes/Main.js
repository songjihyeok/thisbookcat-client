import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import server_url from '../url.json';
import Nav1 from "../components/Nav1";
import BookBoard from "../components/Main/BookBoard";
import "../default.css";

class Main extends Component {
  
  state = {
    per: 16,//한페이지당 가지게될 포스트의 개수
    page: 1,//정해진 per만큼의 포스트를 가지는 페이지
    totalPage: '',
    show : false,
    loaded : false,
    userName: ''
  };

//새로 추가된 사항: per와 page추가 됐습니다. per는 1페이지에 보여줄 포스트의 갯수이고 page는 정해주는 per만큼의 post를 가지고 있는 페이지 입니다.
//client에서 정해준대로 받아오는 것이 가능합니다. 그래서 현재 스크롤을 끝까지 내리면 페이지 수를 추가하여 페이지가 더 존재하면 컨텐츠를 받아오고 끝이면
//더이상 콘텐츠가 없다는 메시지가 나오게 했습니다. 해당사항은 main이외의 다른페이지도 똑같이 적용됐습니다.

  componentDidMount () {
    this.getUserName();
    this._getUrls();
    window.addEventListener('scroll', this._infiniteScroll, false)
  }

  componentWillUnmount(){
    console.log("이거 옮길때???")
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
                            />;
        }else {
          return null;
        }
      });
      return bookcover;
    }
    return <div className="loading">"Loading"</div> 
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
    console.log("유저네임 가져오네?", resultOfget)
    if(resultOfget.data.userName){
      this.setState({userName:resultOfget.data.userName})
    }
  }


  

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