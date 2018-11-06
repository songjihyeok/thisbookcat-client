import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import Image from 'react-image-resizer'
import server_url from '../../url.json'


class FollowingBoard extends Component {

  render(){
          console.log(this.props.contents)
    return(
    <div className ='FollowingBoard'>
    <div className = 'imagePart'>
    <Link to={{
        pathname : `/postdetail/${this.props.url}`,
       /*  state : {
                imgUrl : `https://picsum.photos/300/300?image=${this.props.url}`,
                username : this.props.author,
            } */
            }}>
            <Image className = 'FollowThumbnail' src = {`http://${server_url}:3000/upload/${this.props.image}`} alt='bookcover' width={240} height={240} />
            </Link>
            </div>
    <div className = 'textPart' dangerouslySetInnerHTML={{__html:this.props.contents}}></div>
    <div className = 'followFooter'>
    <Icon className = 'heart' name="heart outline" size="big" />
    <span className = 'FollowerID'>{this.props.title}</span>
    </div>
    </div>
    )
}
}
export default FollowingBoard;
