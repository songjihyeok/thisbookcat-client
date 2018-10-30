import React, {Component} from "react"
import { Link } from 'react-router-dom'
import Image from 'react-image-resizer'
import { Icon } from "semantic-ui-react";
import server_url from '../../url.json'

class BookBoard extends Component {

    render(){
        return(
            <Link to={{
                pathname : `/postdetail/${this.props.postid}`,
                state : {
                    imgUrl : `https://picsum.photos/300/300?image=${this.props.url}`,
                    username : this.props.author,
                }
            }}>
                <div className ='BookBoard'>
                    <Image className = 'likeThumbnail' src = {`http://${server_url}:3000/upload/${this.props.url}`} alt='bookcover' width={200} height={200} />
                    <Icon name="heart outline" size="big"/>
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

export default BookBoard;
