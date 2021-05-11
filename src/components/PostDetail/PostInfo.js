import React, { Component } from 'react'
import axios from 'axios';
import server_url from '../../url.json';
//import "./PostDetail.css";
import BookInfoModal from './BookInfoModal';
import likeControl from '../likeCotrol';

export default class PostInfo extends Component {
  state= {
    isLike: false,
    likeCount: 0,
    modal: false,
    isMypost: false,
  }

  authHeader = ()=>{
    if(window.localStorage.getItem('token')){
      return  {headers:{Authorization: `bearer ${window.localStorage.getItem('token')}`}} 
    } else{
      return {headers:{Authorization: `bearer anonymous`}} 
    }
  } 

  componentWillMount(){
    console.log("시작할때")
    this._getLikeData();
  }

  _getLikeData = async () => {
    const res_getLike = await axios.get(`https://${server_url}/api/like/${this.props.postId}`, this.authHeader())

    this.setState({
      isLike: res_getLike.data[0][0][1], 
      likeCount: res_getLike.data[0][1][1], //이 포스트의 좋아요 숫자. isLike state와도 관련있음. (렌더전에 받아온 데이터에 의해 초기값이 세팅되어야 함.)
    })
  }

  _handleLike = async () => { 

    if(!window.localStorage.getItem('token')){
      alert("로그인 해주세요.")
      return;
    }

    if(this.props.userName===''){
      alert("유저네임을 설정해주세요");
      return;
    }
  
    await likeControl(this.state.isLike, this.props.postId, this.state.likeCount)
    
    if(this.state.isLike){
      this.setState({isLike:false , likeCount:this.state.likeCount-1})
    }else {
      this.setState({isLike:true, likeCount: this.state.likeCount+1})
    }
  }

  _closeModal = () => {
    this.setState({ modal: false });
    // console.log('모달을 숨겨라. this.state.show',this.state)
  }

  _showModal = () => {
    this.setState({ modal: true });
    // console.log('모달을 보여줘. this.state.show',this.state)
  }

  showBookInfo=()=>{
    if(this.props.bookData!="null"){
      return <div className="bookInfoImage" onClick={this._showModal}></div>
    }  
  }

  render() {
    const { isLike, likeCount, modal } = this.state
    const { replyCount } = this.props
    return (
      <ul className='postInfo'>
        <li>
          {(isLike)
          ? 

          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="28.5" onClick={this._handleLike}>
             <path fill="#3376FF" fillRule="evenodd" stroke="#3376FF" strokeLinejoin="round" d="M14.8 7.804a78.67 78.67 0 0 0-.723-1.57C10.445-.717 1.294 1.227 1.294 9.906c0 5.854 13.11 15.084 13.11 15.084s13.082-9.94 13.082-15.137c0-6.979-5.989-9.379-10.165-6.604-.552.367-2.931 2.844-2.931 2.844"/>
            </svg>
            <div className="likeCount">{likeCount}</div>
          </div>
  
          :
          <div> 
          <svg xmlns="http://www.w3.org/2000/svg" width="29" height="28.5" onClick={this._handleLike}>
              <path fill="none" stroke="#343434" strokeLinejoin="round" d="M14.492 7.804a93 93 0 0 0-.723-1.57C10.137-.717.985 1.227.985 9.906c0 5.854 13.111 15.084 13.111 15.084s13.082-9.94 13.082-15.137c.001-6.979-5.989-9.379-10.164-6.604-.553.367-1.132 1.062-1.132 1.062"/>
          </svg>
          <div className="likeCount">{likeCount}</div>
        </div>
          }
        </li>
        <li>
          <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="28.5" height="28.5">
            <path fill="none" stroke="#343434" d="M14.004 2c6.633 0 12.009 4.817 12.009 10.758 0 2.782-1.177 5.316-3.11 7.225-.543.536 1.395 6.017 1.395 6.017s-4.922-3.572-5.887-3.23a13.219 13.219 0 0 1-4.407.747c-6.632 0-12.01-4.817-12.01-10.759C1.994 6.817 7.372 2 14.004 2z"/>
          </svg>
          <div className="replyCount"> {(replyCount) ? `${replyCount}` : `0`}</div>
          </div>
        </li>
        <li>
        <div className="bookinfoContainer">
          {this.showBookInfo()}
        </div>  
           <BookInfoModal bookData={this.props.bookData} show={modal} hide={this._closeModal}/>
        </li>
      </ul>
    )
  }
}
