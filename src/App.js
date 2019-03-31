import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import FindPw from "./routes/FindPw";
import ResetPw from "./routes/ResetPw";
import PickTaste from "./routes/PickTaste";
import Main from "./routes/Main";
import MyLike from "./routes/MyLike";
import Followings from "./routes/Followings";
import WritePost from "./routes/WritePost";
import PostDetail from "./routes/PostDetail";
import MyPage from "./routes/MyPage";
import TagSearchPage from "./routes/TagSearchPage"
import editPost from "./routes/editPost"
import redirect from "./routes/redirect"
import robots from './routes/robots'
import agree from './routes/ModalAgree'
import writerPage from './routes/WriterPage'
import "./default.css";
import NoMatch from "./routes/notFound";
import { LastLocationProvider } from "react-router-last-location";
import ScrollMemory from 'react-router-scroll-memory';


class App extends Component {
  render() {
    return (
      <div className = 'App'>
          <Router>
            <div>
            <ScrollMemory/>
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/robots.txt" component={robots}/>
                <Route path="/redirect/:token/:agreed" component={redirect}/>
                <Route path="/signup" component={SignUp} />
                <Route path="/findpw" component={FindPw} />
                <Route path="/resetpw" component={ResetPw} />
                <Route path="/picktaste" component={PickTaste} />
                <Route path="/main" component={Main} />
                <Route path="/mylike" component={MyLike} />
                <Route path="/followings" component={Followings} />
                <Route path="/writepost/:postid" exact component = {editPost}/>
                <Route path="/writepost" component={WritePost} />
                <Route path="/postdetail/:postid" component={PostDetail} />
                <Route path="/mypage" component={MyPage} />
                <Route path="/agree" component={agree}/>
                <Route path="/postWriter/:writerId" component={writerPage}/>
                <Route path="/TagSearchPage/:TagName" exact component = {TagSearchPage}/>
                <Route exact path="/" component={Main} />
                <Route component={NoMatch}/>
              </Switch>
            </div>
          </Router>
      </div>
    );
  }
}
export default App;
