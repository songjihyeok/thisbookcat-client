import React, { Component } from "react";
import Dotdotdot from 'react-dotdotdot';

class BookList extends Component {

  
  bookclickHandler=()=>{
    this.props.clicked(this.props.book)
  }


  render(){
    return (
      <ul className="bookdetail">
        <li onClick={this.bookclickHandler}>
        <p className="thumbs"><img src={this.props.book.cover} /></p>
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
