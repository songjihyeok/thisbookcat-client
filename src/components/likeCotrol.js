import server_url from '../url.json';
import axios from 'axios'

export default async function likeControl (isLike, postId, likeCount){

  let authHeader = ()=>{
    if(window.localStorage.getItem('token')){
      return  {headers:{Authorization: `bearer ${window.localStorage.getItem('token')}`}} 
    } else{
      return {headers:{Authorization: `bearer anonymous`}} 
    }
  } 

  let previousInfo =  window.localStorage.getItem("previousInfo");
  window.localStorage.removeItem("previousInfo");

  let parsedInfo = false
  if(previousInfo){
    parsedInfo= JSON.parse(previousInfo);
  }

  if (isLike) { 
    let resultOfdelete=await axios.delete(`https://${server_url}/api/like/${postId}`, authHeader())
    if(resultOfdelete&&parsedInfo){
      parsedInfo.coverurl.map((element)=>{
        if(element.id==postId){
          
          element["likeCount"]= likeCount-1
          element["isUserLike"]=false;
        }
      })
    }
  } else { 
    let resultOflikePost =await axios.post(`https://${server_url}/api/like/${postId}`, {}, authHeader())

    if(parsedInfo){
      parsedInfo.coverurl.map((element)=>{
        if(element.id==postId){

          element["likeCount"]= likeCount+1
          element["isUserLike"]=true;
        }
      })
    }
  }
  let stringified = JSON.stringify(parsedInfo)
  window.localStorage.setItem("previousInfo", stringified);
} 