import React, { Component } from "react";
import axios from "axios";
// import { Item } from "../../../node_modules/semantic-ui-react";
import Image from 'react-image-resizer';
import server_url from '../../url.json';


class MyBooks extends Component {
  state = {
    mybooks: []
  };


  componentDidMount() {

    const token = window.localStorage.getItem('token')

    console.log(token)
    axios.get(`http://${server_url}:3000/api/post/27`, {
        headers: {
          Authorization: `bearer ${token}`
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
