import React, { Component } from "react";
import axios from "axios";
import { Item } from "../../../node_modules/semantic-ui-react";
import Image from 'react-image-resizer';

class MyBooks extends Component {
  state = {
    mybooks: []
  };


  componentDidMount() {

    const token = window.localStorage.getItem('token')

    console.log(token)
    axios
      .get("http://ec2-13-209-72-215.ap-northeast-2.compute.amazonaws.com:3000/api/post/mypage/", {
        headers: {
          Authorization: `bearer ${token}`
        }
      })
      .then(response => {
        console.log("this is data");
        console.log(response.data, "ooooooooooo");
        this.setState({
          mybooks: this.state.mybooks.concat(response.data)
        });
      });
  }

  render() {
    console.log(this.state.mybooks, "gogogogogogogogogogo");
    return (
      <div className="myBooks">
        {this.state.mybooks.map((item, index) => {
          return (
            <div key={index}>
              <h1>Title : {item.title}</h1>
              <h1 dangerouslySetInnerHTML={{__html:item.contents}}></h1>
              <Image src={`http://ec2-13-209-72-215.ap-northeast-2.compute.amazonaws.com:3000/upload/${item.mainImage}`} alt={index}  height={240}
          width={240}/>
            </div>
          );
        })}
      </div>
    );
  }
}

export default MyBooks;
