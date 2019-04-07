import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import "./MyEditor.css";
import axios from "axios";
import ReactQuill, {Quill} from "react-quill";
import server_url from '../../url.json';
import {ImageUpload} from 'quill-image-upload';
import {getOrientedImage} from 'exif-orientation-image'
import * as loadImage from "blueimp-load-image";
import ImageResize from 'quill-image-resize-module';
import {ImageDrop} from 'quill-image-drop-module';
var ColorClass = Quill.import('attributors/class/color');
var SizeStyle = Quill.import('attributors/style/size');
Quill.register(ColorClass, true);
Quill.register(SizeStyle, true);
Quill.import('attributors/style/align')
Quill.register('modules/imageResize', ImageResize);
Quill.register('module/imageUpload', ImageUpload);
Quill.register('modules/imageDrop', ImageDrop);

var imageUsing = null; 

export default class MyEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // editorState: EditorState.createEmpty(),
      files: [],
      editorHtml: '',
      theme: "snow",
      title: "",
      scrollTop: 0,
      contents: "",
      usingImgFiles :[]
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(html) {
    console.log("뭐가 들어있지?",html);
    this.props._handleContents(html); // 이 부분은 WritePost파일에서 state를 변경해주기 위해 사용하는 함수입니다.
    this.setState({editorHtml: html});

    await this.keepingUsingImgFiles();
    await this.deleteUnusingImage(html);
  } // 글을 저장하는 함수입니다.

  async keepingUsingImgFiles(){
    if(imageUsing){
      await this.setState({usingImgFiles: [...this.state.usingImgFiles,imageUsing]})
      imageUsing=null;
    }
  }


  async deleteUnusingImage(contents){
    let usingImgFiles = this.state.usingImgFiles;
    const token = window.localStorage.getItem('token')
    const strReg = new RegExp("https://*[^>]*\\.(jpg|gif|png|jpeg)","gim");
    let xArr =  contents.match(strReg);

    console.log("xArr?",xArr)
    if(!xArr){
      xArr=[]; 
    }

    const imageNames= xArr.map((element)=>{
      let splitedImageName=element.split('/')
      return splitedImageName[splitedImageName.length-1]
    })

    for(let element of usingImgFiles){
      if(!imageNames.includes(element)){
      let resultOfDelete= await axios.delete(`https://${server_url}/img/mainimage/${element}`, {headers:{'Authorization' :`bearer ${token}`}})
      console.log("delete", resultOfDelete)
      }
    }
    this.setState({usingImgFiles: imageNames});
    this.props._handleImages(imageNames)
  }




  render() {
    let editorHtml =this.state.editorHtml;
    let defaultTitle = this.props.title;
    let defaultcontents = this.props.contents 
    console.log("editorHtml", editorHtml)
    console.log("사용하는 이미지",imageUsing,this.state.usingImgFiles);
    return (
      <div className="editor_container">
        <div className="Write_title">
          <form>
            <input className="title" type="text" placeholder="Title"
              onChange={this.props._handleTitle} defaultValue={defaultTitle}/>
          </form>
        </div>
        <div className="RichEditor-root">
          <ReactQuill theme={this.state.theme}
                      onChange={this.handleChange}
                      defaultValue={defaultcontents}
                      modules={Editor.module}
                      formats={Editor.formats}
                      bounds={".app"}
                      placeholder={"tell your story"}>
          </ReactQuill>        
        </div>
      </div>
    );
  }
}


Editor.module = {
  toolbar: {
    container : [
      [{ header: 1 }, { header: 2 }], // custom button values
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"]
    ],
    handlers : {
      image : imageHandler
    }
  },
  imageResize: {
          displayStyles: {
            backgroundColor: 'black',
            border: 'none',
            color: 'white'
          },
          modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
  },
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  },
  imageDrop : true
} 


function imageHandler () {
  console.log("imageHandler doing!")

  const input = document.createElement('input');

  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();
  let token = window.localStorage.getItem('token')
    input.onchange = async () => {
      try{
        console.log("change");
      
        let file = input.files[0];

        const fileType = file.type;
    
        loadImage(
          file,
          img => {

            img.toBlob( async blob => {
              let createdFile = new File([blob], file.name, {type: fileType});
       
              console.log("createdFile",createdFile)
              const formData = new FormData();
              formData.append('imgFile', createdFile);
              // Save current cursor state
              const range = this.quill.getSelection(true);
            
              const res = await axios.post(`https://${server_url}/img/mainimage/`, formData, {headers:{'Authorization' :`bearer ${token}`}})
            
              this.quill.insertEmbed(range.index, 'image', `https://${server_url}/upload/${res.data}`); 
              // Move cursor to right side of image (easier to continue typing)
              this.quill.setSelection(range.index + 1);  
              // 이미지 업로드 실행은 여기서
            }, fileType);
          },
          { orientation: true }
        );


      }
      catch(err){
        alert("error")
      }
    }  
  }


Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "color",
  "background",
  "align",
  "image",
  "video"
];
