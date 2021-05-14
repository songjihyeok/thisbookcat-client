import React, { Component, Fragment } from 'react'
import {Modal, Button} from 'react-bootstrap'
//import './BookInfoModal.css'
export default class BookInfoModal extends Component {
    
  state={
    bookinfo: null
  }  

  render() {
      const bookData= JSON.parse(this.props.bookData);
      let bookLink =null
      if(bookData){
      bookLink = bookData.link+ "&partner=afteread" 
      }
      if(bookData&&this.props.show){ 
      return (
        <Fragment>
          <Modal show={this.props.show} onHide={this.props.hide}
                aria-labelledby="contained-modal-title">
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">도서 정보</Modal.Title>
              <h3 className="logo_aladin">알라딘</h3>
            </Modal.Header>
            <Modal.Body>
             <div className="bookInfo_view">
              <a href={bookLink} target="_blank">
                <div className="book_thumbs"><img alt="책 이미지" src={bookData.cover} /></div>
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

