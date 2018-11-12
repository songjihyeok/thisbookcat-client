import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import axios from 'axios';
import server_url from '../url.json';
import Nav1 from '../components/Nav1';
import Reply from '../components/PostDetail/Reply';
import PostContent from '../components/PostDetail/PostContent';
import PostWriter from '../components/PostDetail/PostWriter';
import PostInfo from '../components/PostDetail/PostInfo';

import "../components/PostDetail/PostDetail.css";
// import BookInfoModal from '../components/PostDetail/BookInfoModal';

class PostDetail extends Component {
  state = {
    postId : this.props.location.pathname.slice(12),
    // postId는 props로 받아야 함.
    userId: '',// TODO: 얘 필요하나요?
    userName: '',
    userImage: '',
    createdTime: '',
    mainImage : '',
    title : '',
    contents: '',
    // likeCount: null, //이 포스트의 좋아요 숫자. isLike state와도 관련있음. (렌더전에 받아온 데이터에 의해 초기값이 세팅되어야 함.)
    // isLike: false, // 지금 보고있는 유저가 이 포스트를 좋아하는지 아닌지 (렌더전에 받아온 데이터에 의해 초기값이 세팅되어야 함.)- 클릭 하냐 마냐에 따라 likecount 도 변동되어야 함.
    replys:[],
    replyCount : '', //댓글 갯수


    bookInfo: '',
    show : false,
    yap: '',
    isFollowing:'',
    // comment:'', //얘는 state에서 관리를 해줄 필요가 없음.
    selectedFile: null,
  }

  comment = {}; //보낼 comment
  authHeader = {headers:{Authorization: `bearer ${window.localStorage.getItem('token')}`}}

  // componentDidMount(){
  //   console.log('PostDatail.js의 ComponentDidMount 함수에서 this.state를 찍어보겠습니다___', this.state)
  // }

  async componentWillMount(){
    await this._getPostData();
    await this._getReply();
  }

  _getPostData = async() => {
    const res_getPost = await axios.get(`http://${server_url}:3000/api/post/${this.state.postId}`, this.authHeader)
    // console.log('postdetail 컴포 > _getPostData 함수 > axios.get 요청 후 받는 res_getPost', res_getPost);
    this.setState({
      mainImage: `http://${server_url}:3000/upload/${res_getPost.data.mainImage}`,
      contents: res_getPost.data.contents,
      createdTime: res_getPost.data.createdTime,
      likeCount: res_getPost.data.likeCount,
      title: res_getPost.data.title,
      userId: res_getPost.data.userId,
      mypost: res_getPost.data.isthePoster
    })
  }

  _getReply = async() => {
    const res_getReply = await axios.get(`http://${server_url}:3000/api/reply/${this.state.postId}`, this.authHeader)
    // console.log('postdetail 컴포 > _getReply 함수 > axios.get 요청 후 받는 res_getReply', res_getReply);
    if(res_getReply.status === 200){
      this.setState({
        replys: res_getReply.data,
        replyCount: res_getReply.data.length, //TODO: 이게 총 댓글 갯수 맞나요?
      })
    } else {
      this.setState({
        replys: [],
        replyCount: 0,
      })
    }
  }

  _newReply = (e) => {
    this.comment = {replyContents: e.target.value}
  }

  _makeReply = async() => {
    //input 창에서 onChange로 작동된 _newReply 함수가 comment 라는 애를 새로 만듭니다.
    //그 this.comment가 이 axios 요청의 바디형태와 같습니다.
    //그걸로 포스트 요청 보내고, 다시 그 글의 전체 reply정보 받아오는 _getReply 함수를 실행합니다.
    const res_postReply = await axios.post(`http://${server_url}:3000/api/reply/${this.state.postId}`
      , this.comment 
      , this.authHeader)
    // console.log('postdetail 컴포 > _makeReply 함수 > axios.get 요청 후 받는 res_postReply', res_postReply);
    await this._getReply();
  }

  _getBookInfo = () => {
    //알라딘에서 책 정보 가져오기
  }

  render() {
    const {postId, userId, replys, replyCount} = this.state;
    return (
      <div>
        <Nav1 />
        <div className='post_detail'>
          <PostContent postId={postId} />
          <div className='post_detail_right'>
              <PostWriter postId={postId} userId={userId} />
              <PostInfo postId={postId} replyCount={replyCount} mypost={this.state.mypost} postId={this.state.postId} history={this.props.history}/>
            
            <div className='post_detail_right_3'>
              {replys.map((reply, index) => <Reply reply={reply} postId={postId} key={index}/>)}
            </div>

            <div className='post_detail_right_2'>
              <form>
                <input
                  className='post_detail_reply_input'
                  type="text"
                  placeholder="댓글을 입력해라"
                  onChange={this._newReply}></input>
                <span onClick={this._makeReply}><Icon name="pencil alternate" fitted size="large" /></span>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostDetail;
