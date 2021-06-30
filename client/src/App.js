import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Posts from "./components/Posts";
import NewPost from "./components/NewPost";
import Profile from "./components/Profile";
import Signup from "./components/Register";
import Login from "./components/Login";
import Foot from "./components/Foot";
import FootBig from "./components/FootBig";
import Faq from "./components/Faq";
import License from "./components/License";
import Cookies from "./components/Cookies";
import Privacy from "./components/Privacy";
import Terms from "./components/Terms";
import Activate from "./components/Activate";
import Dash from "./components/Dash";
import Users from "./components/Users";
import EditUser from "./components/EditUser";
import PrivateRoute from "./auth/PrivateRoute";



class App extends Component {
  render() {


    return (
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <Route path="/" exact component={Home} />
          <Switch>
            <PrivateRoute path="/dash" exact component={Dash} />
            <PrivateRoute path="/posts" exact component={Posts} />
            <PrivateRoute path="/newpost" exact component={NewPost} />
            <PrivateRoute path="/user/:userID" exact component={Profile} />
            <PrivateRoute path="/user/update/:userID" exact component={EditUser} />
            <PrivateRoute path="/users" exact component={Users} />
            <Route path="/register" exact component={Signup} />
            <Route path="/login" exact component={Login} />
            <Route path="/faq" exact component={Faq} />
            <Route path="/licenses" exact component={License} />
            <Route path="/privacy" exact component={Privacy} />
            <Route path="/cookies" exact component={Cookies} />
            <Route path="/terms" exact component={Terms} />
            <Route path="/auth/activate/:token" component={Activate} />
          </Switch>
          <FootBig />
          <Foot />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
