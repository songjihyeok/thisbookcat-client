import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import server_url from '../../url.json';
import axios from 'axios';
import Truncate from 'react-truncate-html';
import defaultImage from '../../img/다운로드.png'


class FollowingBoard extends Component {
	state = {
		liked: false,
		likeCount: this.props.likecount,
		postUserInfo:''
	}

	token = window.localStorage.getItem('token')

	componentDidMount () {
		this._getLikeData()
		this._callPostUserAPI()
  }

	_getLikeData = () => {
			// console.log(this.props.postid)
		// let token = window.localStorage.getItem('token')
		axios.get(`https://${server_url}/api/like/${this.props.postid}`, {
			headers:{Authorization: `bearer ${this.token}`}})
		.then(response => {
			// console.log(response.data[0][0][1])
			this.setState({liked: response.data[0][0][1]})
			//   console.log('liked', this.state.liked)
		})
		.catch(error => console.log(error))
	}

	_handleLike = () => {
		// let token = window.localStorage.getItem('token')
		if (this.state.liked) {
			axios.delete(`https://${server_url}/api/like/${this.props.postid}`, {
				headers:{Authorization: `bearer ${this.token}`}})
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
			axios.post(`https://${server_url}/api/like/${this.props.postid}`, {}, {
				headers: {Authorization: `bearer ${this.token}`}})
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

	_callPostUserAPI = () => {
    let token = window.localStorage.getItem('token')
    return axios.get(`https://${server_url}/api/post/postedUserName/${this.props.postid}`, {
			headers:{Authorization: `bearer ${token}`}})
			.then(response=>{	
				console.log(response.data)
				if(response.status===200){
					this.setState({postUserInfo:response.data})
				} 
				return;
			})
			.catch((err)=>{return;})
		}

	_handleProfileImage = ()=>{
		if(!this.state.postUserInfo.profileImage){
			return defaultImage;
		}
		return `https://${server_url}/upload/${this.state.postUserInfo.profileImage}`
	}	


	handleImage=()=>{
		if(this.props.image===''&&this.props.bookData!=='null'){
			let parsedBookData = JSON.parse(this.props.bookData);
			let postImage = parsedBookData.cover;
			// console.log( "url 바뀌었나",postImage);
			return postImage 
		} 
		return `https://${server_url}/upload/${this.props.image}`	
	}	

  render() {
		let postedUserId =this.state.postUserInfo[0]
    return  (
			<div className='FollowingBoard'>
     		 <Link to={`/postWriter/${postedUserId}`}>
					<div className='UserInfoPart'>
						<span className="postUserThumb"><img src={this._handleProfileImage()} className='postUserImage' alt={"postUserImage"} /></span>
						<span className='postUsername'>{this.state.postUserInfo.userName}</span>
					</div>
				</Link>
				<div className='imagePart'>
					<Link to={{
							pathname: `/postdetail/${this.props.postid}`,
					}}>
						<img className='FollowThumbnail' src={this.handleImage()}
									alt='bookcover' />
					</Link>
				</div>
				<ul className='textPart'>
					<li className='contentsPart'>
						<h3 className="followingTitle">{this.props.title}</h3>
						<div className="followingContent">
							<Truncate lines={7} dangerouslySetInnerHTML={{__html:this.props.contents}} />
						</div>
					</li>
					<li className='likeAndLikecount'>
						{(this.state.liked)
						? <span><Icon name='heart' size="large" onClick={this._handleLike}/>{this.state.likeCount}</span>
						: <span><Icon name='heart outline' size="large" onClick={this._handleLike}/>{this.state.likeCount}</span>
						}
					</li>
					<li className='followerTag'></li>
				</ul>
			</div>
    )
	}
}
export default FollowingBoard;
