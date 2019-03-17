import React, { Component } from "react";
import Nav1 from "../components/Nav1";
import Nav2 from "../components/Nav2";
import { Redirect } from "react-router-dom";
import Thumbnail1 from "../components/WritePost/Thumbnail1";
//import { Grid, Row, Col } from "react-bootstrap";
import Bookapi from "../components/WritePost/Bookapi";
import MyEditor from "../components/WritePost/MyEditor.js";
import "../heightMax.css";
import Template from "../components/WritePost/Template";

class WritePost extends Component {
 
    state = {
      title: null,
      contents: null,
      posted: false,
      mainimage : [],
      bookData: null,
      usingImage: []
    }  

    _handleMainImage = savedFilename => {
      this.setState({mainimage: this.state.mainimage.concat(savedFilename)});
    };  

    _removeMainImage = ()=>{
      this.setState({mainimage: []})
    }

    
    _handleTitle = e => {
      this.setState({title: e.target.value});
    }; // 제목을 등록할때 사용하는 함수 입니다.

    _handleContents = contents => {
      setTimeout(() => {
        this.setState({contents: contents});
      });
    }; // 글 내용을 저장하는 함수입니다. setTimeout을 사용하여야 라이브러리에서 정해놓은 설정을 피할 수 있습니다.


    _getBookData= (data)=>{
      console.log("일단 writepost에는 데이터?",data);
      console.log(data.cover)
      this.setState({bookData:data});
    }

    _handleImages= (images)=>{
      this.setState({usingImage: images});
    }

    _postSuccess = () => {
      this.setState({posted: true});
    }; // 글이 제대로 저장되면 true를 반환하여 페이지를 리다이렉트 시킵니다.

  render() {
    // console.log(this.state.mainimage, this.state.title, this.state.contents);
    console.log(this.state.posted, "납니까? ");
    if (!window.localStorage.getItem("token")) {
      return <Redirect to="/login" />
    } else {
      return (
        (this.state.posted)
        ?
          <Redirect to="/mypage" /> // 글이 저장되면 마이페이지로 리다이렉트하는 부분입니다.
        :
        
        <div className="writePost">
          <Nav1/>
          <div className="editWrap">
            <Nav2 _postSuccess={this._postSuccess}
                  posting={{
                    mainimage: this.state.mainimage,
                    title: this.state.title,
                    contents: this.state.contents,
                    isedit: false,
                    bookData: this.state.bookData,
                    usingImage: this.state.usingImage
                  }}/>
            {/* 악시오스 요청을 네브바에서 보냅니다. 네브바에 버튼이 존재하므로 -> 그래서 네브바에 글 제목과 글 내용, 대표이미지를 props로 내려줍니다. */}
            
            <div className="write_container">
              <ul className="writeInfo_load">
                <li className="thumbLoad">
                  <Thumbnail1  _handleMainImage={this._handleMainImage} _removeMainImage={this._removeMainImage}/>
                  {/* 대표이미지를 업로드하는 부분입니다. */}
                </li>
                <li className="bookSearch">
                 
                </li>
                <li>
                  <h3>사진을 저장하거나 책 검색을 하세요.</h3>
                  <div className="icon-wrapper">
                    <Template />
                    <Bookapi bookData={this._getBookData}/>
                  </div>
                  {/* 버튼을 누르면 모달창이 띄워지고 api연결해서 책 검색하는 컴포넌트 입니다. */}
                </li>
              </ul>
                {/* <MyEditors></MyEditors> */}
              <MyEditor _handleTitle={this._handleTitle} _handleContents={this._handleContents} _handleImages={this._handleImages}/>

            </div>
                    
          </div>
        </div>
      )
    }
  }
}

export default WritePost;
