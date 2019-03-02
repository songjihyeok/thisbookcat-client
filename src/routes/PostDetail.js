import React, { Fragment } from "react";
import axios from 'axios';
import server_url from '../url.json';
import Nav1 from '../components/Nav1';
import Reply from '../components/PostDetail/Reply';
import PostContent from '../components/PostDetail/PostContent';
import PostWriter from '../components/PostDetail/PostWriter';
import PostInfo from '../components/PostDetail/PostInfo';
import { Redirect } from "react-router-dom";

class PostDetail extends React.Component {
  state = {
    postId : this.props.location.pathname.slice(12),
    userId: null,
    replys:[],
    replyCount : 0, //댓글 갯수
    isMypost: null,
    bookData: null,
    replyContents: ''
  }

  //보낼 comment

  authHeader = {headers:{Authorization: `bearer ${window.localStorage.getItem('token')}`}}
  // componentDidMount(){
  //   console.log('PostDatail.js의 ComponentDidMount 함수에서 this.state를 찍어보겠습니다___', this.state)
  // }

  async componentWillMount(){ 
    this._getPostData();
    await this._getReply();
    await this._countReply();
  }

  _getPostData = async() => {
    const res_getPost = await axios.get(`https://${server_url}/api/post/${this.state.postId}`, this.authHeader)
    console.log('postdetail 컴포 > _getPostData 함수 > axios.get 요청 후 받는 res_getPost', res_getPost);
    this.setState({
      bookData: res_getPost.data.bookData,
      userId: res_getPost.data.userId,
      isMypost: res_getPost.data.isthePoster,
    })
  }

  _getReply = async() => {
    const res_getReply = await axios.get(`https://${server_url}/api/reply/${this.state.postId}`, this.authHeader)
    // console.log('postDetail.js의 _getReply 함수에서 get한 res_getReply 입니다. ', res_getReply)
    console.log("reply관련 data", res_getReply)
    if (res_getReply.data === "There is no reply") {
      this.setState({
        replys: [],
        replyCount: 0,
      })
    } else if(Array.isArray(res_getReply.data)) {
      this.setState({
        replys: res_getReply.data,
      })
    }
    const replyCount = await this._countReply();
    this.setState({replyCount: replyCount});
  }

  _countReply = () => {
    const thisReplys = this.state.replys
    let count = 0;
    for (let i=0; i < thisReplys.length ; i++) {
      count += thisReplys[i].length;
    }
    return count
  }



  _handleKeyPress=(e) =>{
    if (e.keyCode === '13') {
    this._makeReply(e);
    }   
  }

  _newReply =  (e)=> {
    this.setState({replyContents:e.target.value});
  }

  _makeReply = async(e) => {
    e.preventDefault();
    console.log("잘들어가냐?",this.state.replyContents);
    const respond =await axios.post(`https://${server_url}/api/reply/${this.state.postId}`
      , {replyContents :this.state.replyContents}
      , this.authHeader)

    console.log("respond",respond);
    await this._getReply();
    this.setState({replyContents:''})
  }
  
  render() {
    const { postId, userId, replys, replyCount, isMypost } = this.state;
    if (!window.localStorage.getItem("token")) {
      return <Redirect to="/login" />
    } else {
      console.log("replycontent", this.state.replycontents);
    return (
        <Fragment>
          <Nav1 />
          <div className='post_detail'>
            <PostContent postId={postId} />
            <div className='post_detail_right'>
              <PostWriter postId={postId} userId={userId} isMypost={isMypost} history={this.props.history}/>
              <PostInfo bookData={this.state.bookData} postId={postId} replyCount={replyCount} history={this.props.history}/>
              <div className='post_detail_3_reply'>
                {typeof(replys) === 'string'
                ? <div> '댓글이 없습니다.'</div>
                :
                  <div>
                    {replys.map((reply, index) => {
                      return <Reply reply={reply} postId={postId} key={index}
                                    _getReply={this._getReply}/>
                    })}
                  </div>
                }
              </div>   
               <div className='post_detail_right_2'>
                  <form onSubmit={this._makeReply}>
                    <input className='post_detail_reply_input'
                        placeholder="댓글을 입력하세요"  value= {this.state.replyContents} onChange={this._newReply} onKeyDown={(e)=>{this._handleKeyPress(e)}}/>
                    <button type="submit" className="btn_reWrite" >등록</button>
                  </form>  
                </div>  
            </div>
          </div>
        </Fragment>
      );
    }
  }
}

export default PostDetail;








