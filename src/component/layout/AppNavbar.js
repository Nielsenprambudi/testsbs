import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deselectToken, deselectRole, deselectUserId } from "./../../store/actions/ConfigAction";
import axios from 'axios';


class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false
        };
    }
    

    componentDidUpdate(prevprops) {
            if(prevprops.token != this.props.token) {
                this.setState({
                    isAuthenticated: true
                });
                axios.defaults.headers.common['Authorization'] = "Bearer" + " " + this.props.token;
                return;
            } 
        
    }

    onLogoutClick() {
        deselectToken();
        deselectUserId();
        deselectRole();
        window.location.reload();
    }

    render () {
        const { isAuthenticated } = this.state;
        return (
            <div className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        SBS Book
                    </Link>
                    <button className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarMain">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarMain">
                        {isAuthenticated == false ? (

                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">
                                        Register
                                    </Link>
                                </li>
                            </ul>
                            ) : null
                        }
                        {isAuthenticated == true ? (
                            <ul className="navbar-nav ml-auto">
                                {
                                    this.props.role == "author" &&
                                    <li className="nav-item">
                                        <Link to="/article/post" className="nav-link">
                                            <i className="fas fa-plus"></i> Create New Article
                                        </Link>
                                    </li>
                                }
                                <li className="nav-item">
                                    <Link to="/profile" className="nav-link">
                                        Profile
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/articles" className="nav-link">
                                        Articles
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link" onClick={this.onLogoutClick}>
                                        Logout
                                    </Link>
                                </li>
                            </ul>

                        ) : null}
                        {/* {allowRegistration && !isAuthenticated ? (
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">
                                        Register
                                    </Link>
                                </li>
                            </ul>
                        ) : null} */}
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
      onDeselectToken: token => dispatch(deselectToken(token)),
      onDeselectId: id => dispatch(deselectUserId(id)),
      onDeselectRole: role => dispatch(deselectRole(role))
    };
  };

export default connect(mapStatestoProps, dispatchToProps)(AppNavbar);
// export default AppNavbar;