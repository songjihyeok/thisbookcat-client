import React, {Component} from "react";
import axios from 'axios';
import server_url from '../../url.json'

 class UserName extends Component {

  state={
    userName : this.props.beforeUserName,
    isOktoUse: false,
    confirmUN : false 
  }

  _setUserName = () => {
    const inputData = document.getElementsByClassName('getUserName')[0].value
    // console.log('TasteBoard.js > _setUserName 함수에서 inputData___', inputData)
    this.setState ({userName:inputData})
    // console.log('TasteBoard.js > _setUserName 함수에서 this.state.userName___', this.state.userName)
  }
  
  _checkUserName = (e) => {
    e.preventDefault();
    const userName = this.state.userName;
    const token = window.localStorage.getItem('token')
    // console.log('TasteBoard.js > _setUserName 함수에서 inputData___', username)
    if (userName === '') {
      alert('유저네임을 입력하셔야 합니다!')
    } else {
      axios.post (`https://${server_url}/api/user/checkuserName`, {
        userName: userName}, {
        headers: {Authorization: `bearer ${token}`}
      })
      .then(res => {
        if (res.status === 200) {
          alert('사용가능한 유저이름입니다!')
            this.setState({isOktoUse: true})
          if (window.confirm(`${this.state.userName}을(를) 유저네임으로 사용하시겠습니까?`)) {
            this.setState({confirmUN: true})
            this.props.checked(this.state.userName)
          } else {
          return
          }
        }
      })
      .catch(err => {
        alert('이미 사용중인 유저이름입니다.')
      })
    }
  }

  alreadychecked = (e) =>{
    e.preventDefault();
    alert("이미 중복검사 완료한 상태입니다.")
  }



  render() {

    return (
    <div className='userNamePart'>
    <form className = 'userNameWrapper'>
      <input type='text' value={this.state.userName}className="getUserNameBox" onChange={this._setUserName}></input>
      <button className = 'selectUserName'
              style={{backgroundColor : this.state.userName === '' ? '#c7c7c7' : '#3376ff'}}
              onClick={this.state.confirmUN ? this.alreadychecked : this._checkUserName}>중복확인</button>
    </form>
    </div>  
    )
  }
}   

          


export default UserName;