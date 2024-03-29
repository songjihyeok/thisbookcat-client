import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import server_url from '../url.json';
import Nav1 from "../components/Nav1";
import BookBoard from "../components/Main/BookBoard";
//import "../components/Main/CSS/Main.css";

class TagSearchPage extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      per: 18, //한페이지당 가지게될 포스트의 개수
      page: 1, //정해진 per만큼의 포스트를 가지는 페이지
      totalPage:'',
      coverurl: null,
      tagName : this.props.match.params.TagName,
      loading: false
    }
    // console.log("construtor")
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isthetagNamechanged = nextState.coverurl !== null
    return isthetagNamechanged
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this._infiniteScroll,false)
  }

  componentDidMount() {
    this._getUrls().then(() => {
      window.addEventListener('scroll', this._infiniteScroll, true)
    })
  }

  async componentWillReceiveProps(nextProps) {
    // console.log(this.props.match.params.TagName, "and", nextProps.match.params.TagName)
    if (this.props.match.params.TagName !== nextProps.match.params.TagName) {
      // console.log("다르네!")
      await this.setState(() => ({coverurl: null}))
      await this.setState({tagName: nextProps.match.params.TagName})
      await this._getUrls();
    }
  }

  _infiniteScroll = () => {
    
    if (window.innerHeight + window.scrollY >= (document.body.offsetHeight-500) && this.state.loading) {
      if (this.state.page !== this.state.totalPage) {
        this.setState({page: this.state.page+1, loading:false})
        this._getUrls()
      }
    }
  }

  _renderBooKCoverImage = () => {
    // console.log("rendering")
    if(this.state.coverurl) {
      const bookcover = this.state.coverurl.map((url) => {
        if(url) {
          return <BookBoard url={url.mainImage} postid={url.id} title={url.title}
                            likecount={url.likeCount} key={url.id}/>
        } else {
          return null;
        }
      });
      return bookcover
    }
    return "Loading"
  }

  _getUrls = async () => {
    // console.log("gettingUrls")
    const coverurl = await this._callTheTagBookCoverAPI();
    // console.log("get url 과정?",coverurl)
    if (this.state.coverurl === null || this.state.coverurl===undefined) {
      await this.setState({coverurl}) 
    } else {
      await this.setState({coverurl: this.state.coverurl.concat(coverurl)})
    }
  };

  _callTheTagBookCoverAPI = async() => {
    // console.log("uri 가져옵시다")
    let token = window.localStorage.getItem('token')
    return  axios.post(`https://${server_url}/api/post/tag/${this.state.per}/${this.state.page}`,{
      tagName : this.state.tagName}, {
      headers: {Authorization: `bearer ${token}`}
    })
    .then( async(response) => {
      // console.log('there should be data here',response.data)
      await this.setState({totalPage: response.data.totalpage, loading: true})
      let result = response.data.perArray
      // console.log("결과물은??_______",result)
      return result;
      })
      .catch(err => console.log(err))
  };

  render() {
    if (!window.localStorage.getItem("token")) {
      return <Redirect to="/login" />
    } else {
      return (
        <div className="Main_tagsearch">
          <Nav1/>
          <h1>{this.state.tagName+"에 대한 검색 결과"}</h1>
          {this._renderBooKCoverImage()}<br/>
          {(this.state.page === this.state.totalPage)
          ? <div className="dataNone">'더이상 콘텐츠가 없습니다!'</div>
          : ''
          }
        </div>
    );
  }}
}

export default TagSearchPage