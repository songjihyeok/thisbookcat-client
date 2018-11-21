import React, {Component} from "react"
import { Link } from 'react-router-dom'
import Image from 'react-image-resizer'
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
		axios.get(`http://${server_url}:3000/api/like/${this.props.postid}`, {
			headers: {Authorization: `bearer ${this.token}`}
		})
		.then(response => {
			this.setState({liked: response.data[0][0][1]})
			//   console.log('liked', this.state.liked)
		})
		.catch(error => console.log(error))
	}


	_handleLike = () => {
		if (this.state.liked) {
			axios.delete(`http://${server_url}:3000/api/like/${this.props.postid}`, {
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
			axios.post(`http://${server_url}:3000/api/like/${this.props.postid}`, {}, {
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

	render(){
		return(
			<div className ='BookBoard'>
				<Link to={{
					pathname : `/postdetail/${this.props.postid}`,
				/* state : {
						imgUrl : `https://picsum.photos/300/300?image=${this.props.url}`,
						username : this.props.author,
				} */}}>
					<Image className = 'likeThumbnail' alt='bookcover' width={240} height={240}
								src = {`http://${server_url}:3000/upload/${this.props.url}`}/>
				</Link>
				{this.state.liked
				? <span><Icon name='heart' size="large" onClick={this._handleLike}/>X{this.state.likeCount}</span>
				: <span><Icon name='heart outline' size="large" onClick={this._handleLike}/>X{this.state.likeCount}</span>
				}
				<span>{this.props.title}</span>
			</div>

	// <Link to={`/postdetail/${this.props.url}`}>
	//     <div className ='BookBoard'>
	//         <img className = 'likeThumbnail' src = {`https://picsum.photos/300/300?image=${this.props.url}`} alt='bookcover' /> */}
	//     </div>
	// </Link>
		)
	}
}

export default BookBoard;
