import React, {Component} from "react"
import { Link } from 'react-router-dom'
import {Image} from 'react-bootstrap'
import { Icon } from "semantic-ui-react";
import server_url from '../../url.json'
import axios from 'axios'

class BookBoard extends Component {

	state = {
			liked: false,
			likeCount: this.props.likecount
	} 

	token = window.localStorage.getItem('token')

	componentDidMount () {
			this._getLikeData()
	}

	_getLikeData = () => {
		axios.get(`https://${server_url}/api/like/${this.props.postid}`, {
			headers: {Authorization: `bearer ${this.token}`}
		})
		.then(response => {
			this.setState({liked: response.data[0][0][1]})
			//   console.log('liked', this.state.liked)
		})
		.catch(error => console.log(error))
	}


	_handleLike = () => {
		if(this.props.userName===''){
			alert("유져네임을 설정해주세요")
			return;
		}

		if (this.state.liked) {
			axios.delete(`https://${server_url}/api/like/${this.props.postid}`, {
				headers: {Authorization: `bearer ${this.token}`}
			})
			.then(response => {
					// console.log(response)
				this.setState({
					liked:false,
					likeCount: this.state.likeCount-1
				})
				// console.log('liked should change', this.state.liked)
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
				// console.log('liked should change', this.state.liked)
			})
			.catch(error => console.log(error))
		}
	}

	/* _changeHeart = () => {
			this.state.liked?this.setState({liked:false}):this.setState({liked:true})
	} */

	/* _handleClick =  () => {
			this._handleLike()
	} */

	handleImage =()=>{
		if(this.props.url===''&&this.props.bookData!=='null'){
			let parsedBookData = JSON.parse(this.props.bookData);
			let postImage = parsedBookData.cover;
			return postImage 
		} 
		return `https://${server_url}/upload/${this.props.url}`	
	}	

	render(){
		return(
				<div className ='bookBoard'>
					<div className='imageContainer'>
						<Link to={{ pathname : `/postdetail/${this.props.postid}` }}>
							<Image className = 'mainThumbNail' alt='bookcover' /* width={240} height={240} */
										src = {this.handleImage()}/>
						</Link>
						<div className='likeBar'>
							{this.state.liked
							? <div><Icon name='heart' size="large" onClick={this._handleLike}/>{this.state.likeCount}</div>
							: <div><Icon name='heart outline' size="large" onClick={this._handleLike}/>{this.state.likeCount}</div>
							}
						</div>
					</div>
					<p className='postTitle'>{this.props.title}</p>
				</div>
		)
	}
}

export default BookBoard;
