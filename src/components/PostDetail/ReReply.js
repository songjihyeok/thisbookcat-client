import React, { Component } from 'react'
import ParentReply from "./ParentReply";
import ChildReply from "./ChildReply";

export default class ReReply extends Component {
  render() {
    const { reply, postId, _getReply} = this.props
    console.log('ReReply.js 의 render 함수 안에서 this.props.reply 찍는중___',this.props.reply)

    return (
      <div>
        {reply.parentsReplyId === null //얘가 부모면,
        ?
        <ParentReply reply={reply} postId={postId} _getReply={_getReply} />
        :
        <ChildReply reply={reply} postId={postId} _getReply={_getReply}/>
        }
      </div>
    )
  }
}
