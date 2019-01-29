import React, {Component} from "react"
import { Link } from 'react-router-dom';
import server_url from '../../url.json'
import Images, {Image} from 'react-bootstrap'

/* import './CSS/MyBookBoard.css' */
import { Icon } from "semantic-ui-react";
import axios from 'axios'

class MyBookBoard extends Component {
	state = {
		liked: false,
		likeCount: this.props.likecount
	}

	token = window.localStorage.getItem('token')

	componentDidMount () {
		console.log("props", this.props)
		this._getLikeData()
	}

	_getLikeData = () => {
		axios.get(`https://${server_url}/api/like/${this.props.postid}`, {
			headers: {Authorization: `bearer ${this.token}`}
		})
		.then(response => {
			this.setState({liked: response.data[0][0][1]})
			/*  console.log('liked', this.state.liked) */
		})
		.catch(error => console.log(error))
	}
    
	_handleLike = () => {
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

	render() {
			/* console.log(this.props) */
		return (
			<div className='bookBoard'>
				{/*  {console.log('BookBoard component에서 this.props 찍는중', this.props)} */}
				<div className='imageContainer'>
					<Link to={{pathname : `/postdetail/${this.props.postid}`}}>
						<Image src={`https://${server_url}/upload/${this.props.image}`} alt='bookcover'/*  width={300} */ height={240}/>
					</Link>
					<div className='likeBar'>
						{(this.state.liked)
						? <span className='likeIconBar'><Icon name="heart" size="large" onClick={this._handleLike}/>{this.state.likeCount}</span>
						: <span className='likeIconBar'><Icon name="heart outline" size="large" onClick={this._handleLike}/>{this.state.likeCount}</span>
						}
					</div>
				</div>
				<p className='postTitle'>{this.props.title}</p>
			</div>
		)
  }
}

export default MyBookBoard;