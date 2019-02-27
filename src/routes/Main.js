import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import server_url from '../url.json';
import Nav1 from "../components/Nav1";
import BookBoard from "../components/Main/BookBoard";
import ModalAgree from './ModalAgree.js';
import {Button} from "react-bootstrap";
//import "../components/Main/CSS/Main.css";
import "../default.css";

class Main extends Component {
  
  state = {
    per: 18,//한페이지당 가지게될 포스트의 개수
    page: 1,//정해진 per만큼의 포스트를 가지는 페이지
    totalPage: '',
    show : false
  };

//새로 추가된 사항: per와 page추가 됐습니다. per는 1페이지에 보여줄 포스트의 갯수이고 page는 정해주는 per만큼의 post를 가지고 있는 페이지 입니다.
//client에서 정해준대로 받아오는 것이 가능합니다. 그래서 현재 스크롤을 끝까지 내리면 페이지 수를 추가하여 페이지가 더 존재하면 컨텐츠를 받아오고 끝이면
//더이상 콘텐츠가 없다는 메시지가 나오게 했습니다. 해당사항은 main이외의 다른페이지도 똑같이 적용됐습니다.

  componentDidMount () {
    this._getUrls()
    window.addEventListener('scroll', this._infiniteScroll, true)
  }

  _infiniteScroll = () => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      if (this.state.page !== this.state.totalPage) {
        this.setState({page: this.state.page+1})
        this._getUrls()
      }
    }
  }

  _renderBooKCoverImage = () => {
    if (this.state.coverurl) {
      const bookcover = this.state.coverurl.map((url) => {
        if (url) {
          console.log("그래서 가져오고 싶어")
          return <BookBoard url={url.mainImage}
                            postid={url.id}
                            title={url.title}
                            likecount={url.likeCount}
                            key={url.id}
                            bookData= {url.bookData}
                            />;
        }
      });
      return bookcover;
    }
    return <div className="loading">"Loading"</div> 
  };

  changeTaste =()=>{
    console.log("바뀌고 싶은데?")
   window.location.href='/picktaste';
  }

  _getUrls = async () => {
    const coverurl = await this._callBookCoverAPI();
    if (this.state.coverurl === undefined) {
      this.setState({coverurl})
    } else {
      this.setState({coverurl: this.state.coverurl.concat(coverurl)})
    }
  };

  _callBookCoverAPI = () => {
    let token = window.localStorage.getItem('token')
    return axios.get(`https://${server_url}/api/userTagpost/${this.state.per}/${this.state.page}`,{
      headers:{Authorization: `bearer ${token}`}})
    .then((response) => {
      // console.log('there should be data here',response.data)
      this.setState({totalPage: response.data.totalpage})
      let result = response.data.perArray
      // console.log(result)
      return result;
     })
     .catch(err => console.log(err))
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
          <div className='mainPost'>
          {this.state.page === this.state.totalPage ? <div className="dataNone">'더이상 콘텐츠가 없습니다!'</div> : ''}
          </div>

         <Button onClick={()=>this.changeTaste()}>취향 변경</Button>


         <Button style={{ marginLeft : '10px'}} onClick={this._handleShow}>이용동의팝업</Button>
         <ModalAgree show={this.state.show} hide={this._handleHide}/>
        </div>
        
      )
    }
  }
}
export default Main;