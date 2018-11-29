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
		this._getLikeData()
	}

	_getLikeData = () => {
		axios.get(`http://${server_url}:3000/api/like/${this.props.postid}`, {
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
			axios.delete(`http://${server_url}:3000/api/like/${this.props.postid}`, {
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
				axios.post(`http://${server_url}:3000/api/like/${this.props.postid}`, {}, {
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
			<div className='MyBookBoard'>
				{/*  {console.log('BookBoard component에서 this.props 찍는중', this.props)} */}
				<div className='myImageContainer'>
				<Link to={{pathname : `/postdetail/${this.props.postid}`,}}>
					<Image src={`http://${server_url}:3000/upload/${this.props.image}`} alt='bookcover'/*  width={300} */ height={240}/>
				</Link>
				</div>
				<div className='likeBar'>
					{(this.state.liked)
					? <span className='myPostLikePart'><Icon name="heart" size="large" onClick={this._handleLike}/>{this.state.likeCount}</span>
					: <span className='myPostLikePart'><Icon name="heart outline" size="large" onClick={this._handleLike}/>{this.state.likeCount}</span>
					}
				</div><br/>
				<span className='myPostTitle'>{this.props.title}</span>
			</div>
		)
  }
}

export default MyBookBoard;