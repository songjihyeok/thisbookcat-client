import React, { Component} from 'react'
import {Button} from 'react-bootstrap'
/* import {Link} from 'react-router-dom' */
import { withRouter } from "react-router-dom";
import axios from 'axios'
import server_url from '../../url.json'

import './CSS/PickTaste.css'


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

        userName: '',

        selected: [],

        customTag: []
    }

    _collectSellection = (taste) => {
        this.setState({
            selected: [...this.state.selected, taste]
        })
        console.log('TasteBoard.js > _collectSellection 함수에서 this.state.selected___', this.state.selected)
    }


    _deleteSellection = (taste) => {

        let array = [...this.state.selected]
        let index = this.state.selected.indexOf(taste)
        array.splice(index,1)
        
        this.setState({
            selected: array
        })

        console.log('TasteBoard.js > _deleteSellection 함수에서 this.state.selected___', this.state.selected)
    }

    _isSelected = () => {
        if(this.state.selected.length<4) {
            alert('취향 또는 장르를 3개이상 고르셔야 합니다.')
            return false
        }
        return true
    }

    _gotoMain = () => {

        console.log('there should be history in here', this.props)

        this.props.history.push('/')
    }

    _renderTasteBlock = () => {
        const tasteblocks = this.state.taste.map((select, index) => {
            return <TasteBlock select = {select} key = {index} collect = {this._collectSellection} delete = {this._deleteSellection} selectedColor = {this.state.selected}/>
        })
        return tasteblocks
    }

    _setUserName = () => {
        
        const inputData = document.getElementsByClassName('getUserName')[0].value

        console.log('TasteBoard.js > _setUserName 함수에서 inputData___', inputData)
        
        this.setState ({

            userName:inputData
        })
        
        console.log('TasteBoard.js > _setUserName 함수에서 this.state.userName___', this.state.userName)
    }

    _submitTasteNUserName = () => {

        let token = window.localStorage.getItem('token')

        let customNUser = {
            preference : this.state.selected,
            userName: this.state.userName
        }

        /* let defaultTaste = {
            defaultTags: this.state.selected
        } */

        axios.post (`http://${server_url}:3000/api/user/preference`, customNUser, {
            headers: {Authorization: `bearer ${token}`}
        })
        .then(res => console.log('_submitTasteNUserName 함수에서  axios.post(preference) 후 res___', res))
        .catch(err => console.log('_submitTasteNUserName 함수에서  axios.post(preference) 후 err___', err))

        // axios.post (`http://${server_url}:3000/api/user/defaultpreference`, defaultTaste, {
        //     headers: {Authorization: `bearer ${token}`}
        // })
        // .then(res => console.log('_submitTasteNUserName 함수에서  axios.post(defaultpreference) 후 res___', res))
        // .catch(err => console.log('_submitTasteNUserName 함수에서  axios.post(defaultpreference) 후 err___', err))
    }
    //TODO: 이렇게 하면, await 함수 차례대로 실행되지 않나?
    
    _handleSubmit = async () => {

        if(this.state.userName==='') {
            alert('유저네임을 입력하셔야 합니다!')
        }
        else if (this.state.selected.length<3) {
            alert('취향을 3개이상 고르셔야합니다!')
        } else {
            await this._submitTasteNUserName()
            await this._gotoMain()
        }
    }

    _hadelUserName = async () => {

        await this._setUserName()
        await alert('유저네임이 설정 됐습니다.')
    }

  render() {
      console.log('render함수에서 this.state.userName___' , this.state.userName)
    return (
      <div className = 'TasteBoard'>
      <div className = 'WelcomeUser'>
      <input type='text' className="getUserName" onChange={this._setUserName}></input>님 마음에 드는 책 종류를 선택해 주세요. (3개이상)
      <Button className = 'selectUserName' /* onClick={this._setUserName} */>중복검사</Button>
      </div>
      <div className = 'blockContainer'>
      {this._renderTasteBlock()}
      </div>
    <Button className = 'selectComplete' onClick={this._handleSubmit}>선택완료</Button>
      </div>
    )
  }
}

export default withRouter(TasteBoard)
