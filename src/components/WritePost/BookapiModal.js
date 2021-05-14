import React, { Component } from "react";
import $ from 'jquery'
import BookList from './BookList'

import {
  Modal,
  Button,
  Form
} from "react-bootstrap";
import { Icon } from "semantic-ui-react";

class BookapiModal extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      show: this.props.showmodal,
      data: null,
      clickedData: null,
      booktitle: "",
      finishsearch: false,
      page: 1,
      maxpage: 1,
      index: null
    };
    this._handleChange = this._handleChange.bind(this);
  }
  _handleChange(e) {
    let searchingValue = e.target.value
    this.setState({ booktitle: searchingValue });
  }

  _handleKeyPress(e) {
    if (e.keyCode == '13') {
      e.preventDefault();
      this.setbookinfo(); 
    }
  }

  bookListHandler(){
    if(this.state.data){
      let bookListArray= this.state.data.item
      const result = bookListArray.map((book)=>{
       return <BookList book={book} 
                        clickedIndex={this.state.index}
                        key={bookListArray.indexOf(book)} 
                        index={bookListArray.indexOf(book)} 
                        reset={()=>{this.setState({finishsearch:false, index:null,clickedData:null})} } 
                        finishsearch={this.state.finishsearch}
                        clicked={(book, index)=>{ this.setState({index: index ,finishsearch: true, clickedData: book})}}>
              </BookList>
      })
      return result;                  
    }
  }

  beforePage =async()=>{
    if(this.state.page>1){
      await this.setState({page: this.state.page-1});
    } else {
      alert("맨 앞 페이지입니다.");
      await this.setState({page:1});
    }
    await this.setbookinfo();
    this.pageControl();
  }
  afterPage =async()=>{
  if(this.state.page===this.state.maxpage){

    alert("마지막 페이지입니다.")
  } else {
    await this.setState({page: this.state.page+1})
  }
    await this.setbookinfo();
    
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


  setbookinfo = ()=>{
  var resultOfBookdata = null; 
  var callbacks = ()=>{
    // console.log("결과물",resultOfBookdata);
    this.setState({data:resultOfBookdata});
    // console.log("max",Math.floor(resultOfBookdata.totalResults/4)+1)
    this.setState({maxpage: Math.floor(resultOfBookdata.totalResults/4)+1 })
  }
    const url = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbKey=ttbporr34441025002&Query=${this.state.booktitle}&output=js&callback=bookdisplay&MaxResults=4&SearchTarget=Book&Sort=SalesPoint&Start=${this.state.page}&Cover=Big`

      $.ajax({
        url : url,
        async: false,
        dataType : 'jsonp',
        jsonp: "bookdisplay",
      })
      
      window.bookdisplay = (success, data)=>{
      if(!success){
        alert("도서검색에 실패했습니다.")
        return;
      }
      console.log("나오는지 함 볼까?",data);
      resultOfBookdata = data;
      callbacks();
      this.pageControl();
    };
    this.setState({isclicked : true})
  }  


  render() {
    return (
      <div>
      
      <Modal show={this.state.show}
            onHide={() => {this.props.handleHide()}}
            aria-labelledby="contained-modal-title">
        
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">도서 검색</Modal.Title>
          <p className="bookSearch_text">원하는 도서를 검색해 주세요.</p>
        </Modal.Header>
        <Modal.Body>
          <div className="bookSearch_Wrap">
            <div className="bookSearch_Api">
              <h3 className="logo_aladin">알라딘</h3>
              <form>
                <Form>
                  <Form.Group controlId="formBasicText">
                    <Form.Label >
                      원하는 책을 검색해주세요
                    </Form.Label>
                    <Form.Control type="text" placeholder="책 제목을 입력하세요" value={this.state.booktitle} onChange={this._handleChange} onKeyDown={(e)=>{this._handleKeyPress(e)}}>
            
                    </Form.Control>
                    {/* <Button bsStyle="info" onClick={this.setbookinfo} className="bookSearchButton"> 
                          <Icon name="search plus" size="big" />
                        </Button> */}
    
                  </Form.Group>
  
                </Form>
                {this.state.data ? <div className="resultNum">{this.state.data.totalResults} 개의 도서가 검색되었습니다.</div> : null}
              </form>
            </div>
            
            {this.bookListHandler()}

            {this.state.finishsearch ? <div>검색된 책 : {this.state.data.title}</div> : null}
          </div>
        </Modal.Body>
        <Modal.Footer className="bookSearchModalFooter">

          {this.state.data ? 
            <div className="resultControl">
              <button className="prev" onClick={this.beforePage}>이전</button>
              <button className="next" onClick={this.afterPage}>다음</button>
            </div>
          : null}
 
          <Button bsStyle="success" disabled={!this.state.finishsearch}
                  onClick={() => {
                    console.log(this.state.clickedData.title + "책이 등록되었습니다.")
                    this.props.handleHide();
                    this.props.handleBook(this.state.clickedData)
                  }}>
            해당 도서 등록하기
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
}

export default BookapiModal;
