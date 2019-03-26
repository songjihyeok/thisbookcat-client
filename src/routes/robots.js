import React, { Component } from "react";
import fs from 'fs'

class robots extends Component {
  
  _renderingRobotTxt=()=>{
    let text = fs.readFileSync('../robots.txt')
    return text
  } 


  render() {

      return (
        <div>
          {this._renderingRobotTxt()}
        </div>
      );
  }
}

export default robots;
