import React, { Component } from "react";
import axios from 'axios';
import $ from 'jquery'
import {
  Modal,
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { Icon } from "semantic-ui-react";
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

class BookapiModal extends Component {
  constructor(props, context) {
    super(props, context)

    this._handleChange = this._handleChange.bind(this);
    this.state = {
      show: this.props.showmodal,
      booktitle: "",
      finishsearch: false
    };
  }
  _handleChange(e) {
    this.setState({ booktitle: e.target.value });
  }
  
  setbookinfo = async()=>{

    // const postapi = await axios.get(`https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?TTBKey=ttbporr34441025002&Query=${this.state.booktitle}`,
    // {headers:{'Access-Control-Allow-Origin': '*', 채ㅜ}})
    const bookDisplay = (success, data)=>{
      console.log(data);
    }
    const url = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?TTBKey=ttbporr34441025002&Query=${this.state.booktitle}"&output=js&callback=${bookDisplay})`
    
    $.ajax({
      url : url,
      dataType : 'jsonp'
    })
  }  

  // componentDidMount(){
  //   $.get(`https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?TTBKey=ttbporr34441025002&Query=${this.state.booktitle}`).done((data)=>{
  //     console.log(data);
  //   })
  // }


  render() {
    return (
      <div className="modal-container">
        <Modal show={this.state.show}
              onHide={() => {this.props.handleHide()}}
              container={this}
              aria-labelledby="contained-modal-title"
              style={{display: "flex", alignItems: "center"}}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">책 검색하기</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="bookSearch_Api">
              <form>
                <FormGroup controlId="formBasicText">
                  <ControlLabel>
                    원하는 책을 검색해주세요
                  </ControlLabel>
                  <FormControl type="text" placeholder="책 제목을 입력하세요" onChange={this._handleChange}/>
                </FormGroup>
              </form>
              <Button bsStyle="info"
                      onClick={this.setbookinfo}> 
                <Icon name="search plus" size="big" />
                알라딘 검색
              </Button>
            </div>
            <div id="aladin-bookinfo"></div>
            {this.state.finishsearch ? <div>검색된 책 : {this.state.booktitle}</div> : null}
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success" disabled={!this.state.finishsearch}
                    onClick={() => {
                      console.log(this.state.booktitle + "책이 등록되었습니다.")
                      this.props.handleHide();
                      this.props.handleBook(this.state.booktitle)
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
