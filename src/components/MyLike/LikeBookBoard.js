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
			axios.delete(`https://${server_url}/api/like/${this.props.likePost.id}`, {
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
			axios.post(`https://${server_url}/api/like/${this.props.likePost.id}`,{
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
	/*
  imageSize(){
		var filter = "win16|win32|win64|mac";
		if(navigator.platform){
			var size;
			if(0 > filter.indexOf(navigator.platform.toLowerCase())){
				//mobile
				this.state.width = 240;
			} else{
				//pc
				this.state.width = 240;
			}
		}
	}
	*/

	render() {
		// console.log("LikeBookBoard.js 컴포 > render 함수 안 콘솔 찍는 중 this.props.likePost___", this.props.likePost)
		return (
			<div className ='MyBookBoard'>
				<div className='myImageContainer'>
					<Link to={{pathname : `/postdetail/${this.props.postid}`,}}>
					{/*state : {
							imgUrl : `https://picsum.photos/300/300?image=${this.props.url}`,
							username : this.props.author
					}  */}
						<Image className = 'likeThumbnail' alt='bookcover' width={240} height={240}
									src = {`https://${server_url}/upload/${this.props.likePost.mainImage}`}/>
					</Link>
					<div className='likeBar'>
						{(this.state.liked)
						? <span><Icon name='heart' size="large" onClick={this._handleLike}/>X{this.state.likeCount}</span>
						: <span><Icon name='heart outline' size="large" onClick={this._handleLike}/>X{this.state.likeCount}</span>
						}
					</div>
				</div>
					<p className='postTitle'>{this.props.likePost.title}</p>
			</div>
		)
	}
}

export default LikeBookBoard;