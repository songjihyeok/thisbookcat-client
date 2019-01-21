import React, { Component } from 'react'
import { Icon } from "semantic-ui-react"
import axios from 'axios'
import server_url from '../../url.json'
import profileimage from "../../img/다운로드.png"

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

  _newReReply = e => {
    // console.log('ParentReply.js 컴포넌트의 _newReReply함수에서 e.target.value', e.target.value)
    const { userName, parentsReplyId, } = this.props.reply
    this.reComment = {
      replyContents: e.target.value,
      parentsReplyId: parentsReplyId,
      targetUsername: userName 
    }
  }

  _makeReReply = async () => {
    // console.log('ParentReply.js 컴포넌트의 _makeReReply 함수에서 this.reComment', this.reComment);
    // const res_postReReply = 
    await axios.post(`https://${server_url}/api/reply2/${this.props.postId}`, this.reComment, this.authHeader)
    // console.log('Reply.js 컴포 > _makeReReply 함수 > axios.post 요청 후 받는 res_postReReply', res_postReReply);
    await this.props._getReply();
  }

  _deleteReply = async () => {
    const res_deleteReply = await axios.delete(`https://${server_url}/api/reply/${this.props.reply.id}`, this.authHeader)
    console.log('Reply.js 컴포 > _deleteReply 함수 > axios.post 요청 후 받는 res_deleteReply', res_deleteReply);
    await this.props._getReply();
  }

  render() {
    console.log('ChildReply.js의 render함수에서 this.props.reply를 찍고 있다 ===', this.props.reply)
    const { userName, profileImage, replyContents, targetUsername, createdTime, istheReplier } = this.props.reply;
    return (
       <ul className='child_reply'>
        {/* 댓글쓴사람 사진도 떠야함. TODO:postdetail에서 reply array에  댓글단 사람 img src도 가지고 props로 넘겨줄건지* */}
        <li className="reply_userinfo">
          <div className="user_thumbs">
            {(profileImage)
            ? <img src={`http://${server_url}/upload/${profileImage}`} className='img-circle' alt={"user?"} /> 
            : <img src= {profileimage} className='img-circle' alt={"userImages"} />
            }
          </div>
          <div className="txt_userinfo">
            <p className='reply_username'>{userName} </p>
            <p className='reply_time'>{createdTime.substring(4,24)}</p>
          </div>
        </li>
        <li className="reply_content">
          <div className='reply_msg'><span className='reply_targetName'>{`@${targetUsername}`}</span> {replyContents} </div>
          <div className="reply_msg_button">
            {(istheReplier)
            ? <span className='make_rereply btn_del' onClick={this._deleteReply}>{`삭제 `}</span>
            : null
            }
            <span className='make_rereply btn_wr_reply' onClick={this._handleReReplyInput}>댓글달기</span>
          </div>
        </li>
        
        
        {/* 이 아래는 대댓글을 쓰고싶다고 하면! 인풋창을 보여주고, 아니면 나타나지 않는 부분입니다. */}
        {/* TODO:여기도 컴포넌트화 해야하나 */}
        <div>
          {(this.state.show_reReplyInput) 
          ?
            <li id="rereply">
              <form>
                <textarea className="rereply_input" type="text" name="reply" placeholder={`@${userName}`} onChange={this._newReReply}></textarea>
                <span className="rereply_btn" onClick={this._makeReReply}>등록
                {/*
                  <Icon name="pencil alternate" bordered inverted color='grey' fitted size="small" />
                */}
                </span>
              </form>
            </li>
          : null
          }
        </div>
      </ul>
    )
  }
}
