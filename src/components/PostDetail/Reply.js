import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import axios from 'axios';
import server_url from '../../url.json';
import "./PostDetail.css";
import './Reply.css'

export default class Reply extends Component {

  //일단 이 댓글 id가 몇인지 알아야 함(props로 받아야 할듯.)
  //이 댓글이 대댓글을 가지는지 알아야 함. (get 해와서 state에 설정해야 할듯.)
  state = {
    reply: this.props.reply[0],
    rereply : '', 
  }

  reComment = {}; //보낼 comment
  authHeader = {headers:{Authorization: `bearer ${window.localStorage.getItem('token')}`}}

  _newReReply = (e) => {
    this.comment = {replyContents: e.target.value}
  }

  _makeReply = async() => {
    //input 창에서 onChange로 작동된 _newReply 함수가 comment 라는 애를 새로 만듭니다.
    //그 this.comment가 이 axios 요청의 바디형태와 같습니다.
    //그걸로 포스트 요청 보내고, 다시 그 글의 전체 reply정보 받아오는 _getReply 함수를 실행합니다.
    const res_postReply = await axios.post(`http://${server_url}:3000/api/reply/${this.props.postId}`
      , this.comment 
      , this.authHeader)
    // console.log('postdetail 컴포 > _makeReply 함수 > axios.get 요청 후 받는 res_postReply', res_postReply);
    await this._getReply();
  }

  render() {
    const reply = this.props.reply[0];
    // console.log('Reply.js의 render 함수 안에서 this.props.reply ==',this.props.reply[0]);
    // console.log('Reply.js의 render 함수 안에서 this.props.reply ==',this.props.reply);
    return (
      <div className='reply'>
        {/* {console.log(this.props.key, this.props.reply.reply_id)} */}

        {/* 댓글쓴사람 사진도 떠야함. TODO:postdetail에서 reply array에  댓글단 사람 img src도 가지고 props로 넘겨줄건지*/}
        {/* <img src={this.props.reply.userimg} className='img-circle' alt={this.props.reply.username} /> */}
        <span className='reply_username'>{reply.userId} </span>
        <span className='reply_msg'>{reply.replyContents} </span>
        <span onClick={this._showRereplyInput}>
          <Icon name="pencil alternate" color='grey' fitted size="small" />
        </span>
        {this.state.re_reply_input
          ?
          <div id="rereply">
            <input
              id="rereply_input"
              type="text"
              name="reply"
              placeholder={`@${this.props.reply.username}`}
              />
            <div id="rereply_btn" onClick={'TODO:대댓글서버에보내는함수'}>
              <Icon name="pencil alternate" bordered inverted color='grey' fitted size="small" />
            </div>
          </div>
          : null}
      </div>
    );
  }
}

  
  // _showRereplyInput = () => {
  //   const input = this.state.re_reply_input
  //   this.setState({re_reply_input : !input})
  // }

  // _makeRereply = () => {
  //   // axios.put(댓글, {reply:id, })
  //   // .then
  // }

  // componentWillMount(){
  //   // 댓글에 대댓글 있으면 가져와서 state에 넣기.
  // }