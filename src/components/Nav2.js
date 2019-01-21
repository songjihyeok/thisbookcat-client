import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import axios from "axios";
import server_url from '../url.json';
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

    let sendurl = this._iseditorpost();

    const titleandcontent = await axios.post(sendurl, { title: this.props.posting.title, contents: this.props.posting.contents}, {headers: {Authorization: `bearer ${window.localStorage.getItem('token')}`}})
    console.log("타이틀이랑 컨텐츠 수정 완료",titleandcontent)  
    
      if(!this.props.posting.isedit){
        const config = {headers: {Authorization: `bearer ${window.localStorage.getItem('token')}`}}
        
        const imageupdate =  await axios.post(`https://${server_url}/img/mainimage/create/${titleandcontent.data.id}`, {fileName: this.props.posting.mainimage},config)
        console.log("이미지 업로드 완료", imageupdate)
      }
        this.props._postSuccess();  
  };

  _iseditorpost =()=>{
    if(!this.props.posting.mainimage){
      alert("사진을 등록하지 않았습니다. 사진을 올려주세요")
      return;
    }
    let postid= window.location.href.split('/').pop();
    console.log("주소?",postid);
    
    if(postid==='writepost'){
      console.log("api/post")
      return `https://${server_url}/api/post/`  
    } else {
      console.log("api/edit")
      return `https://${server_url}/api/post/edit/${postid}`  
    }
        
  }


  render() {
    // console.log("Nav2.js 의 render 안에서 this.props.posting.mainimage[0]___", this.props.posting.mainimage[0]);
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/main"><div className="thisBook_Nav2">Afteread</div></Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullLeft>
            <NavItem eventKey={1} href="#">Draft</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={2} href="#" onClick={this._sendPost}>
              POST
              <Icon name="paper plane outline" size="big" />
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Nav2;