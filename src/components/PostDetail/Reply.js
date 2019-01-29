import React, { Component, Fragment } from "react";
//import "./PostDetail.css";
//import './Reply.css';
import ReReply from './ReReply';
import ParentReply from "./ParentReply";

export default class Reply extends Component {
  //TODO: state 필요없으면 functional 로 쓰든가염

  render() {
    const parentReply = this.props.reply[0];//얘가 가장 부모 댓글
    const { reply, postId, _getReply } = this.props;
   
    return (
      <Fragment>
        {(reply.length===1) //자식댓글이 없으면, 맵돌리지 말고, 바로 뿌리고,
        ?
          <ParentReply reply={parentReply} postId={postId} _getReply={_getReply} />
        :
          <div>
            {reply.map((element, index) => {
              return <ReReply reply={element} postId={postId} key={index} _getReply={_getReply}/>
            })}
          </div>
        }
      </Fragment>
    );
  }}