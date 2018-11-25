import React, { Component, Fragment } from "react";
import TasteBoard from '../components/PickTaste/TasteBoard'
import {Redirect} from 'react-router-dom'
import Nav1 from '../components/Nav1'
import '../components/PickTaste/CSS/PickTaste.css'

class PickTaste extends Component {
  //TODO: 이것도 state 없으면 functional로 바꾸기.
  render() {
    if (!window.localStorage.getItem("token")) {
      return <Redirect to="/login" />
    } else {
      return (
        <Fragment>
          <div className = 'picktaste'>
            <TasteBoard/>
          </div>
        </Fragment>
      )
    }
  }
}

export default PickTaste;
