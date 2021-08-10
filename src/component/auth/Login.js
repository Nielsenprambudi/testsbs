import React, {Component} from 'react';
import { connect } from "react-redux";
import { addToken } from "./../../store/actions/ConfigAction";
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            identity: "",
            password: "",
            alert: "",
            disabled: false
    
        };
    }

    onSubmit = e => {
        e.preventDefault();
        console.log(this.state)
        this.setState({disabled: true});
        axios.post('https://tc-frontend.sebisedu.co.id/api/auth/login', this.state)
        .then(res => {
            console.log("state", res.data);
            this.setState({
                identity: "",
                password: "",
                alert: res.data.status,
                disabled: false
            });
            this.props.onAddToken(res.data.access_token);
            axios.defaults.headers.common['Authorization'] = "Bearer" + " " + res.data.access_token;
            this.props.history.push('/');
        })
        .catch(err => console.log(err))
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
                                    Login Success
                                </div>)
                                : this.state.alert == "error" ? 
                                <div className="alert alert-danger text-center" role="alert" >
                                    Please check your connection or make sure you input the right username or password
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
                                <input type="submit" value="Submit" className="btn btn-primary btn-block" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStatestoProps = state => {
    // console.log(state)
    return {
      token: state.config.token
    };
  };
  
  const dispatchToProps = dispatch => {
    return {
      onAddToken: token => dispatch(addToken(token))
    };
  };

export default connect(mapStatestoProps, dispatchToProps)(Login);
// export default Login;