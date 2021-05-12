import React, { Component, Fragment} from 'react'
import { withRouter } from "react-router-dom";
import axios from 'axios'
import server_url from '../../url.json'
import TasteBlock from './TasteBlock'
import NewTagModal from './NewTagModal.js';
import bookstagram from '../../img/bookstagram.jpeg'
import booktalk from '../../img/booktalk.png'
import bookclub from '../../img/bookclub.png'
import fund from '../../img/fund.jpeg'
import self from '../../img/self.png'
import economy from '../../img/economy.png'
import tech from '../../img/tech.png'
import heart from '../../img/heart.png'
import relationship from '../../img/relationship.png'
import philosophy from '../../img/phy.png'
import novel from  '../../img/novel.png'
import phycology from '../../img/phycho.png'
import fantasy from '../../img/fantasy.png'
import thrill from '../../img/thrill.jpeg'
import history from '../../img/History.png'


class TasteBoard extends Component {
	state = {
		taste: [
				'북스타그램',
				'북토크',
				'독서모임',
				'재테크',
				'자기계발',
				'경영경제',
				'TECH',
				'인간관계',
				'소설',
				'철학',
				'심리',
				'로맨스',
				'판타지',
				'스릴러',
				'역사'
		],
		tasteImgUrl: {
				'북스타그램': bookstagram,
				'북토크': booktalk,
				'독서모임': bookclub,
				'재테크': fund,
				'자기계발': self,
				'경영경제': economy,
				'TECH': tech,
				'인간관계': relationship,
				'소설': novel,
				'철학':  philosophy,
				'심리' : phycology,
				'로맨스' : heart,
				'판타지' : fantasy,
				'스릴러' : thrill,
				'역사' : history
		},
		newTagUnUsing: [],
		defaultTagUsing: [],
		newTagUsing: [],
		isOktoUse: false,
		confirmUN: false,
		show: false,
		getCompleted : false
	}

	_collectSellection = e => {
		console.log('TasteBoard.js > _collectSellection 함수 : 이게 받아온 아이디 값이여 ===> ', e)
		let isNewTagorNot = this.state.taste.indexOf(e)
		console.log("이게 뭘까?",e)
		if (isNewTagorNot === -1 ) {
			const removingArray= this.state.newTagUnUsing
			const removingIndex= this.state.newTagUnUsing.indexOf(e);
			removingArray.splice(removingIndex,1)

			this.setState({newTagUsing: [...this.state.newTagUsing, e], newTagUnUsing: removingArray})
		} else {
			console.log("delfaultTag?", [...this.state.defaultTagUsing, e])
			this.setState({defaultTagUsing: [...this.state.defaultTagUsing, e]})
		}
		// console.log('TasteBoard.js > _collectSellection 함수에서 this.state.selected___', this.state.selected)
		// console.log('TasteBoard.js > _collectSellection 함수에서 this.state.newTagselected', this.state.newTagSelected)
	}

	_deleteSellection = (e) => {

		let isInOrNot = this.state.taste.includes(e)
		console.log(isInOrNot)
		if (!isInOrNot) {
			let removingArray = this.state.newTagUsing
			let removingIndex = this.state.newTagUsing.indexOf(e)
			removingArray.splice(removingIndex, 1)
			
			let puttingArray = this.state.newTagUnUsing
			puttingArray.push(e)

			this.setState({
					newTagUsing: removingArray, newTagUnUsing: puttingArray
			})
		} else {
			let array = this.state.defaultTagUsing
			let index = this.state.defaultTagUsing.indexOf(e)
			console.log(array,"지우는 인덱스",index)
			array.splice(index, 1)
			this.setState({
					defaultTagUsing: array
			})
		}
		// console.log('TasteBoard.js > _deleteSellection 함수에서 this.state.selected___', this.state.selected)
		// console.log('TasteBoard.js > _deleteSellection 함수에서 this.state.newTagselected___', this.state.newTagselected)
	}

	_getselectedTags = async()=>{
		const token = window.localStorage.getItem('token')
	
		const selectedTags = await axios.get(`https://${server_url}/api/user/getpreference`, {
			headers: {Authorization: `bearer ${token}`}
		})
		console.log("그래서 어떤 결과?", selectedTags.data)
		let usingTag = selectedTags.data.usingPreference;
		let unusingTag = selectedTags.data.unusingPreference;
		console.log("사용 태그", selectedTags.data.usingPreference, "사용하지 않는 태그", selectedTags.data.unusingPreference);	
		
		let newTagUsing = [];
		let defaultTagUsing =[];  	
		let newTagUnUsing= [];

		let defaultTags= this.state.taste;
		for(let element of usingTag){
			console.log("usingTag",element.id);
			if(defaultTags.includes(element)){
				newTagUsing.push(element.tagName);	
			} else {
				defaultTagUsing.push(element.tagName);
			}
		}
		for(let element of unusingTag){
			if(defaultTags.includes(element)){
				newTagUnUsing.push(element.tagName)	
			}
		}
		this.setState({defaultTagUsing, newTagUsing, 	newTagUnUsing ,getCompleted: true})
	}

	_preferenceOffline = async()=>{

	}

	_addTaste = async(newTaste) => {
		console.log('TasteBoard.js > _addTaste함수 에서 parameter로 받는 newTaste ====>  ', newTaste)

		const wholeTastes = this.state.taste.concat(this.state.newTagUnUsing).concat(this.state.newTagUsing);
		if(wholeTastes.includes(newTaste)){
			alert("이미 있는 취향입니다.");
			return;
		}

		let token = window.localStorage.getItem('token');
		let newPreference = {newPreference: newTaste}
		/* let defaultTaste = {defaultTags: this.state.selected} */
			const res_postNewPref = await axios.post (`https://${server_url}/api/user/preferenceAdd`, newPreference, {
					headers: {Authorization: `bearer ${token}`}
			})
			console.log('_submitTasteNUserName 함수에서 axios.post(newPreference) 후 res_postNewPref ____', res_postNewPref)
		
		await this.setState({
			newTagUnUsing: [...this.state.newTagUnUsing, newTaste]
		})
	}
    

	_renderTasteBlock = () => {
		// console.log("안쓰는 취향", this.state.newTagUnUsing , "쓰는 취향" , this.state.newTagUsing); 
		let newTagsObject = {};
		if(this.state.newTagUnUsing.length>0){
			this.state.newTagUnUsing.forEach((element)=>{ newTagsObject[element]=null})
		}
		if(this.state.newTagUsing.length>0){
			this.state.newTagUsing.forEach((element)=>{ newTagsObject[element]=null});
		}
		console.log("뿌려지는데?", this.state.tasteImgUrl, newTagsObject)
		const wholeTaste = Object.assign(this.state.tasteImgUrl, newTagsObject)
		const tasteblocks = Object.keys(wholeTaste).map((key, index) => {
			let alreadyClicked	
			if(this.state.defaultTagUsing.includes(key)|| this.state.newTagUsing.includes(key)){
				alreadyClicked=true	
			}	else {
				alreadyClicked=false
			}
			return <TasteBlock select = {key} key = {index} collect = {this._collectSellection} imgUrl={wholeTaste[key]}
			delete = {this._deleteSellection} already={alreadyClicked}/>
		})
		return tasteblocks
	}                                                   


	_submitTaste = async() => {
		let token = window.localStorage.getItem('token')
		let defaultTagUnusing = [];
		let defaultTag = this.state.taste;
		let defaultTagUsing = this.state.defaultTagUsing;
		console.log("쓰는 기본 tag", defaultTagUsing);
		for(let element of defaultTag){
			if(!defaultTagUsing.includes(element)){
				defaultTagUnusing.push(element);
			}
		}
		console.log("안쓰는 기본 tag");
		let customNUser = {
			usingPreference : this.state.defaultTagUsing.concat(this.state.newTagUsing),
			unusingPreference: this.state.newTagUnUsing.concat(defaultTagUnusing)
		}
    console.log("보내는 TAGS!-----", customNUser)
		const res_postPref = await axios.post (`https://${server_url}/api/user/preference`, customNUser, {
			headers: {Authorization: `bearer ${token}`}
		})
		console.log('_submitTasteNUserName 함수에서  axios.post(preference) 후 res_postPref ___', res_postPref)
		return res_postPref;
	}
  
	_handleSubmit = async () => {
		console.log("newTagSelected",this.state.newTagUsing)

			const result = await this._submitTaste()
			window.localStorage.removeItem("previousInfo");
			console.log("result",result);	
			this._gotoMain(result);
	}

	_gotoMain = (r) => {
		if (r) {
			window.location.href="/main";
		}
	}
    
	_handleHide = () => {
			this.setState({show: false})
	}
      
	_handleShow = () => {
			this.setState({show: true})
	}

	_handleButtonFontColor = () => {
		if (this.state.confirmUN) {
			return 'black'
		}
	}


	componentDidMount(){
		this._getselectedTags()
	}


  render() {
		if(!this.state.getCompleted){
			return null 
		} else {
			console.log('state현황' , this.state.defaultTagUsing, this.state.newTagUnUsing, this.state.newTagUsing);
			return (
				<Fragment>
						<div className = 'WelcomeUser'>
						<div className='userNamePart'>
								<span className = 'welcomeMesssage'>마음에 드는 관심사를 선택해 주세요. (3개이상) <br/><br/>혹시 원하는 관심사가 없다면? <br/><br/>태그생성으로 만들어주세요!</span>
						</div>
						{/* <div className="btnTagAlign">
							<button className = 'pref'>리뷰</button>
							<button className = 'genre'>행사</button>
						</div> */}
						<div className="btnTagCommand">
							<button className = 'createNewTag' onClick={this._handleShow} bssize="large">태그생성</button>
							<button className = 'selectComplete' onClick={this._handleSubmit}>선택완료</button>
						</div>
					</div>
					<div className = 'TasteBoard'>
						{/* <div className = 'blockContainer'> */}
						{this._renderTasteBlock()}
					</div>
					<NewTagModal show={this.state.show} hide={this._handleHide} callback={this._addTaste}/>
				</Fragment>
	
			)
		}
		
  }
}
export default withRouter(TasteBoard)