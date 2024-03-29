import React, { Component } from "react";
import Nav1 from "../components/Nav1";
import MyPageProFile from "../components/MyPage/MyPageProFile";
import { Redirect } from "react-router-dom";
//import '../components/MyPage/CSS/MyPageProFile.css'

class MyPage extends Component {
  //TODO: 얘도 state 없으면 functional로 바꾸기.
  render() {
    if (!window.localStorage.getItem("token")) {
      return <Redirect to="/login" />
    } else {
      return (
        <div className="MyPage">
          <Nav1 />
          <MyPageProFile/>
        </div>
      );
    }
  }
}

export default MyPage;
