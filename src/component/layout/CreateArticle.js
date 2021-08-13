import React, {Component} from 'react';
import { connect } from "react-redux";
import { addToken } from "../../store/actions/ConfigAction";
import axios from 'axios';
import { PacmanLoader } from 'react-spinners';

class CreateArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            feature_image_url: "",
            temp_feature: null,
            alert: "",
            alertMsg: "",
            alertImg: "",
            alertImgMsg: "",
            disabled: false
        };
    }

    componentDidMount() {
        if(this.props.match.params.id) {
            this.getArticleDetail(this.props.match.params.id);
        }
    }

    getArticleDetail(id) {
        axios.get('https://tc-frontend.sebisedu.co.id/api/article/' + id)
        .then(res => {
            this.setState({
                title: res.data.data.title,
                content: res.data.data.content,
                feature_image_url: res.data.data.feature_image_url,
                temp_feature: res.data.data.feature_image_url
            });
        })
        .catch(err => {this.setState({
            alert: err.response.data.status,
            alertMsg: err.response.data.message,
        })})
    }

    fileUpload = {
        file: null
    }

    fileSelectHandler = (event) => {
        let urlImg = URL.createObjectURL(event.target.files[0]);
        this.setState({
            temp_feature: urlImg
        });
        const config = {
            headers: {'content-type': 'multipart/form-data'}
        }
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        axios.post('https://tc-frontend.sebisedu.co.id/api/img', formData, config)
        .then(res => {
            this.setState({
                feature_image_url: res.data.data,
                alertImg: res.data.status,
                alertMsg: res.data.message
            });
        })
        .catch(err => 
            {
                this.setState({
                alertImg: err.response.data.status,
                alertImgMsg: err.response.data.message
            })}
        )
    }

    onSubmit = e => {
        e.preventDefault();
        this.setState({
            disabled: true
        });
        if(this.props.match.params.id) {
            axios.put('https://tc-frontend.sebisedu.co.id/api/article/' + this.props.match.params.id , this.state)
            .then(res => {
                this.setState({
                    title: "",
                    content: "",
                    feature_image_url: "",
                    temp_feature: null,
                    alert: res.data.status,
                    alertMsg: res.data.message,
                    disabled: false
                })
                
            })
            .catch(err => {this.setState({
                alert: err.response.data.status,
                alertMsg: err.response.data.message,
                disabled: false
            })})    
        } else {
            axios.post('https://tc-frontend.sebisedu.co.id/api/article', this.state)
            .then(res => {
                this.setState({
                    title: "",
                    content: "",
                    feature_image_url: "",
                    temp_feature: null,
                    alert: res.data.status,
                    alertMsg: res.data.message,
                    disabled: false
                })
                
            })
            .catch(err => {this.setState({
                alert: err.response.data.status,
                alertMsg: err.response.data.message,
                disabled: false
            })})
        }
    }

    onChange = e => this.setState({[e.target.name]: e.target.value});

    render() {
        return (
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            {this.state.alertImg == "success" ? (
                                <div className="alert alert-success text-center" role="alert"> 
                                    {this.state.alertImgMsg}
                                </div>)
                                : this.state.alertImg == "error" ? 
                                <div className="alert alert-danger text-center" role="alert" >
                                    {this.state.alertImgMsg}
                                </div> 
                                : null
                            }
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
                            <h1 className="text-center pb-4 pt-3">
                                <div className="text-primary">
                                    Create Awesome Article</div>
                            </h1>

                            <label htmlFor="fotoTransfer">Upload Feature Image</label>
                            <div className="form-group">
                                <input
                                    type="file"
                                    autoComplete="Off"
                                    className="btn-default"
                                    name="fotoTransfer"
                                    onChange={this.fileSelectHandler}
                                    accept="image/*" />
                            </div>
                            {
                                this.state.temp_feature ? (
                                    <img src={this.state.temp_feature} className="img-thumbnail"/>
                                ) : null
                            }
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text"
                                        className="form-control"
                                        name="title"
                                        required
                                        value={this.state.title}
                                        onChange={this.onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="content">Content</label>
                                    <textarea type="text"
                                        className="form-control"
                                        name="content"
                                        required
                                        value={this.state.content}
                                        onChange={this.onChange} />
                                </div>
                                {
                                    this.state.disabled === false ?
                                    <input type="submit" value="Post" className="btn btn-primary btn-block" /> :
                                    <PacmanLoader loading={true} color={'#007bff'} css={'margin: 0 auto; display: block'}/>
                                }
                            </form>
                        </div>
                    </div>
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

export default connect(mapStatestoProps, dispatchToProps)(CreateArticle);
// export default Login;