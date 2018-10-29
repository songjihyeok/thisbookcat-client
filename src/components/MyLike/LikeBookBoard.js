import React, {Component} from "react"
import { Link } from 'react-router-dom';
import server_url from '../../url.json';

class LikeBookBoard extends Component {

    render(){
        console.log("LikeBookBoard.js 컴포 > render 함수 안 콘솔 찍는 중 this.props.likePost___", this.props.likePost)
        return(
            <Link to={{
                pathname : `/postdetail/${this.props.url}`,
                state : {
                    imgUrl : `https://picsum.photos/300/300?image=${this.props.url}`,
                    username : this.props.author
                }
            }}>
                <div className ='LikeBookBoard'>
                    <img className = 'likeThumbnail' src = {`http://${server_url}:3000/upload/${this.props.likePost.mainImage}`} alt='bookcover'/>
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

export default LikeBookBoard;