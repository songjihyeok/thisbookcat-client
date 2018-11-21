import React, { Component } from 'react'
import axios from 'axios';
import server_url from '../../url.json';
import "./PostDetail.css";

export default class PostContent extends Component {

  state = {
    mainImage : '',
    contents: '',
    createdTime: '',
    likeCount: null,
    title : '',
   }

  authHeader = {headers: {Authorization: `bearer ${window.localStorage.getItem('token')}`}}

  componentWillMount(){
    this._getPostData();
  }

  _getPostData = async () => {
    const res_getPost = await axios.get(`http://${server_url}:3000/api/post/${this.props.postId}`, this.authHeader)
    // console.log('postdetail 컴포 > _getPostData 함수 > axios.get 요청 후 받는 res_getPost', res_getPost);
    const { contents, createdTime, likeCount, title, userId, mainImage } = res_getPost.data
    this.setState({
      mainImage: `http://${server_url}:3000/upload/${mainImage}`,
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
        <div><img style= {{width:500, height:500}}  src={mainImage} alt={title}/></div>
        <h2>{title}</h2> 
        <div className='post_detail_content' dangerouslySetInnerHTML={{__html: contents}}></div>
      </div>
    )
  }
}
