import React, { Component } from "react";
import server_url from '../../url.json';
import {
  Modal,
  Button,
} from "react-bootstrap";
import FollowList from "./followList"
import axios from "axios";

class followedModal extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      data: null,
      per: 3,
      page: 1,
      index: null
    };
  }

  componentDidMount(){
      this.getFollowedList()
  }


 getFollowedList=async()=>{
  const token = window.localStorage.getItem('token')
  const Result = await axios.get(`https://${server_url}/api/follow/followed/${this.state.per}/${this.state.page}`, {headers: {Authorization : `bearer ${token}`}})
  this.setState({data: Result.data.perArray})
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
    return <div>팔로잉한 유저가 없습니다.</div>
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
                      {this.renderFollowedList()}
                  </div>
                </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.props.hide}>닫기</Button>
              </Modal.Footer>
          </Modal>
        </div>
      );
  }
}

export default followedModal ;