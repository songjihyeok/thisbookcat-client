import React, { Component } from "react";
import axios from "axios";
import server_url from '../url.json';
import PropTypes from 'prop-types';


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

  bookDataHandler=()=>{
    let propBookData = this.props.posting.bookData
  
    if(!propBookData){  

      if(window.confirm("책 검색 후 등록하면 다른 사람들이 더 잘 찾을 수 있습니다. 책을 등록하시겠어요?")){
        return "돌아가기"
      }
    } 
    if(typeof(propBookData)!=="string"){
      propBookData = JSON.stringify(propBookData)
       //스트링이 아닐 경우에만 적용
    }
    return propBookData;
  }


  _sendPost = async() => {
    
    let sendurl = await this._iseditorpost();
    if(!sendurl){
      return;
    }

    let bookData = this.bookDataHandler();
    if(bookData==="돌아가기"){
      return;
    }

    const titleandcontent = await axios.post(sendurl, { title: this.props.posting.title, contents: this.props.posting.contents, bookData : bookData, usingImage: this.props.posting.usingImage}, {headers: {Authorization: `bearer ${window.localStorage.getItem('token')}`}})
 
      if(!this.props.posting.isedit){
        const config = {headers: {Authorization: `bearer ${window.localStorage.getItem('token')}`}}
       // console.log("원하는 id", titleandcontent.data[0].id)
        const imageupdate =  await axios.post(`https://${server_url}/img/mainimage/create/${titleandcontent.data[0].id}`, {fileName: this.props.posting.mainimage},config)
       // console.log("이미지 업로드 완료", imageupdate)
      }
      this.props._postSuccess();  
  };

  _iseditorpost =()=>{

    if(this.props.posting.mainimage.length===0 && this.props.posting.bookData===null){
      alert("사진을 등록하지 않았습니다. 책을 검색하거나 사진을 올려주세요")
      return false;
    }
    let postid= window.location.href.split('/').pop();
    
    if(this.props.posting.isedit){

      return `https://${server_url}/api/post/edit/${postid}`  
    } else {

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
          {/* <button className="btn_BackPage" onClick={this.context.router.history.goBack}>되돌아가기</button> */}
          <button className="btn_WriterSave" href="#" onClick={this._sendPost}>저장하기</button>
        </div>
      </div>
    );
  }
}

export default Nav2;
