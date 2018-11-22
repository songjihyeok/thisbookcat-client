import React, { Component, Fragment } from 'react'
/* import {Button, ButtonGroup} from 'react-bootstrap' */
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
		tasteImgUrl: {
				'만화':'https://i-h1.pinimg.com/564x/7a/29/a8/7a29a8f6592b0436c1cb278c07d615c6.jpg',
				'취업':'https://techcrunch.com/wp-content/uploads/2015/06/interviews-e1433244493315.jpg?w=1390&crop=1',
				'심리':'https://www.dynamicbusiness.com.au/wp-content/uploads/2015/06/psychology.jpg',
				'우울':'https://lh3.googleusercontent.com/ostgNb0oXveZvjpeikfjjvpQAmezaDrCfXtC_4zBCNlTA_156nGVHoTrpI2yIEi8YV4dDPYbCGoVNyhI6Y77tw=s750',
				'스타트업':'https://www.businessmentors.org.nz/BMNZWeb/media/websiteimages/refresh%20images/startup-hero_1.png',
				'힐링':'http://mutualflourishing.org/wp-content/uploads/2015/10/Dollarphotoclub_55022145.jpg',
				'여행':'https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/01/11/13/travel-hiking-app.jpg?w968h681',
				'블록체인':'https://cdn-images-1.medium.com/max/1600/1*3hyWN8UhcrL7P0Opbu7IQg.jpeg',
				'스트레스':'https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA5NC84MzMvb3JpZ2luYWwvc3RyZXNzLXNjcmVhbS5qcGc=',
				'pc게임':'https://cdn.mos.cms.futurecdn.net/p5xpJzmH4NSNFvSbxbFLEP.jpg',
				'영화': 'https://cdn20.patchcdn.com/users/22924509/20180619/041753/styles/T800x600/public/processed_images/jag_cz_movie_theater_retro_shutterstock_594132752-1529438777-6045.jpg'
		},
		tasteImgUrl2: [
				'https://i-h1.pinimg.com/564x/7a/29/a8/7a29a8f6592b0436c1cb278c07d615c6.jpg',
				'https://techcrunch.com/wp-content/uploads/2015/06/interviews-e1433244493315.jpg?w=1390&crop=1',
				'https://www.dynamicbusiness.com.au/wp-content/uploads/2015/06/psychology.jpg',
				'https://lh3.googleusercontent.com/ostgNb0oXveZvjpeikfjjvpQAmezaDrCfXtC_4zBCNlTA_156nGVHoTrpI2yIEi8YV4dDPYbCGoVNyhI6Y77tw=s750',
				'https://www.businessmentors.org.nz/BMNZWeb/media/websiteimages/refresh%20images/startup-hero_1.png',
				'http://mutualflourishing.org/wp-content/uploads/2015/10/Dollarphotoclub_55022145.jpg',
				'https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/01/11/13/travel-hiking-app.jpg?w968h681',
				'https://cdn-images-1.medium.com/max/1600/1*3hyWN8UhcrL7P0Opbu7IQg.jpeg',
				'https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA5NC84MzMvb3JpZ2luYWwvc3RyZXNzLXNjcmVhbS5qcGc=',
				'https://cdn.mos.cms.futurecdn.net/p5xpJzmH4NSNFvSbxbFLEP.jpg',
				'https://cdn20.patchcdn.com/users/22924509/20180619/041753/styles/T800x600/public/processed_images/jag_cz_movie_theater_retro_shutterstock_594132752-1529438777-6045.jpg'
		],
		newTaste: {},
		userName: '',
		selected: [],
		newTagSelected: [],
		isOktoUse: false,
		confirmUN: false,
		show: false
	}

	_collectSellection = e => {
		console.log('TasteBoard.js > _collectSellection 함수 : 이게 받아온 아이디 값이여 ===> ', e)
		let isInOrNot = this.state.taste.indexOf(e)
		if (isInOrNot === -1) {
			this.setState({newTagSelected: [...this.state.newTagSelected, e]})
		} else {
			this.setState({selected: [...this.state.selected, e]})
		}
		// console.log('TasteBoard.js > _collectSellection 함수에서 this.state.selected___', this.state.selected)
		// console.log('TasteBoard.js > _collectSellection 함수에서 this.state.newTagselected', this.state.newTagSelected)
	}

	_deleteSellection = (e) => {
		let isInOrNot = this.state.taste.indexOf(e)
		if (isInOrNot === -1) {
			let array = this.state.newTagSelected
			let index = this.state.newTagSelected.indexOf(e)
			array.splice(index, 1)
			this.setState({
					newTagselected: array
			})
		} else {
			let array = this.state.selected
			let index = this.state.selected.indexOf(e)
			array.splice(index, 1)
			this.setState({
					selected: array
			})
		}
		// console.log('TasteBoard.js > _deleteSellection 함수에서 this.state.selected___', this.state.selected)
		// console.log('TasteBoard.js > _deleteSellection 함수에서 this.state.newTagselected___', this.state.newTagselected)
	}

	_addTaste = (newTaste) => {
		console.log('TasteBoard.js > _addTaste함수 에서 parameter로 받는 newTaste ====>  ', newTaste)
		const addCustomTaste = (customTaste) => {
			let result = this.state.newTaste
			result[customTaste] = 1
			return result
		}
		this.setState({
			newTaste: addCustomTaste(newTaste)
		})
		console.log('TasteBoard.js > _addTaste 함수에서 this.state.newTaste___', this.state.newTaste)
	}
    
	_gotoMain = (r) => {
      //나는 여기에 parameter 받아서, 있으면, 으로 처리했는데, 지혁님 코드가 나은듯;
			// console.log('there should be history in here', this.props)
		if (r) {
			this.props.history.push('/')
		}
	}
  
	_renderTasteBlock = () => {
		const wholeTaste = Object.assign(this.state.tasteImgUrl,this.state.newTaste)
		const tasteblocks = Object.keys(wholeTaste).map((key, index) => {
			return <TasteBlock select = {key} key = {index} collect = {this._collectSellection} imgUrl={wholeTaste[key]}
												delete = {this._deleteSellection} selectedColor = {this.state.selected}/>
		})
		return tasteblocks
	}                                                   

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
				axios.post (`http://${server_url}:3000/api/user/checkuserName`, {
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

	_submitTasteNUserName = async() => {
		let token = window.localStorage.getItem('token')
		let customNUser = {
			preference : this.state.selected.concat(this.state.newTagSelected),
			userName: this.state.userName
		}
		let newPreference = {newPreference: this.state.newTagSelected}
		/* let defaultTaste = {defaultTags: this.state.selected} */
		if (this.state.newTagSelected.length > 0) {
			const res_postNewPref = await axios.post (`http://${server_url}:3000/api/user/preferenceAdd`, newPreference, {
					headers: {Authorization: `bearer ${token}`}
			})
			console.log('_submitTasteNUserName 함수에서 axios.post(newPreference) 후 res_postNewPref ____', res_postNewPref)
		}
    console.log("보내는 TAGS!-----", customNUser)
		const res_postPref = await axios.post (`http://${server_url}:3000/api/user/preference`, customNUser, {
			headers: {Authorization: `bearer ${token}`}
		})
		console.log('_submitTasteNUserName 함수에서  axios.post(preference) 후 res_postPref ___', res_postPref)
		return res_postPref;
	}
  
	_handleSubmit = async () => {
		console.log("newTagSelected",this.state.newTagSelected)
		if(this.state.userName === '') {
			alert('유저네임을 입력하셔야 합니다!')
		} else if (this.state.isOktoUse === false) {
			alert('중복된 유저네임 입니다!')
		} else if (this.state.selected.length+this.state.newTagSelected < 3) {
			alert('취향을 3개이상 고르셔야합니다!')
		} else if (this.state.userName && this.state.isOktoUse && this.state.selected.length >= 3) {
			const res_submitTaste = await this._submitTasteNUserName()
			await this._gotoMain(res_submitTaste)
      const result = await this._submitTasteNUserName()
      if (result) {
        await this._gotoMain()
       }   
		}
	}
    
	_handleHide = () => {
			this.setState({show: false})
	}
      
	_handleShow = () => {
			this.setState({show: true})
	}

    /* _hadelUserName = async () => {

        await this._setUserName()
        await alert('유저네임이 설정 됐습니다.')
    } */

	_handleButtonFontColor = () => {
		if (this.state.confirmUN) {
			return 'black'
		}
	}

	_handleUserNamePart = () => {
		if (this.state.confirmUN) {
			return (
				<div className = 'WelcomeUser'>
					<div className='userNamePart'>
						<span className='confirmedUser'>{this.state.userName}</span>
						<span className = 'welcomeMesssage'>, 님 마음에 드는 책 종류를 선택해 주세요. (3개이상)</span>
					</div>
					<button className='pref'>관심</button>
					<button className='genre'>장르</button>
					<button className = 'createNewTag' onClick={this._handleShow} bssize="large">태그생성</button>
					<button className = 'selectComplete' onClick={this._handleSubmit}>선택완료</button><br/>
				</div>
			)
		} else {
			return (
				<div className = 'WelcomeUser'>
					<div className='userNamePart'>
						<form className = 'userNameWrapper'>
							<input type='text' className="getUserName" onChange={this._setUserName}></input>
							<button className = 'selectUserName'
											style={{backgroundColor : this.state.userName === '' ? '#c7c7c7' : '#3376ff'}}
											onClick={this.state.confirmUN ? null : this._checkUserName}>중복확인</button>
						</form>
						<span className = 'welcomeMesssage'>, 님 마음에 드는 책 종류를 선택해 주세요. (3개이상)</span>
					</div>
					<button className = 'pref'>관심</button>
					<button className = 'genre'>장르</button>
					<button className = 'createNewTag' onClick={this._handleShow} bssize="large">태그생성</button>
					<button className = 'selectComplete' onClick={this._handleSubmit}>선택완료</button><br/>
				</div>
			)
		}
	}

  render() {
    //   console.log('render함수에서 this.state.userName___' , this.state.userName)
    return (
			<Fragment>
				{this._handleUserNamePart()}
				<div className = 'TasteBoard'>
					{/* <div className = 'blockContainer'> */}
					{this._renderTasteBlock()}
				</div>
				<NewTagModal show={this.state.show} hide={this._handleHide} callback={this._addTaste}/>
			</Fragment>

    )
  }
}
export default withRouter(TasteBoard)