import React, { Component } from 'react'
import axios from 'axios';
import server_url from '../../url.json';
import "../../heightMax.css";
//import "./PostDetail.css";

export default class PostContent extends Component {

  state = {
    mainImage : '',
    contents: '',
    createdTime: '',
    likeCount: null,
    title : '',
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
    const res_getPost = await axios.get(`https://${server_url}/api/post/${this.props.postId}`, this.authHeader())

    const { contents, bookData, createdTime, likeCount, title, userId, mainImage } = res_getPost.data
    let mainImageUrl = `https://${server_url}/upload/${mainImage}`

  
    
    if(mainImage===""){
      let bookdataParsed= JSON.parse(bookData)
      mainImageUrl = bookdataParsed.cover
    } 
    
    this.setState({
      mainImage: mainImageUrl,
      contents: contents,
      createdTime: createdTime,
      likeCount: likeCount,
      title: title,
      userId: userId,
    })
  }

  render() {
    const { title, mainImage, contents } = this.state
    return (
      <div className='post_detail_left'>
        <div className="post-thumbs"><img src={mainImage} alt={title}/></div>
        <div className="postContent">
          <div className='post_detail_title'>{title}</div> 
          <div className='post_detail_content' dangerouslySetInnerHTML={{__html: contents}}></div>
        </div>
      </div>
    )
  }
}
