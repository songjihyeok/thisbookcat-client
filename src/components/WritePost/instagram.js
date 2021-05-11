import React, { Component } from "react";


class instagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null
    };
  }

  clicked =()=>{
    let address = prompt("인스타그램 주소를 넣어주세요")
    console.log(address)
    this.props.getAddress(address);
  }

render(){
    return (
      <div>
        <div className="instagram" onClick={this.clicked}></div> 
      </div>
    )
  }
}

export default instagram