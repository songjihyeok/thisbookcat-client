import React, { Component, Fragment } from 'react'
import {Modal, Button} from 'react-bootstrap'
//import './BookInfoModal.css'
export default class BookInfoModal extends Component {
    
  state={
    bookinfo: null
  }  

  render() {
      const bookData= JSON.parse(this.props.bookData);

      if(bookData&&this.props.show){ 
      return (
        <Fragment>
          <Modal show={this.props.show} container={this} onHide={this.props.hide}
                aria-labelledby="contained-modal-title">
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">도서 정보</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <div className="bookInfo_view">
              <h3 className="logo_aladin">알라딘</h3>
              <div className="book_thumbs"><img src={bookData.cover} /></div>

              <a href={bookData.link}>
                <span className="book_title">{bookData.title}</span>
                <span className="book_author">{bookData.author}</span>  
                <span className="book_publish">출판사 : {bookData.publisher}</span>
                <span className="book_price"><b>{bookData.priceStandard}</b> 원</span>
                <span className="book_descript">{bookData.description}</span>
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

