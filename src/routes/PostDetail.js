import React, { Fragment } from "react";
import axios from 'axios';
import server_url from '../url.json';
import Nav1 from '../components/Nav1';
import Reply from '../components/PostDetail/Reply';
import PostContent from '../components/PostDetail/PostContent';
import PostWriter from '../components/PostDetail/PostWriter';
import PostInfo from '../components/PostDetail/PostInfo';
import { Redirect } from "react-router-dom";
import  WaitingLoader from '../components/Spinner'




class PostDetail extends React.Component {
  state = {
    postId : this.props.match.params.postid,
    userId: null,
    replys:[],
    replyCount : 0, //댓글 갯수
    isMypost: null,
    bookData: null,
    replyContents: '',
    userName : '',
    loaded: false,
    address: null,
    isMypost: false,
    mainImage: null,
    contents: null,
    likeCount: null,
    instagramLoaded: false
  }

  authHeader = ()=>{
    if(window.localStorage.getItem('token')){

      return  {headers:{Authorization: `bearer ${window.localStorage.getItem('token')}`}} 
    } else{

      return {headers:{Authorization: `bearer anonymous`}} 
    }
  } 

  async componentDidMount(){ 

    await this.getUserName();
    await this._getPostData();
    await this._getReply();
    await this._countReply();
   
  }

  _getPostData = async() => {
    const res_getPost = await axios.get(`https://${server_url}/api/post/${this.state.postId}`, this.authHeader())
  console.log('postdetail 컴포 > _getPostData 함수 > axios.get 요청 후 받는 res_getPost', res_getPost);
   
  const { contents, bookData, isthePoster, instagram, createdTime, likeCount, title, userId, mainImage } = res_getPost.data
    this.setState({
      bookData: bookData,
      userId: userId,
      isMypost: isthePoster,
      address: instagram,
      mainImage: mainImage,
      contents:contents,
      likeCount:likeCount,
      title:title,
      loaded:true
    })
  }

  _getReply = async() => {
    const res_getReply = await axios.get(`https://${server_url}/api/reply/${this.state.postId}`, this.authHeader())
    // console.log('postDetail.js의 _getReply 함수에서 get한 res_getReply 입니다. ', res_getReply)

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
    if(!window.localStorage.getItem('token')){
      alert("로그인 해주세요.")
      return;
    }
    this.setState({replyContents:e.target.value});
  }

  _makeReply = async(e) => {
    console.log("userName", this.state.userName)

    if(!window.localStorage.getItem('token')){
      alert("로그인 해주세요.")
      return;
    }

    if(this.state.userName===''){
      alert("마이페이지에서 유저네임을 입력해주세요")
      return;
    }

    e.preventDefault();
    const respond =await axios.post(`https://${server_url}/api/reply/${this.state.postId}`
      , {replyContents :this.state.replyContents}
      , this.authHeader())

    await this._getReply();
    this.setState({replyContents:''})
  }

  async getUserName(){
    const token = window.localStorage.getItem('token')
    let resultOfget = await axios.get(`https://${server_url}/api/user`,this.authHeader())
    if(resultOfget.data.userName){
      this.setState({userName:resultOfget.data.userName})
    }
  }

  instagramLoaded(){
    this.setState({instagramLoaded:true})
  }

  render() {

    const { postId, userId, replys, replyCount, isMypost,contents,bookData, title,loaded, address,instagramLoaded, mainImage} = this.state;
    if(!loaded){
      return <WaitingLoader/>  
    }  
    else {
    return (
        <Fragment>
          <Nav1 />
          <div className='post_detail'>
            <PostContent postId={postId} address={address} bookData={bookData} mainImage={mainImage} title={title} contents={contents} loaded={loaded} instagramLoaded={()=>this.instagramLoaded()}/>
            <div className='post_detail_right'>
              <PostWriter postId={postId} userId={userId} isMypost={isMypost} history={this.props.history} userName={this.state.userName}/>
              <PostInfo bookData={this.state.bookData} postId={postId} replyCount={replyCount} history={this.props.history} userName={this.state.userName}/>
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








