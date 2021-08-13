import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppNavbar from "./component/layout/AppNavbar";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import Home from "./component/layout/Home";
import Profile from "./component/layout/Profile";
import ArticlesPage from "./component/layout/ArticlesPage";
import CreateArticle from "./component/layout/CreateArticle";
import ArticleDetail from "./component/layout/ArticleDetail";
import { Provider } from "react-redux";
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
                <Route exact path="/" component={Home} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/articles" component={ArticlesPage} />
                <Route exact path="/article/detail/:id" component={ArticleDetail} />
                <Route exact path="/article/detail/:id/edit" component={CreateArticle} />
                <Route exact path="/article/post" component={CreateArticle} />
                <Route exact path="/article/post/:id" component={CreateArticle} />
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
