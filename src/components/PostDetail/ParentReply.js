import React, { Component } from 'react'
import { Icon } from "semantic-ui-react"
import axios from 'axios'
import server_url from '../../url.json'

export default class ParentReply extends Component {
  state = {
    show_reReplyInput: false,
  }

  reComment = {};
  authHeader = {headers: {Authorization: `bearer ${window.localStorage.getItem('token')}`}};

  _handleReReplyInput = () => { //대댓글 쓰고싶다고 하면 input창 보여주기.
    let show_reReplyInput = this.state.show_reReplyInput
    this.setState({show_reReplyInput : !show_reReplyInput})
  }

  _newReReply = e => { //input 창에 걸어주는 onChange 함수
    // console.log('ParentReply.js 컴포넌트의 _newReReply함수에서 e.target.value', e.target.value)
    const { userName, id, } = this.props.reply
    this.reComment = {
      replyContents: e.target.value,
      parentsReplyId: id,
      targetUsername: userName  //TODO: 여기에 id가 아니라, user의 닉네임이 떠야함.
    }
  }

  _makeReReply = async () => { //input창에 쓴거 submit 하면 post 날리는 함수.
    // console.log('ParentReply.js 컴포넌트의 _makeReReply 함수에서 this.reComment', this.reComment);
    // const res_postReReply = 
    await axios.post(`http://${server_url}:3000/api/reply2/${this.props.postId}`, this.reComment, this.authHeader)
    // console.log('Reply.js 컴포 > _makeReReply 함수 > axios.post 요청 후 받는 res_postReReply', res_postReReply);
    await this.props._getReply();
  }

  _deleteReply = async () => {
    const res_deleteReply = await axios.delete(`http://${server_url}:3000/api/reply/${this.props.reply.id}`, this.authHeader)
    console.log('Reply.js 컴포 > _deleteReply 함수 > axios.post 요청 후 받는 res_deleteReply', res_deleteReply);
    await this.props._getReply();
  }


  render() {
    console.log('ParentReply.js의 render 함수에서 this.props.reply 찍는중....', this.props.reply)
    // console.log('ParentReply.js의 render 함수에서 this.props 찍는중....', this.props)
    const { userName, replyContents, profileImage, createdTime, istheReplier } = this.props.reply;
    
    return (
      <div className='parent_reply'>
        <div>
          <img src={`http://${server_url}:3000/upload/${profileImage}`} className='img-circle' alt={userName} />
          <span className='reply_username'>{userName} </span>
          <span className='reply_time'>{createdTime.substring(4, 24)}</span>
        </div>
        <div>
          <span className='reply_msg'>{replyContents} </span>
          {(istheReplier)
          ? <span className='make_rereply' onClick={this._deleteReply}>{`삭제 `}</span>
          : null
          }
          <span className='make_rereply' onClick={this._handleReReplyInput}>댓글달기</span>
        </div>
        
        {/* 이 아래는 대댓글을 쓰고싶다고 하면! 아래와 같은 인풋창을 보여주고, 아니면 나타나지 않는 부분입니다. */}
        <div>
             {(this.state.show_reReplyInput) 
             ?
               <div id="rereply">
                 <form>
                  <input id="rereply_input" type="text" name="reply"
                        placeholder={`@${userName}`} onChange={this._newReReply}/>
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
