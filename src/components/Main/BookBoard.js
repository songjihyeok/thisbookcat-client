import React, {Component} from "react"
import { Link } from 'react-router-dom'
import Image from 'react-image-resizer'
import { Icon } from "semantic-ui-react";
import server_url from '../../url.json'

import axios from 'axios'

class BookBoard extends Component {

    state = {

        liked:false

    }

    componentDidMount () {

    }

    _likedOrNot = () => {
        
    }

    _handleLike = () => {

        let token = window.localStorage.getItem('token')

        if(this.state.liked) {

            axios.post(`http://${server_url}:3000/api/like/${this.props.postid}`, {headers:{Authorization: `bearer ${token}`}})
            .then(response => console.log(response))
            .catch(error => console.log(error))

        }
        
        axios.post(`http://${server_url}:3000/api/like/${this.props.postid}`, {headers:{Authorization: `bearer ${token}`}})
        .then(response => console.log(response))
        .catch(error => console.log(error))

    }

    _changeHeart = () => {
        this.state.liked?this.setState({liked:false}):this.setState({liked:true})
    }

    _handleClick = async () => {

        await this._changeHeart()

        await this._handleLike()

    }

    render(){
        return(
                <div className ='BookBoard'>
                <Link to={{
                pathname : `/postdetail/${this.props.postid}`,
                /* state : {
                    imgUrl : `https://picsum.photos/300/300?image=${this.props.url}`,
                    username : this.props.author,
                } */}}>
                <Image className = 'likeThumbnail' src = {`http://${server_url}:3000/upload/${this.props.url}`} alt='bookcover' width={240} height={240} />
                </Link>
                    <Icon name={this.state.liked?'heart':'heart outline'} size="large" className={this.props.postid} onClick={this._handleClick}/>
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
