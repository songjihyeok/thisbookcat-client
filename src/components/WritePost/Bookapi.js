import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import BookapiModal from "./BookapiModal";
//import "./Bookapi.css";

class Bookapi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showmodal: false,
      data: null
    };
    this._handleHide = this._handleHide.bind(this);
    this._handleBook = this._handleBook.bind(this);
  }

  _handleHide() {
    this.setState({showmodal: false});
  }

  _handleBook(data) {
    console.log("데이터는 들어갔구",data);
    this.setState({data: data});
  }



  _handlebookData(){
    const styleofBook ={ 
       fontSize : "5px" 
    }


    if(this.state.data){
      return <div style={styleofBook}>
                <img src={this.state.data.cover}></img>
                <div>책 제목 : {this.state.data.title}</div>
                <div>{this.state.data.author}</div>
                <div>{this.state.data.publisher}</div> 
                <div>{this.state.data.description}</div> 
             </div>
    }
  }



  render() {
    return (
      <div className="bookApi">
        {this.state.showmodal
        ? <BookapiModal showmodal={this.state.showmodal} handleHide={this._handleHide} handleBook={this._handleBook}/>
        : null}
        <div className="searchBook" onClick={() => {this.setState({showmodal: true})}}>책 검색하기</div>
        {this._handlebookData()}
      </div>
    );
  }
}

export default Bookapi;
