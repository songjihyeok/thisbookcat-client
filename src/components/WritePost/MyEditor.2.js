import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import axios from 'axios'
import server_url from '../../url.json'
import "./MyEditor.css";
class Editors extends Component {
 

  render(){
    function uploadImageCallBack(file) {
      let token = window.localStorage.getItem('token')
      console.log("callback")
      return new Promise(
        (resolve, reject) => {
          let data = new FormData();
          console.log("file",file)
          data.append('imgFile', file);
          console.log("data",data)
        
          axios.post(`https://${server_url}/img/mainimage/`, data, {headers:{'Authorization' :`bearer ${token}`}})
         .then((response)=>{
            console.log("response",response)
            const reader = new FileReader(); // eslint-disable-line no-undef
            reader.onload = e => resolve({ data: { link: `https://${server_url}/upload/${response.data}` } });
            reader.onerror = e => reject(e);
            reader.readAsDataURL(file);
         })
         .catch((error)=>{
           alert("파일 용량이 너무 크거나 맞는 형식의 파일이 아닙니다.")
           console.log(error);
            reject(error);
         })
        }
      );
    } 
    return (
      <div className="rdw-storybook-root">
      <Editor
        toolbarClassName="rdw-storybook-toolbar"
        wrapperClassName="rdw-storybook-wrapper"
        editorClassName="rdw-storybook-editor"
        toolbar={{
          image: {
            uploadCallback: uploadImageCallBack,
            previewImage: false,
            alignmentEnabled: true,
            inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
            alt: { present: false, mandatory: false },
            defaultSize: {
              height: '480px',
              width: '480px',
            },
          },
        }}
      />
    </div>
    )
  }
}



export default Editors


