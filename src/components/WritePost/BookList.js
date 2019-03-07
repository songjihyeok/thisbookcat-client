import React, { Component } from "react";
import Dotdotdot from 'react-dotdotdot';

class BookList extends Component {

  clicked = false;
  
  bookclickHandler=()=>{
  let index = this.props.index;
  if(!this.clicked){
    this.props.clicked(this.props.book, index)
    }
  if(this.clicked){
    this.props.reset();
    }
  }

  render(){
   let bgColor = "white";
   let fontColor = "black"
    if(this.props.index===this.props.clickedIndex){
      bgColor = "#0099ff"
      fontColor = "white"
      this.clicked = true
    }else {
      this.clicked = false
    }

    return (
      <ul className="bookdetail">
        <li onClick={this.bookclickHandler} style={{backgroundColor: bgColor, color: fontColor}}>
        <p className="thumbs"><img src={this.props.book.cover} alt="이미지가 등록되지 않았습다"/></p>
        <dl>
          <dt>{this.props.book.title}</dt>
          <dd>
            <div className="author">{this.props.book.author}</div>   
            <div className="publisher">{this.props.book.publisher}</div>
            <Dotdotdot clamp={2} className="descript">{this.props.book.description}</Dotdotdot>
          </dd>
        </dl>
        </li>
      </ul>
    )
  }
}


export default BookList;
