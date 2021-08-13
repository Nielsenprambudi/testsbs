import React, {Component} from 'react';
import { connect } from "react-redux";
import { addToken, addUserId, addRole } from "./../../store/actions/ConfigAction";
import axios from 'axios';
import { PacmanLoader } from 'react-spinners';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            identity: "",
            password: "",
            alert: "",
            alertMsg: "",
            disabled: false
    
        };
    }

    onSubmit = e => {
        e.preventDefault();
        this.setState({disabled: true});
        axios.post('https://tc-frontend.sebisedu.co.id/api/auth/login', this.state)
        .then(res => {
            this.setState({
                identity: "",
                password: "",
                alert: res.data.status,
                alertMsg: res.data.message,
                disabled: false
            });
            this.props.onAddToken(res.data.access_token);
            this.props.onAddUserId(res.data.current_user.id);
            this.props.onAddRole(res.data.current_user.role);
            axios.defaults.headers.common['Authorization'] = "Bearer" + " " + res.data.access_token;
            this.props.history.push('/');
        })
        .catch(err => {
            this.setState({
                alert: err.response.data.status,
                alertMsg: err.response.data.message,
                disabled: false
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
                            {this.state.alert === "success" ? (
                                <div className="alert alert-success text-center" role="alert"> 
                                    {this.state.alertMsg}
                                </div>)
                                : this.state.alert === "error" ? 
                                <div className="alert alert-danger text-center" role="alert" >
                                    {this.state.alertMsg}
                                </div> 
                                : null
                            }

                            <h1 className="text-center pb-4 pt-3">
                                <div className="text-primary">
                                    <i className="fas fa-lock"></i> Login</div>
                            </h1>

                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="identity">Email</label>
                                    <input type="text"
                                        className="form-control"
                                        name="identity"
                                        required
                                        value={this.state.identity}
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
                                {
                                    this.state.disabled === false ?
                                    <input type="submit" value="Submit" className="btn btn-primary btn-block" /> :
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
      onAddToken: token => dispatch(addToken(token)),
      onAddUserId: userid => dispatch(addUserId(userid)),
      onAddRole: role => dispatch(addRole(role))
    };
  };

export default connect(mapStatestoProps, dispatchToProps)(Login);
// export default Login;