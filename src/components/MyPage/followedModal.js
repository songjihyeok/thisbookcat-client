import React, { Component } from "react";
import server_url from '../../url.json';
import {
  Modal,
  Button,
} from "react-bootstrap";
import FollowList from "./followedList"
import axios from "axios";

class followedModal extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      data: null,
      maxpage: 1,
      per: 6,
      page: 1,
      index: null
    };
  }

  getFollowedList=async()=>{
    const token = window.localStorage.getItem('token')
    const Result = await axios.get(`https://${server_url}/api/follow/followed/${this.state.per}/${this.state.page}`, {headers: {Authorization : `bearer ${token}`}})
    console.log(Result);
    this.setState({data: Result.data.perArray, maxpage: Result.data.totalpage})
  }

  beforePage =async()=>{
    if(this.state.page>1){
      await this.setState({page: this.state.page-1});
    } else {
      alert("맨 앞 페이지입니다.");
      await this.setState({page:1});
    }
    await this.getFollowedList();
    this.pageControl();
  }
  afterPage =async()=>{
  if(this.state.page===this.state.maxpage){

    alert("마지막 페이지입니다.")
  } else {
    await this.setState({page: this.state.page+1})
  }
    await this.getFollowedList();
    
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

  renderFollowedList(){
    if(this.state.data){
      console.log(this.state.data)
      const result = this.state.data.map((followed)=>{
        if(followed){
          return <FollowList key={this.state.data.indexOf(followed)} data={followed}></FollowList>
        }
      })
      return result;                  
    }
    return <div>팔로워 유저가 없습니다.</div>
  }

  componentDidMount(){
    this.getFollowedList()
}




  render() {
    var modal = document.getElementById('modal');
    console.log("modal~!!",modal)

      return (
        <div>
          <Modal show={this.props.show}
                onHide={this.props.hide}
                container={this}
                aria-labelledby="contained-modal-title">    
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">팔로워</Modal.Title>
              </Modal.Header> 
                <Modal.Body>
                  <div className="bookInfo_view">
                      {this.renderFollowedList()}
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

export default followedModal ;