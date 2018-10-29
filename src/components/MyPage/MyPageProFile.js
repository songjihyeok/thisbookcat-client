import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import axios from "axios";
import SettingModal from "./SettingModal";
import MyBookBoard from "./MyBookBoard";
import Image from 'react-image-resizer';

import './CSS/MyPageProFile.css'

class MyPageProFile extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      author: "Alejandro Escamilla",
      counter: 0,
      ProfileImage: "http://profilepicturesdp.com/wp-content/uploads/2018/06/default-profile-picture-png-12.png",
    };
  }

  // componentDidMount() {
  //   this._getIamges();
  // }

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

  // _renderImages = () => {
  //   const images = this.state.images.map(image => {
  //     if (this.state.author === image.author) {
  //       return (
  //         <MyBookBoard image={image.id} author={image.author} key={image.id} />
  //       );
  //     }
  //     return images;
  //   });
  //   console.log(this.state.images);
  //   return images;
  // };

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
          <span className="ID_user">{this.state.author}</span>
          <span className="PostNumber">{this.state.counter}개</span>
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
        {/* {this.state.images ? this._renderImages() : "Loading"} */}
      </div>
    )
  }
}

export default MyPageProFile;
