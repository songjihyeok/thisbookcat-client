import React, { Component } from "react";
import Nav1 from "../components/Nav1";
import WriterProFile from "../components/WriterProfile/WriterProfile";
import { Redirect } from "react-router-dom";
//import '../components/MyPage/CSS/MyPageProFile.css'

class MyPage extends Component {
  
  render() {
    let writerId = this.props.match.params.writerId
    if (!window.localStorage.getItem("token")) {
      return <Redirect to="/login" />
    } else {
      return (
        <div className="MyPage">
          <Nav1 />
          <WriterProFile writerId={writerId}/>
        </div>
      );
    }
  }
}

export default MyPage;
