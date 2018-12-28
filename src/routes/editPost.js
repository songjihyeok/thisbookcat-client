import React, { Component } from "react";
import Nav2 from "../components/Nav2";
import { Redirect } from "react-router-dom";
import Thumbnail1 from "../components/WritePost/Thumbnail1";
import { Grid, Row, Col } from "react-bootstrap";
import Bookapi from "../components/WritePost/Bookapi";
import MyEditor from "../components/WritePost/MyEditor";
import axios from "axios";
import server_url from '../url.json';

class editPost extends Component {
 
    state = {
      title: "",
      contents: "",
      mainimage: null,
      posted : false
    }  
    
    authHeader = {headers: {Authorization: `bearer ${window.localStorage.getItem('token')}`}}   

    async componentDidMount (){
      await this._getpostedData();
    }

  _getpostedData = async()=>{
    try{
      const postId= window.location.href.split('/').pop();
      console.log("가져온다 postId",postId);
      const getpostedData = await axios.get(`http://${server_url}:3000/api/post/${postId}`, this.authHeader);
      console.log("가져온다. 중간 데이터",getpostedData);
      const {title, contents, mainImage} = getpostedData.data
      console.log("내가 원하는 그것 내놔", title, contents, mainImage);
      await this.setState({title:title, contents, mainimage: mainImage})
    }
    catch(error){
      throw new Error(error);
    }

  }

  _handleTitle = async e => {
    let nowtitle = this.state.title + e.target.value; 
    console.log("그래서 지금 이름은?", nowtitle);
    await this.setState({title: nowtitle});
  }; // 제목을 등록할때 사용하는 함수 입니다.

  _handleContents = contents => {
    setTimeout(() => {
      this.setState({contents: contents});
    });
  }; // 글 내용을 저장하는 함수입니다. setTimeout을 사용하여야 라이브러리에서 정해놓은 설정을 피할 수 있습니다.

  _postSuccess = () => {
    this.setState({posted: true});
  }; // 글이 제대로 저장되면 true를 반환하여 페이지를 리다이렉트 시킵니다.

 

  render() {
    console.log("editpost에 오신걸 환영합니다.")
    let {mainimage, title, contents} = this.state
    let mainimageURL = `http://${server_url}:3000/upload/${mainimage}`
    let editor = null;
    let image = null;
    if(mainimage===null){
      console.log("이미지 없음")
    } else {
      image = <img style= {{width:500, height:500}}  src={mainimageURL} alt={"이미지 없음"}/>
      editor= <MyEditor contents={contents} title={title} _handleTitle={this._handleTitle} _handleContents={this._handleContents}/>
    }

    return (
      (this.state.posted)
      ?
         <Redirect to="/mypage" /> 
      :
        <div>
          <Nav2 _postSuccess={this._postSuccess}
                posting={{
                  mainimage: this.state.mainimage,
                  title: this.state.title,
                  contents: this.state.contents,
                  isedit: true
                  }}/>
          {/* 악시오스 요청을 네브바에서 보냅니다. 네브바에 버튼이 존재하므로 -> 그래서 네브바에 글 제목과 글 내용, 대표이미지를 props로 내려줍니다. */}
          <Grid>
            {/* react-bootstrap Grid를 사용해서 layout짠 부분입니다. */}
            <Row className="show-grid">
              <Col xs={12} style={{display: "flex", justifyContent: "center", height: "270px"}}>
                <div style={{display: "flex", flex: "0.5", justifyContent: "center", alignItems: "center"}}>
                  {image}
                </div>
                <div style={{display: "flex", flex: "0.5", justifyContent: "center", alignItems: "center"}}>
                  <Bookapi />
                  {/* 버튼을 누르면 모달창이 띄워지고 api연결해서 책 검색하는 컴포넌트 입니다. */}
                </div>
              </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={12} style={{display: "flex"}}>
                <div style={{display: "flex", flex: "1", marginTop: "30px"}}>
                  {editor}
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
    )
  }
}

export default editPost;