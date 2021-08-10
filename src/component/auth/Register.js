import React, {Component} from 'react';
import { connect } from "react-redux";
import { addToken } from "./../../store/actions/ConfigAction";
import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            name: "",
            address: "",
            role: "author",
            avatar_url: "",
            temp_avatar: null,
            alert: "",
            disabled: false
        };
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
                avatar_url: res.data.data
            });
        })
        .catch(err => console.log(err))
    }

    onSubmit = e => {
        e.preventDefault();
        this.setState({
            disabled: true
        });
        axios.post('https://tc-frontend.sebisedu.co.id/api/auth/register', this.state)
        .then(res => {
            console.log("res data status", res.data);
            this.setState({
                email: "",
                username: "",
                password: "",
                name: "",
                address: "",
                role: "author",
                avatar_url: "",
                temp_avatar: null,
                alert: res.data.status,
                disabled: false
            })
            
        })
        .catch(err => this.setState({alert: "error"}))
    }

    onChange = e => this.setState({[e.target.name]: e.target.value});

    render() {
        return (
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            {this.state.alert == "success" ? (
                                <div className="alert alert-success text-center" role="alert"> 
                                    Registrations Success
                                </div>)
                                : this.state.alert == "error" ? 
                                <div className="alert alert-danger text-center" role="alert" >
                                    Registration Failed
                                </div> 
                                : null
                            }
                            <h1 className="text-center pb-4 pt-3">
                                <div className="text-primary">
                                    <i className="fas fa-lock"></i> Register</div>
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
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="text"
                                        className="form-control"
                                        name="email"
                                        required
                                        value={this.state.email}
                                        onChange={this.onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text"
                                        className="form-control"
                                        name="username"
                                        required
                                        value={this.state.username}
                                        onChange={this.onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password"
                                        className="form-control"
                                        name="password"
                                        required
                                        value={this.state.password}
                                        onChange={this.onChange} />
                                </div>
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
                                <input type="submit" value="Submit" disabled={this.state.disabled} className="btn btn-primary btn-block" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStatestoProps = state => {
    console.log(state)
    return {
      token: state.config.token
    };
  };
  
  const dispatchToProps = dispatch => {
    return {
      onAddToken: token => dispatch(addToken(token))
    };
  };

export default connect(mapStatestoProps, dispatchToProps)(Register);
// export default Login;