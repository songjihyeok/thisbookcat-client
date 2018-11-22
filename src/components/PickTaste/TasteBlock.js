import React, { Component } from 'react'
import Images, { Image } from 'react-bootstrap'

class Block extends Component {

  state = {
    isClicked: false
  }

_handleClick = (e) => {
  console.log('이게 타겟입니다',e)
    this._toggleBlockStatus();
    this._selectedCallBack(e.target.id)
}

_changeCssonClick = () => {
    if (this.state.isClicked === true) {
      return {'border': 'solid', 'borderWidth': '3px', 'borderColor': 'blue'}
    } else if (this.state.isClicked === false) {
      return {'border': 'solid', 'borderWidth': '3px', 'borderColor': 'white'}
    }
}

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

  render() {
    return (
      <div className='Block' style ={this._changeCssonClick()} id = {this.props.select}
          onClick={this._handleClick} key={this.props.key}>
        <span className='tagName'>{this.props.select}</span>
        <Image className='BlockImage' rounded
              src={this.props.imgUrl === 1 ? null : this.props.imgUrl}
              alt={this.props.imgUrl === 1 ? null : 'blockimage'}/>
      </div>
    )
  }
}
export default Block;

