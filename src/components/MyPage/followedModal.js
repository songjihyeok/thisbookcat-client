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
      page: 1,
      maxpage: 1,
      index: null
    };
  }

  componentDidMount(){
    this.getFollowingUserData()
  }

  async getFollowingUserData(){
    console.log("이거는 실행됨?")
 
    let followingList = this.props.followList[3]  
    const Result = async()=>{ 
      return await Promise.all(followingList.map((following)=>{ this.gettingData(following);}))
    }
    console.log("result",Result())
  }

  async gettingData(following){
    const token = window.localStorage.getItem('token')
    let ResultOfGet= await axios.get( `https://${server_url}/api/writer/profile/${following.followingId}`,{
        headers: {Authorization: `bearer ${token}`}})
        console.log("해당 인원의 정보",ResultOfGet.data);
    return Promise.resolve(ResultOfGet.data)
  }

  // renderFollowedList(){
  //   if(this.state.data){
  //     let followedListArray= this.props.followList
  //     console.log("followList", followedListArray)
  //     const result = followedListArray.map((followed)=>{
  //      return <FollowList data={followed}>
  //             </FollowList>
  //     })
  //     return result;                  
  //   }
  // }



  render() {
    console.log("그래서 follow list?",this.props.followList)

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
                    {/* {this.getFollowedList()} */}
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