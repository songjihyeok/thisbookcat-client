import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import axios from 'axios';
import server_url from '../../url.json';
import "./PostDetail.css";
import './Reply.css';
import ReReply from './ReReply';
import ParentReply from "./ParentReply";

export default class Reply extends Component {

  //일단 이 댓글 id가 몇인지 알아야 함(props로 받아야 할듯.)
  //이 댓글이 대댓글을 가지는지 알아야 함. (get 해와서 state에 설정해야 할듯.)
  state = {
    // reply: this.props.reply[0],
    // rereply : '', 
  }

  reComment = {}; //보낼 comment
  authHeader = {headers:{Authorization: `bearer ${window.localStorage.getItem('token')}`}}

  _showRereplyInput = () => {
    const input = this.state.re_reply_input
    this.setState({re_reply_input : !input})
  }

  _newReReply = (e) => {
    console.log('Reply.js 컴포넌트의 _newReReply함수에서 e.target.value', e.target.value)
    this.reComment = {
      replyContents: `@${this.props.reply[0].userId} ${e.target.value}`,
      parentsReplyId: this.props.reply[0].id,
      targetUsername: `${this.props.reply[0].userId}`}
  }

  _makeReReply = async() => {
    console.log('Reply.js 컴포넌트의 _makeReReply 함수에서 this.reComment', this.reComment);
    //input 창에서 onChange로 작동된 _newReply 함수가 comment 라는 애를 새로 만듭니다.
    //그 this.comment가 이 axios 요청의 바디형태와 같습니다.
    //그걸로 포스트 요청 보내고, 다시 그 글의 전체 reply정보 받아오는 _getReply 함수를 실행합니다.
    const res_postReReply = await axios.post(`http://${server_url}:3000/api/reply2/${this.props.postId}`
      , this.reComment
      , this.authHeader)
    console.log('Reply.js 컴포 > _makeReReply 함수 > axios.post 요청 후 받는 res_postReReply', res_postReReply);
    await this.props._getReply();
  }

  render() {
    const parentReply = this.props.reply[0];//얘가 가장 부모 댓글
    const { reply, postId, _getReply } = this.props;
    // console.log('Reply.js의 render 함수 안에서 this.props.reply ==',this.props.reply[0]);
    console.log('Reply.js의 render 함수 안에서 this.props.reply.length ==',this.props.reply.length);
    return (
      <div>
        {(reply.length===1) //자식댓글이 없으면, 맵돌리지 말고, 바로 뿌리고,
        ?
          <ParentReply reply={parentReply} postId={postId} _getReply={_getReply} />
        :
          <div>
            {reply.map((element, index) => <ReReply reply={element} postId={postId} key={index} _getReply={_getReply}/>)}
          </div>
        }
      </div>

      //  <div className='reply'>
      //   {/* {console.log(this.props.key, this.props.reply.reply_id)} */}

      //   {/* 댓글쓴사람 사진도 떠야함. TODO:postdetail에서 reply array에  댓글단 사람 img src도 가지고 props로 넘겨줄건지*/}
      //   {/* <img src={this.props.reply.userimg} className='img-circle' alt={this.props.reply.username} /> */}
      //   {reply.length === 1 // 대댓글이 없고, parent댓글 뿐이면
      //   ?
      //   <div>
      //     <span className='reply_username'>{parentReply.userId} </span>
      //     <span className='reply_msg'>{parentReply.replyContents} </span>
      //     <span onClick={this._showRereplyInput}>
      //       <Icon name="pencil alternate" color='grey' fitted size="small" />
      //     </span>
      //     <div>
      //       {(this.state.re_reply_input)
      //       ?
      //         <div id="rereply">
      //           <form>
      //           <input
      //             id="rereply_input"
      //             type="text"
      //             name="reply"
      //             placeholder={`@${parentReply.userId}`}
      //             onChange={this._newReReply}
      //           />
      //           <div id="rereply_btn" onClick={this._makeReReply}>
      //             <Icon name="pencil alternate" bordered inverted color='grey' fitted size="small" />
      //           </div>
      //           </form>
      //         </div>
      //       : <div></div>
      //       }
      //     </div>
      //   </div>
      //   : 
      //     <div>
      //       {reply.map((element, index) => <ReReply reply={element} postId={postId} key={index} _getReply={_getReply}/>)}
      //     </div>
      //   }
      // </div>
    );
  }
}

  


  // _makeRereply = () => {
  //   // axios.put(댓글, {reply:id, })
  //   // .then
  // }

  // componentWillMount(){
  //   // 댓글에 대댓글 있으면 가져와서 state에 넣기.
  // }