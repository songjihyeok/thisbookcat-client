import React, { Component, Fragment} from 'react'
import { withRouter } from "react-router-dom";
import axios from 'axios'
import server_url from '../../url.json'
import TasteBlock from './TasteBlock'
import NewTagModal from './NewTagModal.js';


class TasteBoard extends Component {
	state = {
		taste: [
				'북스타그램',
				'북토크',
				'독서모임',
				'북이벤트',
				'재테크',
				'자기계발',
				'경영경제',
				'howToWork',
				'TECH',
				'인간관계',
				'소설',
				'에세이',
				'철학',
				'심리',
				'사회',
				'예술문화',
				'로맨스',
				'판타지',
				'스릴러',
				'역사'
		],
		tasteImgUrl: {
				'북스타그램':'https://server.afteread.net/serverimage/bookstagram-1557238212033.jpg',
				'북토크':'https://server.afteread.net/serverimage/booktalk-1557239260732.png',
				'독서모임':'https://server.afteread.net/serverimage/gathering-1557239251666.jpg',
				'북이벤트':'https://server.afteread.net/serverimage/event-1557239208813.png',
				'재테크':'https://server.afteread.net/serverimage/zetech-1557238922801.jpg',
				'자기계발':'https://server.afteread.net/serverimage/selfdevelopment-1557238474329.jpg',
				'경영경제': 'https://server.afteread.net/serverimage/economy-1557238649139.jpg',
				'howToWork' : 'https://server.afteread.net/serverimage/howtowork-1557238881152.jpg',
				'TECH':'https://server.afteread.net/serverimage/tech-1557238904806.jpg',
				'인간관계':'https://server.afteread.net/serverimage/relationship-1557239133929.jpg',
				'소설':'https://server.afteread.net/serverimage/fiction-1557239754514.jpg',
				'에세이':'https://server.afteread.net/serverimage/assay-1557238804287.jpg',
				'철학': 'https://server.afteread.net/serverimage/philosophy-1557238666515.jpg',
				'심리' :'https://server.afteread.net/serverimage/phycology-1557239603948.jpg',
				'사회' : 'https://server.afteread.net/serverimage/society-1557239884121.jpg',
				'예술문화' : 'https://server.afteread.net/serverimage/art-1557239623079.jpg',
				'로맨스' :'https://server.afteread.net/serverimage/romance-1557238768222.jpg',
				'판타지' : 'https://server.afteread.net/serverimage/fantasy-1557238870144.png',
				'스릴러' : "https://server.afteread.net/serverimage/thriller-1557495402840.png",
				'역사' : 'https://server.afteread.net/serverimage/history-1557239615172.jpg'
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