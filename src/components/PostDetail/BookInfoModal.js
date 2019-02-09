import React, { Component, Fragment } from 'react'
import {Modal, Button} from 'react-bootstrap'
//import './BookInfoModal.css'
export default class BookInfoModal extends Component {
    
  state={
    bookinfo: null
  }  
  
  
  render() {
      const bookData= JSON.parse(this.props.bookData)
      if(bookData&&this.props.show){       
      return (
        <Fragment>
          <Modal show={this.props.show} container={this} onHide={this.props.hide}
                aria-labelledby="contained-modal-title">
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">Book info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className = 'PhotoUploadModal'>안녕하세요. 책정보 띄울 모달입니다.</div>
              <div>
                <a href={bookData.link}>
                  <img src={bookData.cover}></img>
                  <div>{bookData.title}</div>
                  <div>{bookData.author}</div>  
                  <div>{bookData.publisher}</div>
                  <div>{bookData.priceStandard}</div>
                  <div>{bookData.description}</div>
                </a>
             </div>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.props.hide}>닫기</Button>
            </Modal.Footer>
          </Modal>
        </Fragment>
      );
    }
    else {
      return null;
    } 
  }
}  

