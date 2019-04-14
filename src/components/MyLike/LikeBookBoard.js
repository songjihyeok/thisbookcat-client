import React, {Component} from "react"
import { Link } from 'react-router-dom';
import server_url from '../../url.json';
import {Icon} from 'semantic-ui-react'
import axios from 'axios'

class LikeBookBoard extends Component {

	state = {
		liked: true,
		likeCount: this.props.likePost.likeCount
	}
    
	// _handleLike = () => {
	// 	let token = window.localStorage.getItem('token')
	// 	if (this.state.liked) {
	// 		axios.delete(`https://${server_url}/api/like/${this.props.likePost.id}`, {
	// 			headers:{Authorization: `bearer ${token}`}})
	// 		.then(response => {
	// 			this.setState({
	// 					liked: false,
	// 					likeCount: this.state.likeCount-1
	// 			})
	// 		})
	// 		.catch(error => console.log(error))
	// 	} else {
	// 		axios.post(`https://${server_url}/api/like/${this.props.likePost.id}`,{},{
	// 			headers:{Authorization: `bearer ${token}`}})
	// 		.then(response => {
	// 			this.setState({
	// 					liked: true,
	// 					likeCount: this.state.likeCount+1
	// 			})
	// 		})
	// 		.catch(error => console.log(error))
	// 	}
	// }
	handleImage=()=>{
		if(this.props.likePost.mainImage===''){
			let parsedBookData = JSON.parse(this.props.bookData);
			let postImage = parsedBookData.cover;
			console.log( "url 바뀌었나",postImage);
			return postImage 
		} 
		return `https://${server_url}/upload/${this.props.likePost.mainImage}`
	}	



	render() {
		return (
			<div className ='bookBoard'>
				<div className='imageContainer'>
					<Link to={{pathname : `/postdetail/${this.props.postid}`,}}>
						<img className = 'likeThumbnail' alt='bookcover'
									src = {this.handleImage()}/>
					</Link>
					<div className='likeBar'>
						{(this.state.liked)
						? <span><Icon name='heart' size="large" />{this.state.likeCount}</span>
						: <span><Icon name='heart outline' size="large" />{this.state.likeCount}</span>
						}
					</div>
				</div>
					<p className='postTitle'>{this.props.likePost.title}</p>
			</div>
		)
	}
}

export default LikeBookBoard;