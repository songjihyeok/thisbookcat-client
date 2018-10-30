import React, {Component} from "react"
import { Link } from 'react-router-dom';
import server_url from '../../url.json'
import Image from 'react-image-resizer'

import './CSS/MyBookBoard.css'

class MyBookBoard extends Component {

    render(){
        console.log(this.props)
        return(
            <Link to={{
                pathname : `/postdetail/${this.props.postID}`,
               /*  state : {
                    imgUrl : `https://picsum.photos/300/300?image=${this.props.url}`,
                    username : this.props.author,
                } */
            }}>
                <div className ='MyBookBoard'>
                    {console.log('BookBoard component에서 this.props 찍는중', this.props)}
                    <Image className = 'likeThumbnail' src = {`http://${server_url}:3000/upload/${this.props.image}`} alt='bookcover' width={200} height={200}/>
                    <h1>{this.props.title}</h1>
                </div>
            </Link>

           // <Link to={`/postdetail/${this.props.url}`}>
           //     <div className ='BookBoard'>
           //         <img className = 'likeThumbnail' src = {`https://picsum.photos/300/300?image=${this.props.url}`} alt='bookcover' /> */}
           //     </div>
           // </Link>
        )
    }
}

export default MyBookBoard;