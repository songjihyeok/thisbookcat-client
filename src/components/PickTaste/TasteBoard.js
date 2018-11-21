import React, { Component} from 'react'
import {Button} from 'react-bootstrap'
/* import {Link} from 'react-router-dom' */
import { withRouter } from "react-router-dom";
import axios from 'axios'
import server_url from '../../url.json'

import './CSS/PickTaste.css'


import TasteBlock from './TasteBlock'
import NewTagModal from './NewTagModal.js';

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
            '영화'
        ],

        newTaste: [],

        userName: '',

        selected: [],

        newTagSelected: [],

        isOktoUse: false,

        confirmUN: false,

        show: false
    }

    _collectSellection = (e) => {

        console.log(e)

        let isInOrNot = this.state.taste.indexOf(e)

        if(isInOrNot===-1) {
            this.setState({
                newTagSelected: [...this.state.newTagSelected, e]
            })
        } else {
            this.setState({
                selected: [...this.state.selected, e]
            })
        }

        console.log('TasteBoard.js > _collectSellection 함수에서 this.state.selected___', this.state.selected)
        console.log('TasteBoard.js > _collectSellection 함수에서 this.state.newTagselected', this.state.newTagSelected)
    }

    _deleteSellection = (e) => {

        console.log(e)

        let isInOrNot = this.state.taste.indexOf(e)

        if(isInOrNot===-1) {
            let array = this.state.newTagSelected
            let index = this.state.newTagSelected.indexOf(e)
            console.log('이게 인덱스 값이여',index)
            array.splice(index,1)
            this.setState({
                newTagselected: array
            })
        } else {
            let array = this.state.selected
            let index = this.state.selected.indexOf(e)
            array.splice(index,1)
            this.setState({
                selected: array
            })
        }
        console.log('TasteBoard.js > _deleteSellection 함수에서 this.state.selected___', this.state.selected)
        console.log('TasteBoard.js > _deleteSellection 함수에서 this.state.newTagselected___', this.state.newTagselected)
    }

    _addTaste = (newTaste) => {

        this.setState({
            newTaste: [...this.state.newTaste, newTaste]
        })
        console.log('TasteBoard.js > _collectSellection 함수에서 this.state.selected___', this.state.selected)
    }
    
    _gotoMain = () => {

        console.log('there should be history in here', this.props)

        this.props.history.push('/main')
    }

    _renderTasteBlock = () => {

        const wholeTaste = this.state.taste.concat(this.state.newTaste)

        const tasteblocks = wholeTaste.map((select, index) => {
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

    _checkUserName = () => {

        const username = this.state.userName;

        const token = window.localStorage.getItem('token')

        console.log('TasteBoard.js > _setUserName 함수에서 inputData___', username)

        if(username==='') {
            alert('유저네임을 입력하셔야 합니다!')
        } else {
            axios.post (`http://${server_url}:3000/api/user/checkuserName`, {userName: username}, {
            headers: {Authorization: `bearer ${token}`}
        })
        .then(res => {
            if(res.status===200) {
                alert('사용가능한 유저이름입니다!')
                this.setState({
                    isOktoUse: true
                })
                if(window.confirm(`${this.state.userName}을(를) 유저네임으로 사용하시겠습니까?`)) {
                    this.setState({
                        confirmUN: true
                    })
                }
                else {
                    return
                }
            }
        })
        .catch(err => {
            alert('이미 사용중인 유저이름입니다.')
            this.setState({
                isOktoUse: false
            })
        })
    }
}

    _submitTasteNUserName = async() => {

        let token = window.localStorage.getItem('token')

        let customNUser = {
            preference : this.state.selected.concat(this.state.newTagSelected),
            userName: this.state.userName
        }

        let newPreference = {
            newPreference: this.state.newTagSelected
        }

        /* let defaultTaste = {
            defaultTags: this.state.selected
        } */
            if(newPreference.length>0){
            const addResult = await axios.post (`http://${server_url}:3000/api/user/preferenceAdd`, newPreference, {
            headers: {Authorization: `bearer ${token}`}
            })
            }
            console.log("보내는 TAGS!-----", customNUser)
            const result = await axios.post (`http://${server_url}:3000/api/user/preference`, customNUser, {
                headers: {Authorization: `bearer ${token}`}
            }) 
        return result
    }
    //TODO: 이렇게 하면, await 함수 차례대로 실행되지 않나?

    _handleSubmit = async () => {

        if(this.state.userName==='') {
            alert('유저네임을 입력하셔야 합니다!')
        }
        else if(this.state.isOktoUse===false) {
            alert('중복검사를 하셔야합니다')
        }
        else if ((this.state.selected.length + this.state.newTagSelected.length)<3) {
            alert('취향을 3개이상 고르셔야합니다!')
        }
        else if (this.state.userName&&this.state.isOktoUse&&this.state.selected.length>=3){
            const result = await this._submitTasteNUserName()
            if(result){
            await this._gotoMain()
            }    
        }
    }

    _handleHide = () => {
        this.setState({ show: false })
    }
      
    _handleShow = () => {
        this.setState({ show: true })
    }

  render() {
      console.log('render함수에서 this.state.userName___' , this.state.userName)
    return (
      <div className = 'TasteBoard'>
      <div className = 'WelcomeUser'>
      <input type='text' className="getUserName" onChange={this._setUserName} readOnly={this.state.confirmUN}></input>님 마음에 드는 책 종류를 선택해 주세요. (3개이상)
      <Button className = 'selectUserName' onClick={this.state.confirmUN?null:this._checkUserName}>중복검사</Button>
      <Button className = 'createNewTag' onClick={this._handleShow}>태그생성</Button>
      </div>
      <div className = 'blockContainer'>
      {this._renderTasteBlock()}
      </div>
    <Button className = 'selectComplete' onClick={this._handleSubmit}>선택완료</Button>
    <NewTagModal
          show={this.state.show}
          hide={this._handleHide}
          callback={this._addTaste}
        />
      </div>
    )
  }
}

export default withRouter(TasteBoard)
