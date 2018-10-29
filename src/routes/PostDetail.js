import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import axios from 'axios';
import Nav1 from '../components/Nav1';
import Reply from '../components/PostDetail/Reply';
import "../components/PostDetail/PostDetail.css";
import BookInfoModal from '../components/PostDetail/BookInfoModal';
import server_url from '../url.json';

class PostDetail extends Component {
  state = {
    postId : 10,
    // postId는 props로 받아야 함.
    userId: '',
    createdTime: '',
    thumbnail : '',
    title : '',
    contents: '',
    likeCount: null, //이 포스트의 좋아요 숫자. isLike state와도 관련있음. (렌더전에 받아온 데이터에 의해 초기값이 세팅되어야 함.)
    
    isLike: false, // 지금 보고있는 유저가 이 포스트를 좋아하는지 아닌지 (렌더전에 받아온 데이터에 의해 초기값이 세팅되어야 함.)- 클릭 하냐 마냐에 따라 likecount 도 변동되어야 함.
    


    reply: [
      {reply_id:1, username: '지혁', msg: '안녕하세요'},
      {reply_id:2, username: '명우', msg: '해리포터 좋아요!'},
      {reply_id:3, username: '원석', msg: 'Na to the Fla'},
      {reply_id:4, username: '정민', msg: '안녕하세요. 허교익입니다. 떡볶이는 맛이 없는 음식입니다. 쏘ㅑㄹ라 소ㅑㄹ라 소ㅑㄹㄹ쇗라'},
      {reply_id:5, username: '지혁', msg: '안녕하세요'},
      {reply_id:6, username: '명우', msg: '해리포터 좋아요!'},
      {reply_id:7, username: '정민', msg: '안녕하세요. 허교익입니다. 떡볶이는 맛이 없는 음식입니다. 쏘ㅑㄹ라 소ㅑㄹ라 소ㅑㄹㄹ쇗라'},
      {reply_id:8, username: '지혁', msg: '안녕하세요'},
      {reply_id:9, username: '명우', msg: '해리포터 좋아요!'},
      {reply_id:10, username: '원석', msg: 'Na to the Fla'},
      {reply_id:11, username: '정민', msg: '안녕하세요. 허교익입니다. 떡볶이는 맛이 없는 음식입니다. 쏘ㅑㄹ라 소ㅑㄹ라 소ㅑㄹㄹ쇗라'},
      {reply_id:12, username: '지혁', msg: '안녕하세요'},
      {reply_id:13, username: '명우', msg: '해리포터 좋아요!'},
      {reply_id:14, username: '원석', msg: 'Na to the Fla'},
      {reply_id:15, username: '정민', msg: '안녕하세요. 허교익입니다. 떡볶이는 맛이 없는 음식입니다. 쏘ㅑㄹ라 소ㅑㄹ라 소ㅑㄹㄹ쇗라'},
      {reply_id:16, username: '지혁', msg: '안녕하세요'},
      {reply_id:17, username: '명우', msg: '해리포터 좋아요!'},
      {reply_id:18, username: '원석', msg: 'Na to the Fla'},
      {reply_id:19, username: '정민', msg: '안녕하세요. 허교익입니다. 떡볶이는 맛이 없는 음식입니다. 쏘ㅑㄹ라 소ㅑㄹ라 소ㅑㄹㄹ쇗라'},
      {reply_id:20, username: '명우', msg: '해리포터 좋아요!'},
      {reply_id:21, username: '원석', msg: 'Na to the Fla'}
     ],
    replyCount : '', //댓글 갯수
    bookInfo: '',
    show : false,
    yap: '',
    isFollowing: true,
    comment:'',
    selectedFile: null,
  }

  // fileChangedHandler = (e) => {
  //   this.setState({selectedFile: e.target.files[0]})
  // }


  _getPostData = () => {
    // console.log("this.props:",this.props)
      axios.get(`http://${server_url}:3000/api/post/${this.state.postId}`,{
        headers: {
          Authorization: `bearer ${window.localStorage.getItem('token')}`
        }
      })
       .then((res) => {
         console.log('postdetail 컴포 > _getPostData 함수 > axios.get 요청 후 받는 res', res);
        this.setState({
          thumbnail: `http://${server_url}:3000/upload/${res.data.mainImage}`,
          contents: res.data.contents,
          createdTime: res.data.createdTime,
          likeCount: res.data.likeCount,
          title: res.data.title,
          userId: res.data.userId,
        })
       })
       .catch(err => console.log('_getPostData get 못받음. error', err))
      }

  // _getUserData = () => {
      // axios.get(`http://${server_url}:3000/api/user/${this.state.userId}`,{
      //   headers: {
      //     Authorization: `bearer ${window.localStorage.getItem('token')}`
      //   }
      // })
  // }

  _handleLike = () => {
    //레몬에 온클릭 함수로 걸고있음.
    //클릭할때마다 axios 요청 보내기.&& state를 setting 하기

    if(this.state.isLike){
      //count-- 시키는 요청
      //postid와 userid의 like join을 삭제하는 요청

      axios.delete(`http://${server_url}:3000/api/like/${this.state.postId}`, {
        headers: {
          Authorization: `bearer ${window.localStorage.getItem('token')}`
        }
      })
      .then(res => {
        console.log("_handleLike함수에서 axios.delete 요청 보내고 받는 res___", res)

        this.setState({
          isLike: false,
          likeCount : this.state.likeCount -1
        })
      })
      .catch(err => console.log("_handleLike함수에서 axios.delete 요청 실패", err))
    }else{
      //count++ 시키는 요청
      //postid와 userid를 like join 하는 요청
      axios.post(`http://${server_url}:3000/api/like/${this.state.postId}`, {}, {
        headers: {
          Authorization: `bearer ${window.localStorage.getItem('token')}`
        }
      })
      .then(res => {
        console.log("_handleLike함수에서 axios.post 요청 보내고 받는 res___", res)

        this.setState({
          isLike: true,
          likeCount : this.state.likeCount +1
        })
      })
      .catch(err => console.log("_handleLike함수에서 axios.post 요청 실패", err))
    }
  }


  _newReply = (e) => {
    this.setState({comment: e.target.value})
  }

  _makeReply = () => {
    //포스트 보내고, 다시 그 글의 전체 reply정보 받아와서 state에 다시 set합니다.
    //axios.post ()
    // res 받기 ()
    // this.setState({reply:'썸띵썸띵'});
    const reply = this.state.reply
    reply.push({
      reply_id: this.state.reply.length,
      username: '원석',
      msg: this.state.comment})
    this.setState({reply: reply});
  }

  _getBookInfo = () => {
    //알라딘에서 책 정보 가져오기
  }

  _handleClose = () => {
    this.setState({ show: false });
    // console.log('모달을 숨겨라. this.state.show',this.state)
  }

  _handleShow = () => {
    this.setState({ show: true });
    // console.log('모달을 보여줘. this.state.show',this.state)
  }

  _handleFollowing = () => {
    // "팔로우" 버튼 클릭하면, "팔로잉"으로 바뀌고(팔로우하기) "팔로잉" 버튼 클릭하면, "팔로우"로 바뀌기 (언팔하기)
    //axios.put()// 1. 내가 팔로우 또는 언팔 한다는 거 
    // .then( // 그 정보를 잘 보냈으면, 스테이트 바꾸기
    if(this.state.isFollowing){
      this.setState({isFollowing: false})
    }else{
      this.setState({isFollowing: true})
    }
  }

  componentWillMount(){
    this._getPostData(); 
    this._getBookInfo();
    console.log('PostDatail.js의 ComponentWillMount 함수에서 this.props를 찍어보겠습니다___', this.props.location.state)
  }

  render() {
    return (
      <div>
        <Nav1 />
        {console.log(this.props)}
        <div className='post_detail'>
          <div className='post_detail_left'>
            <div><img height={window.innerHeight * 0.6} src={this.state.thumbnail} alt={this.state.title}/>
              </div>
            <h2>{this.state.title}</h2> 
            <div className='post_detail_content'>{this.state.contents}</div> 
          </div>

          <div className='post_detail_right'>

            <div className='post_detail_right_1'>
              <img src={this.state.thumbnail} className='img-circle' alt={"hello"} />
              {this.state.isFollowing ?
                  <h5 className='post_detail_following' onClick={this._handleFollowing}>팔로잉</h5> :
                  <h5 className='post_detail_follow' onClick={this._handleFollowing}>팔로우</h5>}
              <h3 className='post_detail_username'>{this.state.userId}</h3>
            </div>

            <div className='post_detail_right_2'>
              <div className='post_detail_icon'><Icon name="pencil alternate" size="large" fitted/> X {this.state.reply.length}</div>
              <div className='post_detail_icon'>
                {this.state.isLike ?
                  <span><Icon name="lemon" size="large" fitted color="yellow"onClick={this._handleLike} />X {this.state.likeCount}</span> :
                  <span><Icon name="lemon" size="large" fitted  color="grey" onClick={this._handleLike} />X {this.state.likeCount}</span>}
              </div>
              <div className='post_detail_icon' onClick={this._handleShow}>
                <Icon name="book" size="large" fitted/> info
              </div>
              <BookInfoModal show = {this.state.show} hide = {this._handleClose} />
            </div>
            
            <div className='post_detail_right_3'>
              {this.state.reply.map((reply, index) => <Reply reply={reply} key={index}/>)}
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
