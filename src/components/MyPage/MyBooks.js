import React, { Component } from "react";
import axios from "axios";
import server_url from '../../url.json';
// import { Item } from "../../../node_modules/semantic-ui-react";


class MyBooks extends Component {
  state = {
    mybooks: []
  };


  componentDidMount() {
    axios
      .get(`http://${server_url}:3001/api/post/27`, {
        headers: {
          Authorization: `bearer ${window.localStorage.getItem('token')}`
        }
      })
      .then(response => {
        console.log("MyBook.js의 componentDidMount함수 안에서 axios.get 요청 후 받은 response.data___", response.data);
        this.setState({
          mybooks: this.state.mybooks.concat(response.data)
        });
      });
  }

  render() {
    console.log("MyBook.js의 render함수안에서 this.state.mybooks 찍는중___", this.state.mybooks);
    return (
      <div className="myBooks">
        {this.state.mybooks.map((item, index) => {
          return (
            <div key={index}>
              <h1>Title : {item.title}</h1>
              <h2>Contents: {item.contents}</h2>
              <img src={item.mainImage.preview} alt={index} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default MyBooks;
