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
        console.log("props home", this.props.token)
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

export default connect(mapStatestoProps, dispatchToProps)(Home);
// export default Login;