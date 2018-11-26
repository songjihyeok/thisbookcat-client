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
      files: [],
      savedFilename : ""
    }
  }

  getfilename(res){
    console.log("res:", res)
    this.setState({savedFilename :res})
    this.props._handleMainImage(savedFilename);
  }

  render() {

    return (
        
        <div className="App">
            <img src={`http://localhost:3000/upload/${this.state.savedFilename}`}></img>
            {/* Pass FilePond properties as attributes */}
            <FilePond ref={ref => this.pond = ref}
                      allowMultiple={true} 
                      maxFiles={3}
                      name = "imgFile"
                      server={
                        {
                          url : "http://localhost:3000/" ,
                          process :{ 
                              url: './img/mainimage/',
                              method : 'POST',
                              headers : { 
                                "authorization" : 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoiaGVsbGRvQGdtYWlsc2QuY29tIiwidXNlcklkIjoxLCJpYXQiOjE1NDI4NzcyNzEsImV4cCI6MTU0NDk1MDg3MX0.e8l4Mwbeh5Mf9Lx7MdWMF5ycz5tqJPaRrNh3PNMOgpY'
                              },
                              onload : (res)=>this.getfilename(res)
                          }

                    }}
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
