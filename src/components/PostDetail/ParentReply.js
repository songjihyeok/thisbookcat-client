import React, { Component } from 'react'
import axios from 'axios'
import server_url from '../../url.json'
import profileimage from "../../img/다운로드.png"

export default class ParentReply extends Component {
  state = {
    show_reReplyInput: false
  }

  reComment = {};
  authHeader = ()=>{
    if(window.localStorage.getItem('token')){
      return  {headers:{Authorization: `bearer ${window.localStorage.getItem('token')}`}} 
    } else{
      return {headers:{Authorization: `bearer anonymous`}} 
    }
  } 

  _handleReReplyInput = () => { //대댓글 쓰고싶다고 하면 input창 보여주기.
    if(!window.localStorage.getItem('token')){
      alert("로그인 해주세요.")
      return;
    }
    let show_reReplyInput = this.state.show_reReplyInput
    this.setState({show_reReplyInput : !show_reReplyInput})
  }

  _newReReply = e => { //input 창에 걸어주는 onChange 함수
    // console.log('ParentReply.js 컴포넌트의 _newReReply함수에서 e.target.value', e.target.value)
    e.preventDefault();
    let { userName, id, } = this.props.reply
    console.log("userName",this.props.userName)

    if(!window.localStorage.getItem('token')){
      alert("로그인 해주세요.")
      return;
    }

    if(!userName){
      alert("유저네임을 설정해주세요")
      return
    }
    
    this.reComment = {
      replyContents: e.target.value,
      parentsReplyId: id,
      targetUsername: userName  //TODO: 여기에 id가 아니라, user의 닉네임이 떠야함.
    }
  }

  _handleKeyPress= (e)=>{
    if(!window.localStorage.getItem('token')){
      alert("로그인 해주세요.")
      return;
    }
    if (e.keyCode == '13') {
    e.preventDefault();  
    this._makeReReply(e);
    }   
  }

  _userNamecontroller = (userName)=>{

    if(!window.localStorage.getItem('token')){
      alert("로그인 해주세요.")
      return;
    }
    if(!userName){
      alert("유저네임을 설정해주세요")
    }

    return `@${userName}`
  }


  _makeReReply = async (e) => { //input창에 쓴거 submit 하면 post 날리는 함수.
    // console.log('ParentReply.js 컴포넌트의 _makeReReply 함수에서 this.reComment', this.reComment);
    // const res_postReReply = 
    e.preventDefault();
    if(!window.localStorage.getItem('token')){
      alert("로그인 해주세요.")
      return;
    }
    await axios.post(`https://${server_url}/api/reply2/${this.props.postId}`, this.reComment, this.authHeader())
    // console.log('Reply.js 컴포 > _makeReReply 함수 > axios.post 요청 후 받는 res_postReReply', res_postReReply);
    await this.props._getReply();
  }

  _deleteReply = async () => {
    if(!window.localStorage.getItem('token')){
      alert("로그인 해주세요.")
      return;
    }
    const res_deleteReply = await axios.delete(`https://${server_url}/api/reply/${this.props.reply.id}`, this.authHeader())
    console.log('Reply.js 컴포 > _deleteReply 함수 > axios.post 요청 후 받는 res_deleteReply', res_deleteReply);
    await this.props._getReply();
  }


  render() {
    console.log('ParentReply.js의 render 함수에서 this.props.reply 찍는중....', this.props.reply)
    // console.log('ParentReply.js의 render 함수에서 this.props 찍는중....', this.props)
    let { userName, replyContents, profileImage, createdTime, istheReplier } = this.props.reply;
    return (
      <ul className='parent_reply'>
        <li className="reply_userinfo">
          <div className="user_thumbs">
          {(profileImage)
           ? <img src={`https://${server_url}/upload/${profileImage}`} className='img-circle' alt={"user?"} /> 
           : <img src= {profileimage} className='img-circle' alt={"userImages"} />
          }
          </div>
          <div className="txt_userinfo">
            <p className='reply_username'>{userName} </p>
            <p className='reply_time'>{createdTime.substring(4, 24)}</p>
          </div>
        </li>
        <li className="reply_content">
          <div className='reply_msg'>{replyContents} </div>
          <div className="reply_msg_button">
            {(istheReplier)
            ? <button className='make_rereply btn_del' onClick={this._deleteReply}>{`삭제 `}</button>
            : null
            }
             {(this.state.show_reReplyInput)
            ? null
            : <button className='make_rereply btn_wr_reply' onClick={this._handleReReplyInput}>답글달기</button>
             }
          </div>
        </li>
        
        {/* 이 아래는 대댓글을 쓰고싶다고 하면! 아래와 같은 인풋창을 보여주고, 아니면 나타나지 않는 부분입니다. */}
        {(this.state.show_reReplyInput) 
        ?
        <li id="rereply">
          <form>
          <textarea className="rereply_input" type="text" name="reply" placeholder={this._userNamecontroller()} onChange={this._newReReply} onKeyDown={(e)=>{this._handleKeyPress(e)}}></textarea>
          <span className="rereply_btn" onClick={this._makeReReply}>등록</span>
          </form>
        </li>
        : null
        }
      </ul>
    )
  }
}
