import React, { Component } from "react";
import "./Thumbnail.css";
import './filepond.min.css'
import server_url from '../../url.json';
import {FilePond, File, registerPlugin} from 'react-filepond'
import { Icon } from "semantic-ui-react";
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
      savedFilename : null
    }
  }

  handleInit() {
    console.log('FilePond instance has initialised', this.pond);
}

  getfilename(res){
    console.log("res:", res)
    this.setState({savedFilename :res})
    console.log("props",this.props)
    this.props._handleMainImage(this.state.savedFilename)
  }

  render() {
    let token = window.localStorage.getItem('token')
    return (
        <div className="thumbnail_app">
            {/* Pass FilePond properties as attributes */}
            <FilePond ref={ref => this.pond = ref}
                      allowMultiple={false} 
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
                              }
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
                      imageResizeTargetWidth ={480}
                      imageResizeTargetHeight= {480}
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
