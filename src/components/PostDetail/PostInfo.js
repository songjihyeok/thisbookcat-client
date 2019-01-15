import React, { Component } from 'react'
import { Icon } from "semantic-ui-react";
import axios from 'axios';
import server_url from '../../url.json';
import "./PostDetail.css";
import BookInfoModal from './BookInfoModal';

export default class PostInfo extends Component {
  state= {
    isLike: null,
    likeCount: 0,
    modal: false,
    isMypost: false,
  }

  authHeader = {headers:{Authorization: `bearer ${window.localStorage.getItem('token')}`}}

  componentWillMount(){
    this._getLikeData();
  }

  _getLikeData = async () => {
    const res_getLike = await axios.get(`https://${server_url}/api/like/${this.props.postId}`, this.authHeader)
    console.log("_getLikeData에서 get 해오는 res_getLike.data ===", res_getLike.data)
    this.setState({
      isLike: res_getLike.data[0][0][1], 
      likeCount: res_getLike.data[0][1][1], //이 포스트의 좋아요 숫자. isLike state와도 관련있음. (렌더전에 받아온 데이터에 의해 초기값이 세팅되어야 함.)
    })
  }

  _handleLike = async () => { //레몬에 온클릭 함수로 걸고있음. 클릭할때마다 axios 요청 보내기.&& state를 setting 하기
    if (this.state.isLike) { //라이크 되어있는데, 라이크 누르는거면 delete 요청 보내야함.
      //count-- 시키는 요청 & //postid와 userid의 like join을 삭제하는 요청
      // const res_deleteLike = 
      await axios.delete(`https://${server_url}/api/like/${this.props.postId}`, this.authHeader)
    //console.log("_handleLike함수에서 axios.delete 요청 보내고 받는 res_deleteLike", res_deleteLike)
    } else { //count++ 시키는 요청 & //postid와 userid를 like join 하는 요청
      // const res_postLike = 
      await axios.post(`https://${server_url}/api/like/${this.props.postId}`, {}, this.authHeader)
      //console.log("_handleLike함수에서 axios.post 요청 보내고 받는 res_postLike", res_postLike)
    }
    await this._getLikeData();
  }

  _closeModal = () => {
    this.setState({ modal: false });
    // console.log('모달을 숨겨라. this.state.show',this.state)
  }

  _showModal = () => {
    this.setState({ modal: true });
    // console.log('모달을 보여줘. this.state.show',this.state)
  }

  render() {
    const { isLike, likeCount, modal } = this.state
    const { replyCount } = this.props
    return (
      <div className='post_detail_right_2_postInfo'>
        <div className='post_detail_icon'><Icon name="pencil alternate" size="large" fitted/>
          <span>{(replyCount) ? `X ${replyCount}` : `X 0`}</span>
        </div>
        <div className='post_detail_icon'>
          {(isLike)
          ? <span><Icon name="lemon" size="large" fitted color="yellow"onClick={this._handleLike} />X {likeCount}</span>
          : <span><Icon name="lemon" size="large" fitted  color="grey" onClick={this._handleLike} />X {likeCount}</span>
          }
        </div>
        <div className='post_detail_icon' onClick={this._showModal}>
          <Icon name="book" size="large" fitted/> info
        </div>
        <BookInfoModal show={modal} hide={this._closeModal}/>
    </div>
    )
  }
}
