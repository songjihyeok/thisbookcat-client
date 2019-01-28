import React, { Component } from "react";
import MediumEditor from 'medium-editor'
import "./MyEditor.css";
import axios from "axios";
import server_url from '../../url.json';



export default class MyEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      description: '',
      imgSrc: null,
      loading: false
    }
    // this._handleScroll = this._handleScroll.bind(this);
  }


  componentDidMount() {
    const editor = new MediumEditor(/*dom, */".medium-editable",{ 
      autoLink: true,
      delay: 1000,
      targetBlank: true,
      toolbar: {
          buttons: [
            'bold', 
            'italic', 
            'quote', 
            'underline', 
            'anchor', 
            'h1',
            'h2', 
            'h3',
            'strikethrough',
            'html',
            'justifyCenter'
          ],
          diffLeft: 25,
          diffTop: 10,
      },
      anchor: {
          placeholderText: 'Type a link',
          customClassOption: 'btn',
          customClassOptionText: 'Create Button'
      },
      paste: {
          cleanPastedHTML: true,
          cleanAttrs: ['style', 'dir'],
          cleanTags: ['label', 'meta'],
          unwrapTags: ['sub', 'sup']
      },
      anchorPreview: {
          hideDelay: 300
      },
      placeholder: {
          text: 'Tell your story...'
      }
    /*
    placeholder: { text: "Tell your Story ...", hideOnClick: true },
    toolbar: {
      buttons: ['bold', 'italic']
    } */
  })    
  editor.subscribe('editableInput', (ev, editable) => {
    if(typeof document !== 'undefined')
      this.setState({
        text: editor.getContent(0),
        description: `${editor.getContent(0).substring(0,30).toString()}...`
      })
      console.log(this.state)
  })

  }

 
  render() {
    // console.log(this.state,'=;=;=');
    return (
      <div className="Write-container">
        <div className="Write_title">
          <form>
            <input className="title" type="text" placeholder="Title"
              onChange={this.props._handleTitle} defaultValue={this.state.title}/>
            {/* 제목을 쓰는 form입니다.*/}
          </form>
        </div>
        <div className="form-group">
          <textarea id="medium-editable" className="medium-editable" ></textarea>
        </div>
      </div>
    );
  }
}
