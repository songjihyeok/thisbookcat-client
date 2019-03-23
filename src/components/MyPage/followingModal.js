import React, { Component } from "react";
import server_url from '../../url.json';
import {
  Modal,
  Button,
} from "react-bootstrap";
import FollowList from "./followingList"
import axios from "axios";

class followingModal extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      data: null,
      per: 6,
      page: 1,
      maxpage:1,
      index: null
    };
  }

  componentDidMount(){
      this.getFollowingList()
  }


 getFollowingList=async()=>{
  const token = window.localStorage.getItem('token')
  const Result = await axios.get(`https://${server_url}/api/follow/following/${this.state.per}/${this.state.page}`, {headers: {Authorization : `bearer ${token}`}})
  console.log('리스트 결과',Result.data.totalpage);
  this.setState({data: Result.data.perArray, maxpage:Result.data.totalpage})
 }

renderFollowingList(){
  if(this.state.data){
    console.log(this.state.data)
    const result = this.state.data.map((following)=>{
      if(following){
        return <FollowList key={this.state.data.indexOf(following)} data={following}></FollowList>
      }
    })
    return result;                  
   }
  return <div>팔로잉한 유저가 없습니다.</div>
  }

  beforePage =async()=>{
    if(this.state.page>1){
      await this.setState({page: this.state.page-1});
    } else {
      alert("맨 앞 페이지입니다.");
      await this.setState({page:1});
    }
    await this.getFollowingList();
    this.pageControl();
  }
  afterPage =async()=>{
  if(this.state.page===this.state.maxpage){

    alert("마지막 페이지입니다.")
  } else {
    await this.setState({page: this.state.page+1})
  }
    await this.getFollowingList();
    
    this.pageControl();
  }

  pageControl(e) {
    let buttonPrev = document.querySelector('.prev');
    let buttonNext = document.querySelector('.next');

    if (this.state.page - 1 === 0 || this.state.page === 1 ){
      buttonPrev.classList.remove("active");
    } else {
      buttonPrev.classList.add("active");
    }
    
    if ( this.state.page === this.state.maxpage ){
      buttonNext.classList.remove("active");
    } else {
      buttonNext.classList.add("active");
    }
  }


  render() {
      return (
        <div>
          <Modal show={this.props.show}
                onHide={this.props.hide}
                container={this}
                aria-labelledby="contained-modal-title">    
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">팔로잉</Modal.Title>
              </Modal.Header> 
                <Modal.Body>
                  <div className="bookInfo_view">
                      {this.renderFollowingList()}
                  </div>
                </Modal.Body>
              <Modal.Footer>
                {this.state.data ? 
                  <div className="resultControl">
                    <button className="prev" onClick={this.beforePage}>이전</button>
                    <button className="next" onClick={this.afterPage}>다음</button>
                 </div>
              : null}
                <Button onClick={this.props.hide}>닫기</Button>
              </Modal.Footer>
          </Modal>
        </div>
      );
  }
}

export default followingModal ;