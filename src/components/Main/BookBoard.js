import React, {Component} from "react"
import {Image} from 'react-bootstrap'
import { Icon } from "semantic-ui-react";
import server_url from '../../url.json'
import history from '../../history';
import Truncate from 'react-truncate-html';
import likeControl from '../likeCotrol';

class BookBoard extends Component {

	state = {
			liked: this.props.isUserLike,
			likeCount: this.props.likecount
	} 

	token = window.localStorage.getItem('token')

	_handleLike = async() => {
		if(this.props.userName===''){
			alert("유져네임을 설정해주세요")
			return;
		}

		await likeControl(this.state.isLike, this.props.postId, this.state.likeCount)
    
    if(this.state.liked){
      this.setState({liked:false , likeCount:this.state.likeCount-1})
    }else {
      this.setState({liked:true, likeCount: this.state.likeCount+1})
    }
	}


	handleImage =()=>{
		if(this.props.url===''&&this.props.bookData!=='null'){
			let parsedBookData = JSON.parse(this.props.bookData);
			let postImage = parsedBookData.cover;
			return postImage 
		} 
		return `https://${server_url}/upload/${this.props.url}`	
	}	

	handleLink =()=>{
		history.push(`/postdetail/${this.props.postId}`);
	}


	render(){
		return(
				<div className ='bookBoard'>
					<div className='imageContainer'>
						<div onClick={this.handleLink}>
							<Image className = 'mainThumbNail' alt='bookcover' 
										src = {this.handleImage()}/>
						</div>
						<div className='likeBar' onClick={this._handleLike}>
							{this.state.liked
							? <div><Icon name='heart' size="large" />{this.state.likeCount}</div>
							: <div><Icon name='heart outline' size="large"/>{this.state.likeCount}</div>
							}
						</div>
					</div>
					 <p className='postTitle'>{this.props.title}</p> 
				</div>
		)
	}
}

export default BookBoard;
