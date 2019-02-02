import React, { Component } from "react";

class BookList extends Component {

  
  bookclickHandler=()=>{
    this.props.clicked(this.props.book)
  }


  render(){
    const divStyle ={ height:'20px', width: "500px",fontSize : "5px"}

    return (
      <div className="bookdetail" onClick={this.bookclickHandler}>
        <img src={this.props.book.cover}></img>
        <div style={divStyle}>{this.props.book.title}</div>
        <div style={divStyle}>{this.props.book.author}</div>   
        <div style={divStyle}>{this.props.book.publisher}</div>
        <div style={divStyle}>{this.props.book.description}</div>
      </div>
    )
  }
}


export default BookList;
