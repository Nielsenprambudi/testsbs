import React, {Component} from 'react';
import { connect } from "react-redux";
import { addToken } from "../../store/actions/ConfigAction";
import axios from 'axios';
import { PacmanLoader } from 'react-spinners';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            password: "",
            new_password: "",
            name: "",
            address: "",
            role: "",
            avatar_url: "",
            temp_avatar: null,
            alert: "",
            alertMsg: "",
            alertImg: "",
            alertImgMsg: "",
            disabledProf: false,
            disabledPass: false
        };
    }

    componentDidMount() {
        this.getUser(this.props.id);
    }

    getUser(id) {
        axios.get('https://tc-frontend.sebisedu.co.id/api/user/' + id)
        .then(res => {
            this.setState({
                id: id,
                password: "",
                new_password: "",
                name: res.data.data.name,
                address: res.data.data.address,
                role: res.data.data.role,
                avatar_url: res.data.data.avatar_url,
                temp_avatar: res.data.data.avatar_url
            })
            
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
            temp_avatar: urlImg
        });
        const config = {
            headers: {'content-type': 'multipart/form-data'}
        }
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        axios.post('https://tc-frontend.sebisedu.co.id/api/img', formData, config)
        .then(res => {
            this.setState({
                avatar_url: res.data.data,
                alertImg: res.data.status,
                alertMsg: res.data.message,
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

    onSubmitProfile = e => {
        e.preventDefault();
        this.setState({
            disabledProf: true
        });
        axios.put('https://tc-frontend.sebisedu.co.id/api/user/' + this.state.id, this.state)
        .then(res => {
            this.getUser(this.state.id)
            this.setState({
                alert: res.data.status,
                alertMsg: res.data.message,
                disabledProf: false
            })
        })
        .catch(err => {
            this.setState({
                alert: err.response.data.status,
                alertMsg: err.response.data.message,
                disabledProf: false
            })
        })
    }

    onSubmitPassword = e => {
        e.preventDefault();
        this.setState({
            disabledPass: true
        });
        axios.put('https://tc-frontend.sebisedu.co.id/api/change-password', this.state)
            .then(res => {
                this.setState({
                    password: "",
                    new_password: "",
                    disabledPass: false

                })
            })
        .catch(err => {
            this.setState({
                alert: err.response.data.status,
                alertMsg: err.response.data.message,
                disabledPass: false
            })
        })
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
                                    <i className="fas fa-lock"></i> Profile</div>
                            </h1>

                            <label htmlFor="fotoTransfer">Upload Avatar</label>
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
                                this.state.temp_avatar ? (
                                    <img src={this.state.temp_avatar} className="img-thumbnail"/>
                                ) : null
                            }
                            <form onSubmit={this.onSubmitProfile}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text"
                                        className="form-control"
                                        name="name"
                                        required
                                        value={this.state.name}
                                        onChange={this.onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <input type="text"
                                        className="form-control"
                                        name="address"
                                        required
                                        value={this.state.address}
                                        onChange={this.onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="role">Role</label>
                                    <select 
                                        className="form-select form-control"
                                        name="role"
                                        required
                                        value={this.state.role}
                                        onChange={this.onChange}
                                    >
                                        <option value="author">Author</option>
                                        <option value="visitor">Visitor</option>
                                    </select>
                                </div>
                                {
                                    this.state.disabledProf === false ?
                                    <input type="submit" value="Update" className="btn btn-primary btn-block" /> :
                                    <PacmanLoader loading={true} color={'#007bff'} css={'margin: 0 auto; display: block'}/>
                                }
                            </form>
                            <hr/>
                            <h2>Change Password</h2>
                            <hr/>
                            <form onSubmit={this.onSubmitPassword}>
                                <div className="form-group">
                                    <label htmlFor="password">Old Password</label>
                                    <input type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="new_password">New Password</label>
                                    <input type="password"
                                        className="form-control"
                                        name="new_password"
                                        value={this.state.new_password}
                                        onChange={this.onChange} />
                                </div>
                                {
                                    this.state.disabledPass === false ?
                                    <input type="submit" value="Update Password" className="btn btn-primary btn-block" /> :
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

export default connect(mapStatestoProps, dispatchToProps)(Profile);
// export default Login;