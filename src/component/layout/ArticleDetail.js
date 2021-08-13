import React, {Component} from 'react';
import { connect } from "react-redux";
import { addToken } from "../../store/actions/ConfigAction";
import axios from 'axios';
import logo from './../../logo.svg';
import { Link } from "react-router-dom";

class ArticleDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {},
            comments: [],
            author_name: "",
            openModal: false,
            comment_text: "",
            openeditor: false,
            comment_text_edit: "",
            comment_id: 0,
            alert: "",
            alertMsg: ""
        };
    }

    componentDidMount() {
        this.getArticle();
    }

    getArticle() {
        axios.get('https://tc-frontend.sebisedu.co.id/api/article/' + this.props.match.params.id)
        .then(res => {
            this.setState({
                article: res.data.data,
                comments: res.data.data.comments
            });
            this.getNameAuthor(res.data.data.user_id);
        })
        .catch(err => {this.setState({
            alert: err.response.data.status,
            alertMsg: err.response.data.message,
        })})

    }

    deleteArticle = () => {
        axios.delete('https://tc-frontend.sebisedu.co.id/api/article/' + this.state.article.id)
        .then(res => {
            this.props.history.push('/articles');
        })
        .catch(err => {this.setState({
            alert: err.response.data.status,
            alertMsg: err.response.data.message,
        })})
    }

    getNameAuthor(author_id) {
        axios.get('https://tc-frontend.sebisedu.co.id/api/user/' + author_id)
        .then(res => {
            this.setState({
                author_name: res.data.data.name
            });
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

    openModal = () => {
        if(this.state.openModal == true) {
            this.setState({
                openModal: false
            })
        } else {
            this.setState({
                openModal: true
            })
        }
    }

    postComment = () => {
        axios.post('https://tc-frontend.sebisedu.co.id/api/article/' + this.props.match.params.id + '/comment', this.state)
        .then(res => {
            this.getArticle();
            this.setState({
                comment_text: ""
            })
        })
        .catch(err => {this.setState({
            alert: err.response.data.status,
            alertMsg: err.response.data.message,
        })})
    }

    updateComment = () => {
        axios.put('https://tc-frontend.sebisedu.co.id/api/comment/' + this.state.comment_id, {comment_text: this.state.comment_text_edit})
        .then(res => {
            this.getArticle();
            this.closeEditor();
        })
        .catch(err => {this.setState({
            alert: err.response.data.status,
            alertMsg: err.response.data.message,
        })})
    }

    delComment = (com) => {
        axios.delete('https://tc-frontend.sebisedu.co.id/api/comment/' + com.id)
        .then(res => {
            this.getArticle();
        })
        .catch(err => {this.setState({
            alert: err.response.data.status,
            alertMsg: err.response.data.message,
        })})
    }

    openEditor = (com) => {
        this.setState({
            openeditor: true,
            comment_text_edit: com.comment_text,
            comment_id: com.id
        })
    }

    closeEditor = () => {
        this.setState({
            openeditor: false,
            comment_text_edit: "",
            comment_id: 0
        })
    }

    onChange = e => this.setState({[e.target.name]: e.target.value});

    render() {
        const {article, author_name, openModal, comments, openeditor} = this.state;
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
                {
                    openModal == true ?
                    <div className="col-md-6 mx-auto">
                        <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Warning</h5>
                        </div>
                        <div className="card-body">
                            <p>Are you sure you want to delete this article</p>
                            <button type="button" className="btn btn-danger" onClick={this.deleteArticle}>Delete</button>
                            <button type="button" className="btn btn-secondary" onClick={this.openModal} data-dismiss="modal">Cancel</button>
                        </div>
                        </div>
                    </div> : null
                }
                {
                    openeditor == true ?
                    <div className="col-md-6 mx-auto">
                        <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Edit Comment</h5>
                        </div>
                        <div className="card-body">
                            <textarea type="text"
                                className="form-control"
                                name="comment_text_edit"
                                required
                                value={this.state.comment_text_edit}
                                onChange={this.onChange} 
                            />
                            
                            <button type="button" className="btn btn-primary" onClick={() => {this.updateComment()}}>Update</button>
                            <button type="button" className="btn btn-secondary" onClick={() => this.closeEditor()} data-dismiss="modal">Cancel</button>
                        </div>
                        </div>
                    </div> : null
                }
                {
                    openModal == false && openeditor == false ?
                    <div className="col-md-12 mx-auto">
                        <div>
                            <div className="card">
                                {
                                    article.featured_image_url == "" ?
                                    <img src={logo} className = "card-img-top"/> :
                                    <img src={'https://tc-frontend.sebisedu.co.id/api/' + article.featured_image_url} className = "card-img-top"/>
                                }
                                <div className="card-body">                           
                                    <h1 className="text-center">{article.title}</h1>
                                    <h3 className="text-center">{article.content}</h3>
                                    <footer className="blockquote_footer">By <cite>{author_name}</cite></footer>
                                    <footer className="blockquote_footer">Updated <cite>{article.updated_at}</cite></footer>
                                    <div className="row">
                                        {
                                            this.props.id == article.user_id && this.props.role == "author" ?
                                            <div className="col-md">
                                                <Link to={`${article.id}/edit`}>
                                                    <button type="button" className="btn btn-primary">Edit Article</button>
                                                </Link>
                                            </div> : null
                                        }
                                        {
                                            this.props.id == article.user_id && this.props.role == "author" ?
                                            <div className="col-md">
                                                <button type="button" onClick={this.openModal} data-toggle="deleteArticle" className="btn btn-danger">Delete Article</button>
                                            </div> : null
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div> : null
                }
                {
                    openModal == false && openeditor == false ?
                    <div className="col-md-12 mx-auto">
                        <hr/>
                        <h2>Comments ({comments.length})</h2>
                        {
                            this.props.role == "visitor" &&
                            <div>
                                <hr/>
                                <textarea type="text"
                                    className="form-control"
                                    name="comment_text"
                                    required
                                    value={this.state.comment_text}
                                    onChange={this.onChange} 
                                />
                                <br/>
                                <button type="button" onClick={this.postComment} className="btn btn-primary">Post Comment</button>
                            </div>
                        }
                        <br/>
                        {
                            comments.length == 0 || comments.length == undefined ? null : 
                            comments.map((com, i) => {
                                return (
                                    <div key={i}>
                                        <div className="card">
                                            <div className="card-body">                        
                                                <p>{com.comment_text}</p>
                                                <footer className="blockquote_footer">Updated <cite>{this.convertDate(com.updated_at)}</cite></footer>
                                                <div className="row">
                                                    <div className="col-md-3 mx-auto">
                                                        <button type="button" onClick={() => this.openEditor(com)} className="btn btn-primary">Edit</button>
                                                    </div>
                                                    <div className="col-md-3 mx-auto">
                                                        <button type="button" onClick={() => this.delComment(com)} className="btn btn-danger">Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br/>
                                    </div>
                                )
                            })
                        }
                    </div> : null
                }

                
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

export default connect(mapStatestoProps, dispatchToProps)(ArticleDetail);
// export default Login;