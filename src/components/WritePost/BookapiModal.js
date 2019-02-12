import React, { Component } from "react";
import $ from 'jquery'
import BookList from './BookList'

import {
  Modal,
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { Icon } from "semantic-ui-react";

class BookapiModal extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      show: this.props.showmodal,
      data: null,
      clickedData: null,
      booktitle: null,
      finishsearch: false,
      page: 1,
      maxpage: 1
    };
    this._handleChange = this._handleChange.bind(this);
  }
  _handleChange(e) {
    this.setState({ booktitle: e.target.value });
  }

  _handleKeyPress(e) {
    if (e.keyCode == '13') {
      this.setbookinfo(); 
    }
  }  

  bookListHandler(){
    if(this.state.data){
      console.log("array",this.state.data.item)
      const result = this.state.data.item.map((book)=>{
       return <BookList book={book} key={this.state.data.item.indexOf(book)} clicked={(book)=>{ this.setState({finishsearch: true, clickedData: book})}}></BookList>
      })
      console.log("결과??",result);
      return result;                  
    }
  }

  setbookinfo = ()=>{
  var resultOfBookdata = null; 
  var callbacks = ()=>{
    console.log("결과물",resultOfBookdata);
    this.setState({data:resultOfBookdata});
    console.log("max",Math.floor(resultOfBookdata.totalResults/5)+1)
    this.setState({maxpage: Math.floor(resultOfBookdata.totalResults/5)+1 })
  }
    const url = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbKey=ttbporr34441025002&Query=${this.state.booktitle}&output=js&callback=bookdisplay&MaxResults=5&SearchTarget=Book&Sort=SalesPoint&Start=${this.state.page}&Cover=Big`

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
    };
    this.setState({isclicked : true})
  }  

  beforePage =async()=>{

    if(this.state.page>1){
      await this.setState({page: this.state.page-1})
    } else {
      alert("맨 앞 페이지입니다.")
      await this.setState({page:1})
    }
    await this.setbookinfo()
  }
  afterPage =async()=>{
  if(this.state.page===this.state.maxpage){
    alert("마지막 페이지입니다.")
  } else {
    await this.setState({page: this.state.page+1})
  }
    await this.setbookinfo()
  }

  render() {

    return (
      <div>
        
      <Modal show={this.state.show}
            onHide={() => {this.props.handleHide()}}
            container={this}
            aria-labelledby="contained-modal-title">
        
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">책 검색하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="bookSearch_Wrap">
            <div className="bookSearch_Api">
              <form>
                <FormGroup controlId="formBasicText">
                  <ControlLabel>
                    원하는 책을 검색해주세요
                  </ControlLabel>
                  <FormControl type="text" placeholder="책 제목을 입력하세요" onChange={this._handleChange} onKeyDown={(e)=>{this._handleKeyPress(e)}}/>
                </FormGroup>
              </form>
              <Button bsStyle="info"
                      onClick={this.setbookinfo}> 
                <Icon name="search plus" size="big" />
                알라딘 검색
              </Button>
            </div>
            {this.bookListHandler()}
            <Button onClick={this.beforePage}>이전</Button>
            <Button onClick={this.afterPage}>다음</Button>
            {this.state.finishsearch ? <div>검색된 책 : {this.state.data.title}</div> : null}
          </div>
        </Modal.Body>
        <Modal.Footer>
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
