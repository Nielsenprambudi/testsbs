import React, {Component} from 'react';
import { connect } from "react-redux";
import { addToken } from "../../store/actions/ConfigAction";
import axios from 'axios';

class ArticlesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        };
    }

    componentDidMount() {
        axios.get('https://tc-frontend.sebisedu.co.id/api/article', {headers: {Authorization: 'Bearer ' + this.props.token}})
        .then(res => {
            console.log("res data", res.data.data)
            this.setState({
                articles: res.data.data
            })
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 mx-auto">
                    {
                        this.state.articles.map((content, i) => {
                            return (
                                <div>
                                    <div className="card">
                                        <img src="" className = "card-img-top"/>
                                        <div className="card-body">                           
                                            <h1 className="text-center">{content.title}</h1>
                                        </div>
                                    </div>
                                    <br/>
                                </div>
                            )
                        })
                    }
                    
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

export default connect(mapStatestoProps, dispatchToProps)(ArticlesPage);
// export default Login;