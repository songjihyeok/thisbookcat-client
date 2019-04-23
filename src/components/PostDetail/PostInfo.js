import React, { Component } from 'react'
import axios from 'axios';
import server_url from '../../url.json';
//import "./PostDetail.css";
import BookInfoModal from './BookInfoModal';

export default class PostInfo extends Component {
  state= {
    isLike: null,
    likeCount: 0,
    modal: false,
    isMypost: false,
  }

  authHeader = ()=>{
    if(window.localStorage.getItem('token')){
      return  {headers:{Authorization: `bearer ${window.localStorage.getItem('token')}`}} 
    } else{
      return {headers:{Authorization: `bearer anonymous`}} 
    }
  } 

  componentWillMount(){
    this._getLikeData();
  }

  _getLikeData = async () => {
    const res_getLike = await axios.get(`https://${server_url}/api/like/${this.props.postId}`, this.authHeader())

    this.setState({
      isLike: res_getLike.data[0][0][1], 
      likeCount: res_getLike.data[0][1][1], //이 포스트의 좋아요 숫자. isLike state와도 관련있음. (렌더전에 받아온 데이터에 의해 초기값이 세팅되어야 함.)
    })
  }

  _handleLike = async () => { 

    if(!window.localStorage.getItem('token')){
      alert("로그인 해주세요.")
      return;
    }

    if(this.props.userName===''){
      alert("유저네임을 설정해주세요");
      return;
    }

    let previousInfo =  window.localStorage.getItem("previousInfo");
    window.localStorage.removeItem("previousInfo");
    let parsedInfo =JSON.parse(previousInfo);
    if (this.state.isLike) { 
      let resultOfdelete=await axios.delete(`https://${server_url}/api/like/${this.props.postId}`, this.authHeader())
      if(resultOfdelete){
        parsedInfo.coverurl.map((element)=>{
          if(element.id==this.props.postId){
     
            element["likeCount"]= this.state.likeCount-1
            element["isUserLike"]=false;
          }
        })
      }
    } else { 
      await axios.post(`https://${server_url}/api/like/${this.props.postId}`, {}, this.authHeader())
      //console.log("_handleLike함수에서 axios.post 요청 보내고 받는 res_postLike", res_postLike)
      parsedInfo.coverurl.map((element)=>{
        if(element.id==this.props.postId){

          element["likeCount"]= this.state.likeCount+1
          element["isUserLike"]=true;
        }
      })
    }

    let stringified = JSON.stringify(parsedInfo)
    window.localStorage.setItem("previousInfo", stringified);
    await this._getLikeData();
  }

  _closeModal = () => {
    this.setState({ modal: false });
    // console.log('모달을 숨겨라. this.state.show',this.state)
  }

  _showModal = () => {
    this.setState({ modal: true });
    // console.log('모달을 보여줘. this.state.show',this.state)
  }

  render() {
    const { isLike, likeCount, modal } = this.state
    const { replyCount } = this.props
    return (
      <ul className='postInfo'>
        <li>
          {(isLike)
          ? <div><span className="icon like" onClick={this._handleLike}>좋아요</span>{likeCount}</div>
          : <div><span className="icon unlike" onClick={this._handleLike}>좋아요 해제</span>{likeCount}</div>
          }
        </li>
        <li><span className="icon reCount">댓글</span>{(replyCount) ? `${replyCount}` : `0`}</li>
        <li>
          <span className="icon bookInfo" onClick={this._showModal}>책정보</span>
          <BookInfoModal bookData={this.props.bookData} show={modal} hide={this._closeModal}/>
        </li>
      </ul>
    )
  }
}
