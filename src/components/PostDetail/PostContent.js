import React, { Component } from 'react'
import axios from 'axios';
import server_url from '../../url.json';
import "../../heightMax.css";
import InstagramShow from 'react-instagram-embed'
//import "./PostDetail.css";

export default class PostContent extends Component {

  state = {
    mainImage : '',
    contents: '',
    createdTime: '',
    likeCount: null,
    title : '',
    address: this.props.address
   }

   authHeader = ()=>{
    if(window.localStorage.getItem('token')){

      return  {headers:{Authorization: `bearer ${window.localStorage.getItem('token')}`}} 
    } else{
      return {headers:{Authorization: `bearer anonymous`}} 
    }
  } 
  componentDidMount(){
    this._getPostData();
  }

  _getPostData = async () => {
    const { bookData,  mainImage } = this.props 
    let mainImageUrl = `https://${server_url}/upload/${mainImage}`

    if(mainImage===null){
      let bookdataParsed= JSON.parse(bookData)
      mainImageUrl = bookdataParsed.cover
    } 
    this.setState({mainImage:mainImageUrl})
  }

  instagramPreview=()=>{
    if(this.state.address&&this.props.loaded){
      return <div className="instagramShow">
        <InstagramShow
        className="EmbededInstagram"
        url= {this.state.address}
        maxWidth={500}
        hideCaption={false}
        containerTagName='div'
        protocol=''
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
        ></InstagramShow>
      </div>
      }
  }

  render() {
    const { title, contents} = this.props
    return (
      <div className='post_detail_left'>
        <div className="post-thumbs"><img src={this.state.mainImage} alt={title}/></div>
        <div className="postContent">
          <div className='post_detail_title'>{title}</div> 
          {this.instagramPreview()}
          <div className='post_detail_content' dangerouslySetInnerHTML={{__html: contents}}></div>
        </div>
      </div>
    )
  }
}
