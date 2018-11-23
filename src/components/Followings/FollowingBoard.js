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
		axios.get(`http://${server_url}:3000/api/like/${this.props.postid}`, {
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
			axios.delete(`http://${server_url}:3000/api/like/${this.props.postid}`, {
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
			axios.post(`http://${server_url}:3000/api/like/${this.props.postid}`, {}, {
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
    return axios.get(`http://${server_url}:3000/api/post/postedUserName/${this.props.postid}`, {
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
			<img src={`http://${server_url}:3000/upload/${this.state.postUserInfo.profileImage}`} className='postUserImage' alt={"postUserImage"} />
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
						<Image className='FollowThumbnail' src={`http://${server_url}:3000/upload/${this.props.image}`}
									alt='bookcover' /* width={330} */ height={330} />
					</Link>
				</div>
				<div className='textPart'>
				<span className='contentsPart'>{this.props.title}</span><br/>
				<span className='likeAndLikecount'>
						{(this.state.liked)
						? <span><Icon name='heart' size="large" onClick={this._handleLike}/>X{this.state.likeCount}</span>
						: <span><Icon name='heart outline' size="large" onClick={this._handleLike}/>X{this.state.likeCount}</span>
						}
					</span><br/>
					<span className='followerTag' dangerouslySetInnerHTML={{__html:this.props.contents}}></span>
				</div>
				<div className='followFooter'>
				</div>
			</div>
    )
	}
}
export default FollowingBoard;
