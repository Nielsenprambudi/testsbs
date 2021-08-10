import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deselectToken } from "./../../store/actions/ConfigAction";


class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false
        };
    }
    
    componentDidMount() {
        
    }

    componentDidUpdate(prevprops) {
            if(prevprops.token != this.props.token) {
                this.setState({
                    isAuthenticated: true
                });
                return;
            } 
        
    }

    onLogoutClick() {
        this.props.onDeselectToken(this.props.token);
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
                                <li className="nav-item">
                                    <a href="!#" className="nav-link">
                                        Profile
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <Link to="/articles" className="nav-link">
                                        Articles
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={this.onLogoutClick}>
                                        Logout
                                    </a>
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
      token: state.config.token
    };
  };
  
  const dispatchToProps = dispatch => {
    return {
      onDeselectToken: token => dispatch(deselectToken(token))
    };
  };

export default connect(mapStatestoProps, dispatchToProps)(AppNavbar);
// export default AppNavbar;