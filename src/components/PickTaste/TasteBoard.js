import React, { Component} from 'react'
import {Button} from 'react-bootstrap'
/* import {NavLink} from 'react-router-dom' */
import axios from 'axios'

import TasteBlock from './TasteBlock'

class TasteBoard extends Component {

    state = {

        taste: [
            '만화',
            '취업',
            '심리',
            '우울',
            '스타트업',
            '힐링',
            '여행',
            '블록체인',
            '스트레스',
            'pc게임',
            '영화',
            '샵'
        ],

        userName:null,

        selected: [],

        customTag: []
    }

    _collectSellection = (taste) => {
        this.setState({
            selected: [...this.state.selected, taste]
        })
        console.log(this.state.selected)
    }


    _deleteSellection = (taste) => {

        let array = [...this.state.selected]
        let index = this.state.selected.indexOf(taste)
        array.splice(index,1)
        
        this.setState({
            selected: array
        })

        console.log(this.state.selected)
    }

    _isSelected = () => {
        if(this.state.selected.length<4) {
            alert('취향 또는 장르를 3개이상 고르셔야 합니다.')
            return false
        }
        return true
    }

    _gotoMain = () => {

        this.props.history.push('/main')
    }

    _renderTasteBlock = () => {
        const tasteblocks = this.state.taste.map((select, index) => {
            return <TasteBlock select = {select} key = {index} collect = {this._collectSellection} delete = {this._deleteSellection} selectedColor = {this.state.selected}/>
        })
        return tasteblocks
    }

    _setUserName = () => {
        
        const inputData = document.getElementsByClassName('getUserName')[0].value

        console.log(inputData)

        this.setState ({
            userName:inputData
        })

        console.log(this.state.userName)
    }

    _submitTasteNUserName = () => {

        let token = window.localStorage.getItem('token')

        let customNUser = {
            preference : this.state.customTag,
            userName: this.state.userName
        }

        let defaultTaste = {
            defaultTags: this.state.selected
        }

        axios.post ('http://ec2-13-209-72-215.ap-northeast-2.compute.amazonaws.com:3000/api/user/preference', customNUser, {
            headers: {Authorization: `bearer ${token}`}
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))

        axios.post ('http://ec2-13-209-72-215.ap-northeast-2.compute.amazonaws.com:3000/api/user/defaultpreference', defaultTaste, {
            headers: {Authorization: `bearer ${token}`}
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    _handleSubmit = async () => {

        await this._setUserName()

        this._submitTasteNUserName()
    }

  render() {
      console.log(this.state.userName)
    return (
      <div className = 'TasteBoard'>
      <div className = 'WelcomeUser'>
      <input type='text' className="getUserName" /* onChange={} */></input>님 마음에 드는 책 종류를 선택해 주세요. (3개이상)
      </div>
      <div className = 'blockContainer'>
      {this._renderTasteBlock()}
      </div>
      <Button className = 'selectComplete' onClick={this._handleSubmit}>선택완료</Button>
      </div>
    )
  }
}

export default TasteBoard 
