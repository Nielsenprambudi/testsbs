import React, {Component} from 'react';
import { connect } from "react-redux";
import { addToken } from "../../store/actions/ConfigAction";
import axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
    
        };
    }

    componentDidMount() {
        if(this.props.token) {
            this.getProfileCurrent(this.props.token);
        }
    }

    getProfileCurrent(token) {
        axios.get('https://tc-frontend.sebisedu.co.id/api/user/profile')
        .then(res => {
            this.setState({
                name: res.data.current_user.name
            });
        })
    }

    render() {
        
        return (
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            {this.state.name ? <h1 className="text-center">{this.state.name + ","}</h1> : null}                            
                            <h1 className="text-center">Selamat Datang di SBS Book</h1>
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

export default connect(mapStatestoProps, dispatchToProps)(Home);
// export default Login;