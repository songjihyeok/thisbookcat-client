import React, { Component } from "react";
//import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
//import { Icon } from "semantic-ui-react";
import axios from "axios";
import server_url from '../url.json';
import PropTypes from 'prop-types';
//import "./Nav2.css";


class Nav2 extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    for (var key in this.props.posting) {
      if (this.props.posting[key] !== nextProps.posting[key]) {
        return true;
      }
    }
    return false;
  }
  // 새로운 프롭스가 들어오면 즉, 사용자가 글 제목이나 글 내용등을 업데이트 하면 re-render시키는 함수 입니다.

  _sendPost = async() => {
    
    let sendurl = await this._iseditorpost();
    if(!sendurl){
      return;
    }
    console.log("이게 수정이니 아니니?",this.props.posting.isedit)
    console.log("bookData", JSON.stringify(this.props.posting.bookData));
    const bookData = JSON.stringify(this.props.posting.bookData)
    const titleandcontent = await axios.post(sendurl, { title: this.props.posting.title, contents: this.props.posting.contents, bookData : bookData}, {headers: {Authorization: `bearer ${window.localStorage.getItem('token')}`}})
    console.log("타이틀이랑 컨텐츠 수정 완료",titleandcontent)  
    
      if(!this.props.posting.isedit){
        const config = {headers: {Authorization: `bearer ${window.localStorage.getItem('token')}`}}
        
        const imageupdate =  await axios.post(`https://${server_url}/img/mainimage/create/${titleandcontent.data.id}`, {fileName: this.props.posting.mainimage},config)
        console.log("이미지 업로드 완료", imageupdate)
      }
      this.props._postSuccess();  
  };

  _iseditorpost =()=>{

    if(this.props.posting.mainimage.length===0 && this.props.bookData===null){
      alert("사진을 등록하지 않았습니다. 책을 검색하거나 사진을 올려주세요")
      return false;
    }
    let postid= window.location.href.split('/').pop();
    console.log("주소?",postid);
    
    if(this.props.posting.isedit){
      console.log("api/edit")
      return `https://${server_url}/api/post/edit/${postid}`  
    } else {
      console.log("api/post")
      return `https://${server_url}/api/post/`  
    }    
  }
  static contextTypes = {
    router: PropTypes.object, // replace with PropTypes.object if you use them
  }
  
  render() {
    // console.log("Nav2.js 의 render 안에서 this.props.posting.mainimage[0]___", this.props.posting.mainimage[0]);
    return (
      <div className="nav2">
        <div className="func_Write">
          <button className="btn_BackPage" onClick={this.context.router.history.goBack}>되돌아가기</button>
          <button className="btn_WriterSave" href="#" onClick={this._sendPost}>저장하기</button>
        </div>
      </div>
    );
  }
}

export default Nav2;
