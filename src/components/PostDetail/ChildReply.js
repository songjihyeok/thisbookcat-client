import React, { Component } from 'react'
import { Icon } from "semantic-ui-react"
import axios from 'axios'
import server_url from '../../url.json'

export default class ChildReply extends Component {
  state = {
    show_reReplyInput: false,
  }

  reComment = {};
  authHeader = {headers:{Authorization: `bearer ${window.localStorage.getItem('token')}`}};

  _handleReReplyInput = () => {
    let show_reReplyInput = this.state.show_reReplyInput
    this.setState({show_reReplyInput : !show_reReplyInput})
  }

  _newReReply = (e) => {
    // console.log('ParentReply.js 컴포넌트의 _newReReply함수에서 e.target.value', e.target.value)
    const { userId, parentsReplyId, } = this.props.reply
    this.reComment = {
      replyContents: `@${userId} ${e.target.value}`,
      parentsReplyId: parentsReplyId,
      targetUsername: `${userId}`}
  }

  _makeReReply = async() => {
    // console.log('ParentReply.js 컴포넌트의 _makeReReply 함수에서 this.reComment', this.reComment);
    // const res_postReReply = 
    await axios.post(`http://${server_url}:3000/api/reply2/${this.props.postId}`
      , this.reComment
      , this.authHeader)
    // console.log('Reply.js 컴포 > _makeReReply 함수 > axios.post 요청 후 받는 res_postReReply', res_postReReply);
    await this.props._getReply();
  }


  render() {
    //console.log('this.props.reply 랑 this.props.reply.id', this.props.reply ,this.props.reply.id)
    const { userId, replyContents } = this.props.reply;
    return (
       <div className='child_reply'>
        {/* 댓글쓴사람 사진도 떠야함. TODO:postdetail에서 reply array에  댓글단 사람 img src도 가지고 props로 넘겨줄건지*
        <img src={this.props.reply.userimg} className='img-circle' alt={this.props.reply.username} /> */}
        <span className='child_reply_username'>{userId} </span>
        <span className='child_reply_msg'>{replyContents} </span>
        <span onClick={this._handleReReplyInput}>답글</span>
        
        {/* 이 아래는 대댓글을 쓰고싶다고 하면! 인풋창을 보여주고, 아니면 나타나지 않는 부분입니다. */}
        {/* TODO:여기도 컴포넌트화 해야하나 */}
        <div>
             {(this.state.show_reReplyInput) 
             ?
               <div id="rereply">
                 <form>
                  <input
                    id="rereply_input"
                    type="text"
                    name="reply"
                    placeholder={`@${userId}`}
                    onChange={this._newReReply}
                  />
                  <span id="rereply_btn" onClick={this._makeReReply}>
                    <Icon name="pencil alternate" bordered inverted color='grey' fitted size="small" />
                  </span>
                 </form>
               </div>
             : <div></div>
             }
           </div>
      </div>
    )
  }
}
