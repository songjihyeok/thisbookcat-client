import Loader from 'react-loader-spinner'
import React from 'react'

export default class waitingLoader extends React.Component {

   render() {
    return(
    <div className="loading">
     <Loader 
        type= "Oval"
        color="#778899"
        height="50"	
        width="50"
     />  
    </div>  
    );
   }
}