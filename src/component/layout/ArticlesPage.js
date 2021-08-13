import React, {Component} from 'react';
import { connect } from "react-redux";
import { addToken } from "../../store/actions/ConfigAction";
import axios from 'axios';
import logo from './../../logo.svg';
import { Link } from "react-router-dom";

class ArticlesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            alert: "",
            alertMsg: ""
        };
    }

    componentDidMount() {
        this.getArticle();
    }

    getArticle() {
        axios.get('https://tc-frontend.sebisedu.co.id/api/article')
        .then(res => {
            this.setState({
                articles: res.data.data
            })
        })
        .catch(err => {this.setState({
            alert: err.response.data.status,
            alertMsg: err.response.data.message,
        })})
    }

    convertDate(date) {
        let split = date.split("T");
        return split[0];
    }

    

    render() {
        return (
            <div className="row">
                {this.state.alert == "success" ? (
                    <div className="alert alert-success text-center" role="alert"> 
                        {this.state.alertMsg}
                    </div>)
                    : this.state.alert == "error" ? 
                    <div className="alert alert-danger text-center" role="alert" >
                        {this.state.alertMsg}
                    </div> 
                    : null
                }
                
                <div className="col-md-6 mx-auto">
                    {
                        this.state.articles.map((content, i) => {
                            return (
                                <div key={i}>
                                    <div className="card">
                                        {
                                            content.featured_image_url == "" ?
                                            <img src={logo} className = "card-img-top"/> :
                                            <img src={content.featured_image_url} className = "card-img-top"/>
                                        }
                                        <div className="card-body">                           
                                            <h1 className="text-center">{content.title}</h1>
                                            <footer className="blockquote_footer">Updated <cite>{this.convertDate(content.updated_at)}</cite></footer>
                                            <div className="row">
                                                {
                                                    this.props.id == content.user_id && this.props.role == "author" ?
                                                    <div className="col-md">
                                                        <Link to={`article/post/${content.id}`}>
                                                            <button type="button" className="btn btn-primary">Edit Article</button>
                                                        </Link>
                                                    </div> : null
                                                }
                                                <div className="col-md">
                                                    <Link to={`/article/detail/${content.id}`}>
                                                        <button type="button" className="btn btn-info">Read More</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                </div>
                            )
                        })
                    }
                    
                </div>
            </div>
        )
    }
}

const mapStatestoProps = state => {
    return {
      token: state.config.token,
      id: state.config.id,
      role: state.config.role
    };
  };
  
  const dispatchToProps = dispatch => {
    return {
      onAddToken: token => dispatch(addToken(token))
    };
  };

export default connect(mapStatestoProps, dispatchToProps)(ArticlesPage);
// export default Login;