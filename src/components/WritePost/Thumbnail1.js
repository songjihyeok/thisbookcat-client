import React, { Component } from "react";
import "./Thumbnail.css";
import {FilePond, File, registerPlugin} from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
registerPlugin(FilePondPluginImagePreview, FilePondPluginImageCrop, FilePondPluginImageResize, FilePondPluginImageTransform);

// import axios from 'axios';

class Thumbnail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      files: []
    }
  }

  onPreviewDrop = files => {
    // console.log(files)
    this.props._handleMainImage(files)
    this.setState({files: this.state.files.concat(files)})
  }; // 올린 사진 파일을 보여주기위해 이컴포넌트에도 저장을 하고, 서버에 보내기 위해 WritePost컴포넌트에도 저장을 합니다.


  getfile = (file)=> {
    console.log(file)  
  }



  render() {
    return (
      <div className="app">
     <FilePond ref={ref => this.pond = ref}
                      allowMultiple={true} 
                      maxFiles={3}
                      name = "imgFile"
                      server={
                        {
                          url : `http://${server_url}:3000/` ,
                          process :{ 
                              url: './img/mainimage/12',
                              method : 'POST',
                              headers : { 
                                "authorization" : 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoiaGVsbGRvQGdtYWlsc2QuY29tIiwidXNlcklkIjoxLCJpYXQiOjE1NDI4NzcyNzEsImV4cCI6MTU0NDk1MDg3MX0.e8l4Mwbeh5Mf9Lx7MdWMF5ycz5tqJPaRrNh3PNMOgpY'
                              }
                          }
                    }}
                    file = {(file)=>this.getfile(file)}
                      oninit={() => this.handleInit() }
                      onupdatefiles={(fileItems) => {
                          // Set current file objects to this.state
                          this.setState({
                              files: fileItems.map(fileItem => fileItem.file)
                          }); 
                      }}
                      imageCropAspectRatio = '1:1'
                      imageResizeTargetWidth ={480}
                      imageResizeTargetHeight= {480}
                      >
                
                {/* Update current files  */}
                {this.state.files.map(file => (
                    <File key={file} src={file} origin="local" />
                ))}
            </FilePond>
      </div>
    );
  }
}

export default Thumbnail;
