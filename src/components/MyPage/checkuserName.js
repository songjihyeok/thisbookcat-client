_setUserName = () => {
  const inputData = document.getElementsByClassName('getUserName')[0].value
  // console.log('TasteBoard.js > _setUserName 함수에서 inputData___', inputData)
  this.setState ({userName:inputData})
  // console.log('TasteBoard.js > _setUserName 함수에서 this.state.userName___', this.state.userName)
}
  
  _checkUserName = (e) => {
    e.preventDefault();
    const username = this.state.userName;
    const token = window.localStorage.getItem('token')
    // console.log('TasteBoard.js > _setUserName 함수에서 inputData___', username)
    if (username === '') {
      alert('유저네임을 입력하셔야 합니다!')
    } else {
      axios.post (`https://${server_url}/api/user/checkuserName`, {
        userName: username}, {
        headers: {Authorization: `bearer ${token}`}
      })
      .then(res => {
        if (res.status === 200) {
          alert('사용가능한 유저이름입니다!')
          this.setState({isOktoUse: true})
          if (window.confirm(`${this.state.userName}을(를) 유저네임으로 사용하시겠습니까?`)) {
            this.setState({confirmUN: true})
                      }
                      else {
                          return
                      }
                  }
              })
              .catch(err => {
                  alert('이미 사용중인 유저이름입니다.')
                  this.setState({isOktoUse: false})
              })
          }
      }

      alreadychecked = (e) =>{
        e.preventDefault();
        alert("이미 중복검사 완료한 상태입니다.")
      }