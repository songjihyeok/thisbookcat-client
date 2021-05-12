import React, {Component} from "react"
import { Link } from 'react-router-dom';
import server_url from '../../url.json'
import {Image} from 'react-bootstrap'
import { Icon } from "semantic-ui-react";
import axios from 'axios'

class MyBookBoard extends Component {
	state = {
		liked: this.props.isUserLike,
		likeCount: this.props.likeCount
	}

	token = window.localStorage.getItem('token')

	_handleLike = () => {
		if(!this.props.userName){
			alert("유져네임을 설정해주세요")
		}
		if(this.state.liked) {
			axios.delete(`https://${server_url}/api/like/${this.props.postid}`, {
				headers: {Authorization: `bearer ${this.token}`}})
			.then(response => {
				// console.log(response)
				this.setState({
						liked: false,
						likeCount: this.state.likeCount-1
				})
				/*  console.log('liked should change', this.state.liked) */
			})
			.catch(error => console.log(error))
		} else {
				axios.post(`https://${server_url}/api/like/${this.props.postid}`, {}, {
					headers: {Authorization: `bearer ${this.token}`}
				})
				.then(response => {
						// console.log(response)
					this.setState({
							liked: true,
							likeCount: this.state.likeCount+1
					})
						/* console.log('liked should change', this.state.liked) */
				})
				.catch(error => console.log(error))
		}
	}

	handleImage =()=>{

		if(this.props.image==='' &&this.props.bookData!=='null'){
			let parsedBookData = JSON.parse(this.props.bookData);
			let postImage = parsedBookData.cover;
			return postImage 
		}  
		return `https://s3.ap-northeast-2.amazonaws.com/www.afteread.image/${this.props.image}`
	}	






	render() {
		return (
			<div className='bookBoard'>
				{/*  {console.log('BookBoard component에서 this.props 찍는중', this.props)} */}
				<div className='imageContainer'>
					<Link to={{pathname : `/postdetail/${this.props.postid}`}}>
						<Image src={this.handleImage()} alt='bookcover'/*  width={300} */ height={240}/>
					</Link>
					<div className='likeBar'>
						{(this.state.liked)
						? <span className='likeIconBar'><Icon name="heart" size="large"/>{this.state.likeCount}</span>
						: <span className='likeIconBar'><Icon name="heart outline" size="large"/>{this.state.likeCount}</span>
						}
					</div>
				</div>
				<p className='postTitle'>{this.props.title}</p>
			</div>
		)
  }
}

export default MyBookBoard;



			/* <span className='confirmedUser'> */
						/* <form className = 'userNameWrapper'>
							<input type='text' className="getUserName" onChange={this._setUserName}></input>
							<button className = 'selectUserName'
											style={{backgroundColor : this.state.userName === '' ? '#c7c7c7' : '#3376ff'}}
											onClick={this.state.confirmUN ? this.alreadychecked : this._checkUserName}>중복확인</button>
						</form> 님,
						</span> */

				

						