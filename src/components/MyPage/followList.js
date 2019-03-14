import React, { Component } from "react";
import Dotdotdot from 'react-dotdotdot';

class followList extends Component {

  clicked = false;
  


  render(){

    return (
      <ul className="bookdetail">
        <li>
        <p className="thumbs"><img src={this.props.book.cover} alt="이미지가 등록되지 않았습다"/></p>
        <dl>
          <dt>{this.props.book.title}</dt>
          <dd>
            <div className="author">{}</div>   
            <div className="publisher">{this.props.book.publisher}</div>
            <Dotdotdot clamp={2} className="descript">{this.props.book.description}</Dotdotdot>
          </dd>
        </dl>
        </li>
      </ul>
    )
  }
}


export default followList;
