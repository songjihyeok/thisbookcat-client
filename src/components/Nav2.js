import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import axios from "axios";
import server_url from '../url.json';
import "./Nav2.css";


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
  _sendPost = () => {
    let sendurl = ''
    // console.log(window.location.href,'==================');
    if (window.location.href !== `http://localhost:3000/writepost`) {
      // console.log('================================')
      let postid = window.location.href.slice(-2)
      sendurl = `http://${server_url}:3000/api/post/edit/${postid}`
    
    } else {
      sendurl = `http://${server_url}:3000/api/post/`
    }
    // console.log(sendurl,'sendurl')
    // console.log("Nav2.js 의 _sendPost 함수에서 this.props___",this.props)
    // console.log(window.localStorage.getItem('token'))
    axios.post(sendurl,
        {
          title: this.props.posting.title,
          contents: this.props.posting.contents
        },
        {
          headers: {
            Authorization: `bearer ${window.localStorage.getItem('token')}`
          }
        }
      )
      .then(response => {
        // console.log("Nav2.js 의 _sendPost 함수에서 axios.post 후 받는 response___", response);
        const formData = new FormData();
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `bearer ${window.localStorage.getItem('token')}`
          }};    

         let uploadingImgs = this.props.posting.mainimage
        //  console.log('this is original imagedata-------------------',uploadingImgs[uploadingImgs.length-1] )
         formData.append('imgFile', uploadingImgs[uploadingImgs.length-1]);
        //  console.log('this is form data------------------', formData)
        
        axios.post(`http://${server_url}:3000/img/mainimage/${response.data.id}`, formData,config)
        .then(response => {
          // console.log("Nav2.js 의 _sendPost 함수에서 axios.post 후 받는 response로 다시 axios.post 요청 후 받은 response.data___", response);
          this.props._postSuccess();
        })
        .catch(error => {
          // console.log("Nav2.js 의 _sendPost 함수에서 axios.post 후 받는 response로 다시 axios.post 요청했는데 error__", error);
        });
      })
      .catch(error => {
        console.log("Nav2.js 의 _sendPost 함수에서 axios.post 했는데 error__", error);
      });
  };
  // 서버에 axios요청을 보내는 부분입니다.
  // 이미지랑 글이랑 보내는 endpoint가 달라서 저렇게 짜 놓았습니다.

  render() {
    // console.log("Nav2.js 의 render 안에서 this.props.posting.mainimage[0]___", this.props.posting.mainimage[0]);
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/main"><div className="thisBook">이 책 반 냥</div></Link>
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