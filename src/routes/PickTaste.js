import React, { Component } from "react";
import TasteBoard from '../components/PickTaste/TasteBoard'
import {Redirect} from 'react-router-dom'

import '../components/PickTaste/CSS/PickTaste.css'

class PickTaste extends Component {
  render() {
    if(!window.localStorage.getItem("token")){
      return <Redirect to="/login" />
    }else{
      return <div className = 'picktaste'>
    <TasteBoard/>
    </div>;
    }
    
  }
}

export default PickTaste;
