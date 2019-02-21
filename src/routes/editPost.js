import React, { Component } from "react";
import Nav2 from "../components/Nav2";
import { Redirect } from "react-router-dom";
import Thumbnail1 from "../components/WritePost/Thumbnail1";
//import { Grid, Row, Col } from "react-bootstrap";
import Bookapi from "../components/WritePost/Bookapi";
import MyEditor from "../components/WritePost/MyEditor";
import axios from "axios";
import server_url from '../url.json';

class editPost extends Component {
 
    state = {
      title: "",
      contents: "",
      mainImage: null,
      posted : false,
      bookData: null,
      getData:false,
      posted:false
    }  
    
    authHeader = {headers: {Authorization: `bearer ${window.localStorage.getItem('token')}`}}   

    async componentDidMount (){
      await this._getpostedData();
    }

  _getpostedData = async()=>{
    try{
      const postId= window.location.href.split('/').pop();
      console.log("가져온다 postId",postId);
      const getpostedData = await axios.get(`https://${server_url}/api/post/${postId}`, this.authHeader);
      console.log("가져온다. 중간 데이터",getpostedData);
      
      const {title, contents, mainImage, bookData} = getpostedData.data
      console.log("내가 원하는 그것 내놔",title,contents,bookData, mainImage);
      await this.setState({title:title, contents, mainImage, bookData, getData: true})
    }
    catch(error){
      throw new Error(error);
    }

  }

  _getBookData= (data)=>{
    console.log("일단 writepost에는 데이터?",data);
    this.setState({bookData:data});
  }

  _handleTitle = async e => {
    let nowtitle = e.target.value; 
    console.log("그래서 지금 이름은?", nowtitle);
    await this.setState({title: nowtitle});
  }; // 제목을 등록할때 사용하는 함수 입니다.

  _handleContents = contents => {
    setTimeout(() => {
      this.setState({contents: contents});
    });
  }; // 글 내용을 저장하는 함수입니다. setTimeout을 사용하여야 라이브러리에서 정해놓은 설정을 피할 수 있습니다.

  _postSuccess = () => {
    this.setState({posted: true})
  }; // 글이 제대로 저장되면 true를 반환하여 페이지를 리다이렉트 시킵니다.

  handleImage =()=>{
		if(this.state.mainImage===""){
      let parsedBookData = this.state.bookData
      if(typeof(this.state.bookData)==="string"){
        parsedBookData = JSON.parse(this.state.bookData);
        console.log("bookdata",parsedBookData)
      }
			let postImage = parsedBookData.cover;
			console.log( "url 바뀌었나",postImage);
			return postImage 
		} 
		return `https://${server_url}/upload/${this.state.mainImage}`	
	}	



  render() {
    console.log("editpost에 오신걸 환영합니다.")
    console.log("bookdata", this.state.bookData)
    let {title, contents} = this.state
    let editor = null;
    let image = null;

      image = <img src={this.handleImage()} alt={"이미지 없음"}/>
      editor= <MyEditor contents={contents} title={title} _handleTitle={this._handleTitle} _handleContents={this._handleContents}/>

    if (!window.localStorage.getItem("token")) {
      return <Redirect to="/login" />
    }
    if (this.state.posted){
      return <Redirect to="/mypage" />
    }
    return (
        (!this.state.getData)
        ?
        <div className="loading">"Loading"</div> 
        :
          <div className="editWrap">
            <Nav2 _postSuccess={this._postSuccess}
                  posting={{
                    mainimage: this.state.mainImage,
                    title: this.state.title,
                    contents: contents,
                    isedit: true,
                    bookData: this.state.bookData
                    }}/>
            {/* 악시오스 요청을 네브바에서 보냅니다. 네브바에 버튼이 존재하므로 -> 그래서 네브바에 글 제목과 글 내용, 대표이미지를 props로 내려줍니다. */}
              <div className="write_container">
                <ul className="writeInfo_load">
                  <li className="thumbLoad">
                    <div className="thumbnail_app">
                      {image}
                    </div>
                  </li>
                  <li className="bookSearch">
                    <Bookapi bookData={this._getBookData}/>
                    {/* 버튼을 누르면 모달창이 띄워지고 api연결해서 책 검색하는 컴포넌트 입니다. */}
                  </li>
                </ul>            
                {editor}
              </div>
          </div>
      )
    }
}

export default editPost;