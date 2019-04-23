import React, { Component } from "react";
import { Link, Redirect} from "react-router-dom";
import logoImage from "../img/로고2.png";
import AutoSuggest from "./autoComplete/autoSuggest"
import axios from "axios";
import server_url from '../url.json';
import followIcon from '../img/like-icon-grey.svg'
//import "./Nav1.css";

class Nav1 extends Component {
  state = {
    searchingValue: "",
    isLogin: true
  }

  _searchHandler = e => {
    let searchingValue = e.target.value;
    searchingValue =this._popoutSpace(searchingValue);
    this.setState({searchingValue: searchingValue})
  }

  _popoutSpace = (value)=>{
    let valueArray=value.split('')

    let resultValue =''
    for(let element of valueArray){
      if(element===" "){
        continue
      }
      resultValue += element
    }
    return resultValue;
  }

  _handleKeyPress(event) {
    
    if (event.keyCode == '13') {
      event.preventDefault();
      if(this.state.searchingValue){
        window.location.href = `/tagSearchPage/${this.state.searchingValue}`
        
        let navName = document.getElementsByClassName('mo_button');
        navName.classList.remove('open');
      }  
    }
  }

  navClick(e){
    let target = e.target;
    let parent = target.parentElement;

    e.preventDefault();

    if (!parent.classList.contains("open")){
      parent.classList.add('open');
    } else{
      parent.classList.remove('open');
    }
  }

  searchValueButton(){
    if(this.state.searchingValue){
      return (
        <Link to={`/tagSearchPage/${this.state.searchingValue}`}>
        <svg xmlns="https://www.w3.org/2000/svg" className="item">
          <path fill="none" fillRule="evenodd" stroke="#A2A2A2" strokeWidth="3" d="M13.5 1.5c6.627 0 12 5.373 12 12s-5.373 12-12 12-12-5.373-12-12 5.373-12 12-12z"/>
          <path fill="#A2A2A2" fillRule="evenodd" d="M20.697 21.697a1.5 1.5 0 0 1 2.121 0l6.485 6.485a1.497 1.497 0 0 1 0 2.121 1.498 1.498 0 0 1-2.12 0l-6.486-6.485a1.5 1.5 0 0 1 0-2.121z"/>
        </svg>
      </Link>
      )
    } else {
      return (
      <svg xmlns="https://www.w3.org/2000/svg" className="item">
        <path fill="none" fillRule="evenodd" stroke="#A2A2A2" strokeWidth="3" d="M13.5 1.5c6.627 0 12 5.373 12 12s-5.373 12-12 12-12-5.373-12-12 5.373-12 12-12z"/>
        <path fill="#A2A2A2" fillRule="evenodd" d="M20.697 21.697a1.5 1.5 0 0 1 2.121 0l6.485 6.485a1.497 1.497 0 0 1 0 2.121 1.498 1.498 0 0 1-2.12 0l-6.486-6.485a1.5 1.5 0 0 1 0-2.121z"/>
     </svg>
      )
    }    
  }

  async clickHandler(){
    const token = window.localStorage.getItem('token')

    let resultOfget = await axios.get(`https://${server_url}/api/user`, {headers: {Authorization: `bearer ${token}`}})
    console.log("결과물", resultOfget)
    let {userName, qualifed}= resultOfget.data
    if(userName&& qualifed){
      console.log("넘어가자")
      window.location.href = "/writepost"
    }else if(!qualifed){
      alert("애프터리더 집필진만 작성가능합니다.")
    }else if(!userName){
      alert("유저네임을 입력해주세요")
    }
  }

//

  render() {
    if (!this.state.isLogin) {
      return <Redirect to='/login' />;
    } else {
      return (
        <div className="nav1">
          <h1 className="thisBook_Nav1"><Link to="/main"><img alt="책이미지" className="logoStyle" src={logoImage}/></Link></h1> 
          <div className="searchForm">
            <form>
              {/* <AutoSuggest/> */}
              <input className="search_input" placeholder="(예: 힐링, 자기계발, 칼세이건...)" value={this.state.searchingValue}
                      onChange={(event)=>{this._searchHandler(event)}} onKeyDown={(e)=>{this._handleKeyPress(e)}}/>
     
               {this.searchValueButton()}
            </form>
          </div>
          
          <p className="mo_button"><a href="#none" onClick={this.navClick}><span>메뉴</span></a></p>
          <div className="items">
            <div className="items_list">
              <Link to={"/followings"}>
                <svg xmlns="http://www.w3.org/2000/svg" className="item">
                  <path fill="none" stroke="#343434" strokeWidth="1.5" d="M8.5 5.5h19a3 3 0 0 1 3 3v20a3 3 0 0 1-3 3h-19a3 3 0 0 1-3-3v-20a3 3 0 0 1 3-3z"/>
                  <path fill="none" stroke="#343434" strokeLinecap="round" strokeWidth="1.5" d="M11.5 12.5h13M11.5 17.5h13M11.5 22.5h7"/>
                </svg>
                  <span className="nav_text">팔로잉 피드</span> 
              </Link>
              <Link to={"/mylike"}>
              <svg xmlns="http://www.w3.org/2000/svg" className="item">
                 <path fill="none" fillRule="evenodd" stroke="#343434" strokeLinejoin="round" strokeWidth="1.5" d="M20.955 14.42c-.34-.759-2.735-3.629-2.803-3.762-4.034-7.8-14.2-5.619-14.199 4.122 0 6.569 14.562 16.928 14.562 16.928S33.047 20.552 33.047 14.72c.001-7.833-6.653-10.526-11.291-7.411C21.143 7.72 20.5 8.5 20.5 8.5"/>
              </svg>
                <span className="nav_text">내 관심 컨텐츠</span>
              </Link>
              <div onClick={this.clickHandler} className="linkForWritepost" >
                <svg xmlns="https://www.w3.org/2000/svg" className="item">
                  <path fill="none" fillRule="evenodd" stroke="#343434" strokeLinejoin="round" d="M3 29s4.98 2 10 2c4.979 0 10-2 10-2M15.248 23.627l-4.717.843.843-4.717L26.603 4.528 30.476 8.4 15.248 23.627z"/>
                </svg>
                <span className="nav_text">글쓰기</span>
              </div>
              <Link to={"/mypage"}>
                <svg xmlns="https://www.w3.org/2000/svg" className="item">
                  <path fill="none" stroke="#343434" strokeLinejoin="round" d="M17.5 3a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15zM5 30.495C5 25.745 10.597 21 17.5 21c6.904 0 12.499 4.745 12.499 9.495"/>
                </svg>
                <span className="nav_text">내 프로필</span>
              </Link>
            </div>
          </div>
        </div>

      )
  }}
}

export default Nav1;