import React, { Component } from "react";
import { Link, Redirect} from "react-router-dom";
import { Icon, Input } from "semantic-ui-react";
import "./Nav1.css";

class Nav1 extends Component {
  state = {
    isLogin: true,
    searchingValue : ""
  }

  _logout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem('token');
    this.setState({isLogin: false})
  }

  _searchHandler = e => {
    const searchingValue = e.target.value;
    this.setState({searchingValue : searchingValue})
  }
  render() {
    if (!this.state.isLogin) {
      return <Redirect to ='/login' />;
    } else {
      return (
        <div className="nav">
          <div>
            <Link to="/main"><div id="thisBook" className="nav_inline">이 책 반 냥</div></Link>
            <div className="nav_inline">
              <form>
                <div id="search_div" className="nav_inline">
                  <input id="search_input" placeholder="(예: 힐링, 자기계발, 칼세이건...)"
                        onChange={(event)=>{this._searchHandler(event)}}/>
                </div>
                {/* <Link to={`/tagSearchPage/${this.state.searchingValue}`}>
                  <button><Icon name="search" size="large" fitted color="black"/></button>
                </Link> */}
              </form>
            </div>
            <div className="nav_inline">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35">
                  <path fill="none" stroke="#343434" d="M17.5 2C26.06 2 33 8.94 33 17.5 33 26.06 26.06 33 17.5 33 8.94 33 2 26.06 2 17.5 2 8.94 8.94 2 17.5 2z"/>
                  <path fill="none" stroke="#343434" d="M13.922 15.152l9.079-5.164-2.923 9.86-9.079 5.164 2.923-9.86z"/>
                </svg>
              </span>

                {/* 돋보기 */}
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33">
                <path fill="none" fill-rule="evenodd" stroke="#A2A2A2" stroke-width="3" d="M13.5 1.5c6.627 0 12 5.373 12 12s-5.373 12-12 12-12-5.373-12-12 5.373-12 12-12z"/>
                <path fill="#A2A2A2" fill-rule="evenodd" d="M20.697 21.697a1.5 1.5 0 0 1 2.121 0l6.485 6.485a1.497 1.497 0 0 1 0 2.121 1.498 1.498 0 0 1-2.12 0l-6.486-6.485a1.5 1.5 0 0 1 0-2.121z"/>
              </svg> */}

              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35">
                  <path fill="none" stroke="#343434" strokeLinejoin="round" d="M17.5 3a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15zM5 30.495C5 25.745 10.597 21 17.5 21c6.904 0 12.499 4.745 12.499 9.495"/>
                </svg>
              </span>

              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35">
                  <path fill="none" fillRule="evenodd" stroke="#343434" strokeLinejoin="round" d="M20.227 7.292c2.265-1.559 5.655-3.173 5.655-3.173L17.5 22.916 9.116 4.119l9.283 6.549M23.5 23.849c4.831.593 6.5 2.175 6.5 4.034 0 2.366-5.596 4.284-12.501 4.284-6.903 0-12.5-1.918-12.5-4.284 0-1.873 1.719-3.465 6.604-4.047"/>
                </svg>
              </span>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35">
                  <path fill="none" fillRule="evenodd" stroke="#343434" strokeLinejoin="round" d="M3 29s4.98 2 10 2c4.979 0 10-2 10-2M15.248 23.627l-4.717.843.843-4.717L26.603 4.528 30.476 8.4 15.248 23.627z"/>
                </svg>
              </span>
            </div>
          </div>
        </div>

      )
  }}
}

export default Nav1;