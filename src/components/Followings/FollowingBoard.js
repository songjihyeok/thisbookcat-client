import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import Image from 'react-image-resizer'
import server_url from '../../url.json'
import axios from 'axios'


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
			.then(response=> response.data)
			.then(response => this.setState({postUserInfo:response}))
		}

  render() {
		//   console.log(this.props.contents)
		//   console.log(this.props.likecount)
		console.log(this.state.postUserInfo)
    return  (
			<div className='FollowingBoard'>
				<div className='UserInfoPart'>
					<span className="postUserThumb"><img src={`https://${server_url}/upload/${this.state.postUserInfo.profileImage}`} className='postUserImage' alt={"postUserImage"} /></span>
					<span className='postUsername'>{this.state.postUserInfo.userName}</span>
				</div>
				<div className='imagePart'>
					<Link to={{
							pathname: `/postdetail/${this.props.postid}`,
						/*  state : {
											imgUrl : `https://picsum.photos/300/300?image=${this.props.url}`,
											username : this.props.author,
									} */
					}}>
						<Image className='FollowThumbnail' src={`https://${server_url}/upload/${this.props.image}`}
									alt='bookcover' width={330} height={330} />
					</Link>
				</div>
				<ul className='textPart'>
					<li className='contentsPart'>{this.props.title}</li>
					<li className='likeAndLikecount'>
						{(this.state.liked)
						? <span><Icon name='heart' size="large" onClick={this._handleLike}/>{this.state.likeCount}</span>
						: <span><Icon name='heart outline' size="large" onClick={this._handleLike}/>{this.state.likeCount}</span>
						}
					</li>
					<li className='followerTag' dangerouslySetInnerHTML={{__html:this.props.contents}}></li>
				</ul>
			</div>
    )
	}
}
export default FollowingBoard;
