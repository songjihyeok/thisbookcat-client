import React, {Component} from "react"
import { Link } from 'react-router-dom';
import server_url from '../../url.json';
import {Icon} from 'semantic-ui-react'
import axios from 'axios'
import Image from 'react-image-resizer'

class LikeBookBoard extends Component {

	state = {
		liked: true,
		likeCount: this.props.likePost.likeCount
	}
    
	_handleLike = () => {
		let token = window.localStorage.getItem('token')
		if (this.state.liked) {
			axios.delete(`http://${server_url}:3000/api/like/${this.props.likePost.id}`, {
				headers:{Authorization: `bearer ${token}`}})
			.then(response => {
					// console.log(response)
				this.setState({
						liked: false,
						likeCount: this.state.likeCount-1
				})
					// console.log('liked should change', this.state.liked)
			})
			.catch(error => console.log(error))
		} else {
			axios.post(`http://${server_url}:3000/api/like/${this.props.likePost.id}`, {},{
				headers:{Authorization: `bearer ${token}`}})
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

	render() {
		// console.log("LikeBookBoard.js 컴포 > render 함수 안 콘솔 찍는 중 this.props.likePost___", this.props.likePost)
		return (
			<div className ='LikeBookBoard'>
				<Link to={{pathname : `/postdetail/${this.props.postid}`,}}>
				{/*state : {
				     imgUrl : `https://picsum.photos/300/300?image=${this.props.url}`,
				     username : this.props.author
				 }  */}
					<Image className = 'likeThumbnail' alt='bookcover' width={240} height={240}
								src = {`http://${server_url}:3000/upload/${this.props.likePost.mainImage}`}/>
				</Link>
				{(this.state.liked)
				? <span><Icon name='heart' size="large" onClick={this._handleLike}/>X{this.state.likeCount}</span>
				: <span><Icon name='heart outline' size="large" onClick={this._handleLike}/>X{this.state.likeCount}</span>
				}
				<span>{this.props.likePost.title}</span>
			</div>
		)
	}
}

export default LikeBookBoard;