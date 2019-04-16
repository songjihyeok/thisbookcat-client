import React, { Component } from "react";
import "./Thumbnail.css";
import './filepond.min.css';
import server_url from '../../url.json';
import {FilePond, File, registerPlugin} from 'react-filepond'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import FilePondpluginImageExifzOrientation from 'filepond-plugin-image-exif-orientation'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
registerPlugin(FilePondPluginImagePreview, FilePondpluginImageExifzOrientation, FilePondPluginImageCrop,
   FilePondPluginImageResize, FilePondPluginImageTransform);

// import axios from 'axios';

class Thumbnail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      files: [],
      savedFilename : null
    }
  }

  handleInit() {
    console.log('FilePond instance has initialised', this.pond);
}

  getfilename(res){
    console.log("res:", res)
    if(res.status===400){
      alert("사진의 크기가 크거나 형식이 맞지 않습니다.")
    }
    this.setState({savedFilename :res})
    console.log("props",this.props)
    this.props._handleMainImage(this.state.savedFilename)
  }

  removefileName(){
    this.setState({ savedFilename :null })
    console.log("removed?", this.state.files, this.state.savedFilename)
    this.props._removeMainImage()
  }



  render() {
    let token = window.localStorage.getItem('token')
    
    return (
        <div className="thumbnail_app">
            <FilePond ref={ref => this.pond = ref}
                      allowMultiple={false}
                      allowReplace={false}
                      maxFiles={3}
                      name = "imgFile"
                      server={
                        {
                          url : `https://${server_url}` ,
                          process :{ 
                            url: './img/mainimage/',
                            method : 'POST',
                            headers : { 
                              "authorization" : `bearer ${token}`
                            },
                            onload : (res)=>this.getfilename(res)
                          } ,
                          revert : {
                            url : `./img/mainimage/${this.state.savedFilename}`,
                            method : 'delete',
                            headers : { 
                              "authorization" : `bearer ${token}`
                            },
                            onload : ()=> this.removefileName()
                          }
                    }}
                      accepted-file-types="image/jpeg, image/png"
                      oninit={() => this.handleInit() }
                      onupdatefiles={(fileItems) => {
                          // Set current file objects to this.state
                          this.setState({
                              files: fileItems.map(fileItem => fileItem.file)
                          }); 
                      }}
                      imageCropAspectRatio = '1:1'
                      imageResizeTargetWidth ={240}
                      imageResizeTargetHeight= {240}
                      imagePreviewHeight = {300}
                      labelIdle = '사진 불러오기'
                      >
                       {this.state.files.map(file => (
                        <File key={file} src={file} origin="local" />
                    ))}
            </FilePond>
        </div>
    );
  }
}

export default Thumbnail;
