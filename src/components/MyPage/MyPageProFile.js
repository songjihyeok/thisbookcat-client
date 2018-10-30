import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import axios from "axios";
import SettingModal from "./SettingModal";
import MyBookBoard from "./MyBookBoard";
import Image from 'react-image-resizer';

import server_url from '../../url.json'

import './CSS/MyPageProFile.css'

class MyPageProFile extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      author:'',
      counter: 0,
      ProfileImage: "http://profilepicturesdp.com/wp-content/uploads/2018/06/default-profile-picture-png-12.png",
      myPosts: []
    };
  }

   componentDidMount() {
     /* this._getIamges(); */
     this._callmyPostAPI()
  }

  _callmyPostAPI = () => {

    const token = window.localStorage.getItem('token')

    console.log(token)
    axios.get(`http://${server_url}:3000/api/post/mypage`, {
        headers: {
          Authorization: `bearer ${token}`
        }
      })
      .then(response => {
        console.log("MyBook.js의 componentDidMount함수 안에서 axios.get 요청 후 받은 response.data___", response.data);
        this.setState({
          myPosts: this.state.myPosts.concat(response.data),
        });
      })
  }

  _handleHide = () => {
    this.setState({ show: false });
  };

  _handleShow = () => {
    this.setState({ show: true })
  }

  _getImageFromModal = (image1) => {
    this.setState({
      ProfileImage: image1,
    });
  };

  _getServerImageFromModal = (image2) => {
    this.setState({
      imagetoServer: image2
    })
    console.log(this.state.imagetoServer)
  }

  _getProfileImage = () => {

  }

  _renderPost = () => {
    const posts = this.state.myPosts.map(post => {
        return (
          <MyBookBoard image={post.mainImage} title={post.title} key={post.id} postID={post.id} />
        );
    });
    console.log(this.state.myPosts)
    return posts
  };

 /*  _countPosts = () => {
    this.setState({
      counter: this.state.counter+this.myPosts.length
    })
  } */

  // _getIamges = async () => {
  //   const images = await this._callImageAPI();
  //   console.log(images);
  //   this.setState({
  //     images: images
  //   });
  // };

  // _callImageAPI = () => {
  //   const imagelistAPI = "https://picsum.photos/list";
  //   return axios.get(imagelistAPI).then(response => response.data);
  // };

  render() {
    console.log("MyPageProfile.js의 render함수 안에서 this.state.ProfileImage 찍어보는 중입니다. ___", this.state.ProfileImage);
    return (
      <div className="MyPageProFile">
        <div className="ProFilePhotoContainer">
          <Image className="ProfilePhoto" src={this.state.ProfileImage} alt="" width={200} height={200} />
        </div>
        <div className="ProFileDetail">
          <span className="ID_user">{}</span>
          <span className="Follower">팔로워 200</span>
          <Icon
            name="cog"
            size="big"
            className="custom-icon"
            onClick={() => this.setState({ show: true })}
          />
        </div>
        <SettingModal
          show={this.state.show}
          hide={this._handleHide}
          callback={this._getImageFromModal}
        />
        <div style={{ margin: "20px" }}>
        {this.state.myPosts ? this._renderPost() : "Loading"}
        </div>
      </div>
    )
  }
}

export default MyPageProFile;
