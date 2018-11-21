import React, {Component} from "react"
import { Link } from 'react-router-dom';
import server_url from '../../url.json'
import Image from 'react-image-resizer'

import './CSS/MyBookBoard.css'
import { Icon } from "semantic-ui-react";
import axios from 'axios'

class MyBookBoard extends Component {

    state = {

        liked:false,
        likeCount:this.props.likecount

    }

    componentDidMount () {
        this._getLikeData()
    }

    _getLikeData = () => {

        let token = window.localStorage.getItem('token')

        axios.get(`http://${server_url}:3000/api/like/${this.props.postid}`, {headers:{Authorization: `bearer ${token}`}})
        .then(response => {
            this.setState({
                liked: response.data[0][0][1]
              })
             /*  console.log('liked', this.state.liked) */
        })
        .catch(error => console.log(error))
    }
    
    _handleLike = () => {

        let token = window.localStorage.getItem('token')

        if(this.state.liked) {

            axios.delete(`http://${server_url}:3000/api/like/${this.props.postid}`, {headers:{Authorization: `bearer ${token}`}})
            .then(response => {
                // console.log(response)
                this.setState({
                    liked:false,
                    likeCount: this.state.likeCount-1
                })
               /*  console.log('liked should change', this.state.liked) */
            })
            .catch(error => console.log(error))

        } else {

            axios.post(`http://${server_url}:3000/api/like/${this.props.postid}`, {}, {headers:{Authorization: `bearer ${token}`}})
            .then(response => {
                // console.log(response)
                this.setState({
                    liked:true,
                    likeCount: this.state.likeCount+1
                })
                /* console.log('liked should change', this.state.liked) */
            })
            .catch(error => console.log(error))
        }
    }

    render(){
        /* console.log(this.props) */
        return(
            
                <div className ='MyBookBoard'>
                   {/*  {console.log('BookBoard component에서 this.props 찍는중', this.props)} */}
                <Link to={{
                pathname : `/postdetail/${this.props.postid}`,
                /* state : {
                    imgUrl : `https://picsum.photos/300/300?image=${this.props.url}`,
                    username : this.props.author, */
                }}>
                <Image src = {`http://${server_url}:3000/upload/${this.props.image}`} alt='bookcover' width={240} height={240}/>
                </Link>
                    <div className = 'likeBar'>
                    {this.state.liked?<span><Icon name="heart" size="large" onClick={this._handleLike}/>X{this.state.likeCount}</span>:
                    <span><Icon name="heart outline" size="large" onClick={this._handleLike}/>X{this.state.likeCount}</span>}
                    </div>
                    <span>{this.props.title}</span>
                </div>
        )
    }
}

export default MyBookBoard;