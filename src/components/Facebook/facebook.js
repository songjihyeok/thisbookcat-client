import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';


export default class Facebook extends Component {
  state ={ 
    isLoggedIn : false,
    userID : '',
    name : '',
    email:'',
    picture:''
  }

 facebookResponse = ()=>{
  console.log("hello");
}

componentClicked =()=>{
  console.log("clicked")
}


ResponseFacebook =(response)=>{
  console.log(response)
  this.setState({
    isLoggedIn:true,
    userID: response.userID,
    name: response.name,
    email: response.email,
    picture : response.picture.data.url
  })
}

  render(){
    let fbcontent;

    if(this.state.isLoggedIn){
      fbcontent=null;
    } else {
    fbcontent = <FacebookLogin
    appId="266158400828374"
    autoLoad={true}
    fields="name,email,picture"
    onClick={this.componentClicked}
    callback={this.ResponseFacebook} />
    }
    return (
      <div>
        {fbcontent};
      </div>
    )
  }
}