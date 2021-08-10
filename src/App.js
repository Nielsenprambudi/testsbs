import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppNavbar from "./component/layout/AppNavbar";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import Home from "./component/layout/Home";
// import Profile from "./component/layout/Profile";
import ArticlesPage from "./component/layout/ArticlesPage";
// import WriterManageArticles from "./component/layout/WriterManageArticles";
// import PostComment from "./component/layout/PostComment";
// import ArticleDetail from "./component/layout/ArticleDetail";
import { Provider, connect } from "react-redux";
import { addToken } from "./store/actions/ConfigAction";
import ConfigureStore from "./store/ConfigureStore";
import './App.css';

class App extends Component {
  render() {
    const store = ConfigureStore();
    return (
      <Provider store={store.store}>

          <Router>
            <AppNavbar/>
            <div className="container">
              <Switch>
                {/* <Route exact path="/" component={UserIsAuthenticated(ArticlesPage)} /> */}
                {/* <Route exact path="/client/add" component={AddClient} />
                <Route exact path="/client/edit/:id" component={UserIsAuthenticated(EditClient)} />
                <Route exact path="/client/:id" component={UserIsAuthenticated(ClientDetails)} /> */}
                {/* <Route exact path="/Profile/:id" component={UserIsNotAuthenticated(Profile)} /> */}
                <Route exact path="/" component={Home} />
                <Route exact path="/articles" component={ArticlesPage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
              </Switch>
            </div>  
          </Router>
      </Provider>
    );
  }
}



export default App;
