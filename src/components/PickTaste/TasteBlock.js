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

changeName=()=>{
  if(this.props.select==="저자와의대화"){
    return "저자와의 대화"
  }
  if(this.props.select==="독립서점소식"){
    return "독립서점 소식"
  }
  if(this.props.select==="책끝을접다"){
    return "책끝을 접다"
  }
  if(this.props.select==="이달의신간"){
    return  "다이애나의 책장"
  }
  if(this.props.select==="북이벤트"){
    return  "북 이벤트"
  }
  if(this.props.select==="다이애나의책장"){
    return  "다이애나의 책장"
  }
  if(this.props.select==="열정에 기름붓기"){
    return "열정에 기름붓기"
  }
  return this.props.select
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
        <div className='tagName'><span>{this.changeName()}</span></div>
        <Image className='BlockImage' rounded
              src={this.props.imgUrl}
              alt={null}/>
      </div>
    )
  }
}
export default Block;

