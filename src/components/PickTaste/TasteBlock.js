import React, { Component } from 'react'
import { Image } from 'react-bootstrap'

class Block extends Component {

  state = {
    isClicked: false
  }

_handleClick = (e) => {
  console.log('이게 타겟입니다',e.target.id)
    this._toggleBlockStatus();
    this._selectedCallBack(e.target.id)
}

_changeCssonClick = () => {
    if (this.state.isClicked === true) {
      return 'Block BlockSelect'
    } else if (this.state.isClicked === false) {
      return 'Block'
    }
}
//블록 테두리 색깔 바꾸는거

_selectedCallBack = e => {
  if (!this.state.isClicked) {
    this.props.collect(e) 
  } else {
    this.props.delete(e)
  }
}

_toggleBlockStatus = () => {
  if(this.state.isClicked === false) {
    this.setState({isClicked: true})
  } else if (this.state.isClicked === true) {
    this.setState({isClicked: false})
  }
}

componentWillMount(){
  if(this.props.already){
    this.setState({isClicked :true})
    this._changeCssonClick();   
  }
}

  render() {
  
    return (
      <div className={this._changeCssonClick()} id = {this.props.select}
          onClick={this._handleClick} >
        <div className='tagName'><span>{this.props.select}</span></div>
        <div className='tagName'><span>{"this.props.select"}</span></div>
        <Image className='BlockImage' rounded
              src={this.props.imgUrl === 1 ? null : this.props.imgUrl}
              alt={null}/>
      </div>
    )
  }
}
export default Block;

