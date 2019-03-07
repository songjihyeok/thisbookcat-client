import React, { Component } from "react";
import { Link, Redirect} from "react-router-dom";
import logoImage from "../img/로고.png";

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
    console.log(valueArray)
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

  render() {
    if (!this.state.isLogin) {
      return <Redirect to='/login' />;
    } else {
      return (
        <div className="nav1">
          <h1 className="thisBook_Nav1"><Link to="/main"><img alt="책이미지" className="logoStyle" src={logoImage}/></Link></h1> 
          <div className="searchForm">
            <form>
              <input className="search_input" placeholder="(예: 힐링, 자기계발, 칼세이건...)" value={this.state.searchingValue}
                      onChange={(event)=>{this._searchHandler(event)}} onKeyDown={(e)=>{this._handleKeyPress(e)}}/>
              {this.state.searchingValue?             
              <Link to={`/tagSearchPage/${this.state.searchingValue}`}>
                <svg xmlns="https://www.w3.org/2000/svg" className="item">
                  <path fill="none" fillRule="evenodd" stroke="#A2A2A2" strokeWidth="3" d="M13.5 1.5c6.627 0 12 5.373 12 12s-5.373 12-12 12-12-5.373-12-12 5.373-12 12-12z"/>
                  <path fill="#A2A2A2" fillRule="evenodd" d="M20.697 21.697a1.5 1.5 0 0 1 2.121 0l6.485 6.485a1.497 1.497 0 0 1 0 2.121 1.498 1.498 0 0 1-2.12 0l-6.486-6.485a1.5 1.5 0 0 1 0-2.121z"/>
                </svg>
              </Link>
              : 
              <svg xmlns="https://www.w3.org/2000/svg" className="item">
              <path fill="none" fillRule="evenodd" stroke="#A2A2A2" strokeWidth="3" d="M13.5 1.5c6.627 0 12 5.373 12 12s-5.373 12-12 12-12-5.373-12-12 5.373-12 12-12z"/>
              <path fill="#A2A2A2" fillRule="evenodd" d="M20.697 21.697a1.5 1.5 0 0 1 2.121 0l6.485 6.485a1.497 1.497 0 0 1 0 2.121 1.498 1.498 0 0 1-2.12 0l-6.486-6.485a1.5 1.5 0 0 1 0-2.121z"/>
            </svg>}        
            </form>
          </div>
          
          <p className="mo_button"><a href="#none" onClick={this.navClick}><span>메뉴</span></a></p>
          <div className="items">
            <div className="items_list">
              <Link to={"/followings"}>
                <svg xmlns="https://www.w3.org/2000/svg" className="item">
                  <path fill="none" fillRule="evenodd" stroke="#343434" strokeLinejoin="round" d="M20.227 7.292c2.265-1.559 5.655-3.173 5.655-3.173L17.5 22.916 9.116 4.119l9.283 6.549M23.5 23.849c4.831.593 6.5 2.175 6.5 4.034 0 2.366-5.596 4.284-12.501 4.284-6.903 0-12.5-1.918-12.5-4.284 0-1.873 1.719-3.465 6.604-4.047"/>
                </svg>
                <span className="nav_text">팔로잉</span>
              </Link>
              <Link to={"/mylike"}>
                <svg xmlns="https://www.w3.org/2000/svg" className="item">
                  <path fill="none" stroke="#343434" d="M17.5 2C26.06 2 33 8.94 33 17.5 33 26.06 26.06 33 17.5 33 8.94 33 2 26.06 2 17.5 2 8.94 8.94 2 17.5 2z"/>
                  <path fill="none" stroke="#343434" d="M13.922 15.152l9.079-5.164-2.923 9.86-9.079 5.164 2.923-9.86z"/>
                </svg>
                <span className="nav_text">내 관심 컨텐츠</span>
              </Link>
              <Link to={"/writepost"}>
                <svg xmlns="https://www.w3.org/2000/svg" className="item">
                  <path fill="none" fillRule="evenodd" stroke="#343434" strokeLinejoin="round" d="M3 29s4.98 2 10 2c4.979 0 10-2 10-2M15.248 23.627l-4.717.843.843-4.717L26.603 4.528 30.476 8.4 15.248 23.627z"/>
                </svg>
                <span className="nav_text">글쓰기</span>
              </Link>
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