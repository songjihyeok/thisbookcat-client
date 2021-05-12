import React, { Component } from 'react'
import axios from 'axios';
import server_url from '../../url.json';
import "../../heightMax.css";
import InstagramShow from 'react-instagram-embed'
//import "./PostDetail.css";
import  WaitingLoader from '../Spinner'

export default class PostContent extends Component {

  state = {
    mainImage : '',
    contents: '',
    createdTime: '',
    likeCount: null,
    title : '',
    address: this.props.address,
    instagramLoaded:false
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
    let mainImageUrl = `https://s3.ap-northeast-2.amazonaws.com/www.afteread.image/${mainImage}`
    console.log("mainImage", mainImage ,typeof(mainImage))
    console.log("bookData",bookData)
    if(!mainImage && bookData!='null'){
      let bookdataParsed= JSON.parse(bookData)
      mainImageUrl = bookdataParsed.cover
      console.log("img", mainImageUrl)
    } 
    this.setState({mainImage:mainImageUrl})
  }

  instagramPreview=()=>{
    if(this.state.address){
      return <div className="instagramShow">
        {!this.state.instagramLoaded? <WaitingLoader></WaitingLoader>: null}
        <InstagramShow
        className="EmbededInstagram"
        url= {this.state.address}
        maxWidth={1000}
        hideCaption={false}
        containerTagName='div'
        protocol=''
        injectScript
        onLoading={() => {}}
        onSuccess={() => {
          this.setState({instagramLoaded:true})
       }}
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
        {this.props.address?null:<div><div className="post-thumbs"><img src={this.state.mainImage} alt={title}/></div><div className="postContent"><div className='post_detail_title'>{title}</div></div></div>}
        <div className="postContent">
          {this.instagramPreview()}
          <div className='post_detail_content' dangerouslySetInnerHTML={{__html: contents}}></div>
        </div>
      </div>
    )
  }
}
