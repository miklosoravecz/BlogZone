import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth, signout } from "../auth/helpers";
import {
  faIgloo,
  faPlusSquare,
  faSignInAlt,
  faRegistered,
  faSkull,
  faAnkh,
  faUsers,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Navbar extends Component {
  render() {
    return (
      <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <nav className="navbar navbar-inverse navbar-fixed-top">
          {isAuth() ? (
            <Link
              to="/dash"
              className="navbar-brand"
              type="button"
              data-toggle="collapse"
              data-target="#collapsibleNavbar"
            >
              <FontAwesomeIcon icon={faIgloo} /> Home
            </Link>
          ) : (
            <Link
              to="/"
              className="navbar-brand"
              type="button"
              data-toggle="collapse"
              data-target="#collapsibleNavbar"
            >
              <FontAwesomeIcon icon={faIgloo} /> BlogZone
            </Link>
          )}
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="nav navbar-nav">
              {isAuth() && (
                <Fragment>
                  <li className="nav navbar-nav">
                    <Link to="/posts" className="nav-link">
                      <FontAwesomeIcon icon={faAnkh} /> Posts
                    </Link>
                  </li>
                  <li className="nav navbar-nav">
                    <Link to="/newpost" className="nav-link">
                      <FontAwesomeIcon icon={faPlusSquare} /> New Post
                    </Link>
                  </li>
                  <li className="nav navbar-nav">
                    <Link to="/users" className="nav-link">
                      <FontAwesomeIcon icon={faUsers} /> Users
                    </Link>
                  </li>
                  <li className="nav navbar-nav">
                    <Link to={`/user/${isAuth()._id}`} className="nav-link">
                      <FontAwesomeIcon icon={faUserAlt} /> {isAuth().name}'s
                      Profile
                    </Link>
                  </li>
                </Fragment>
              )}
            </ul>
            <ul className="nav navbar-nav navbar-right">
              {!isAuth() && (
                <Fragment>
                  <li>
                    <Link to="/login" className="nav-link">
                      <FontAwesomeIcon icon={faSignInAlt} /> Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="nav-link">
                      <FontAwesomeIcon icon={faRegistered} /> Register&ensp;
                    </Link>
                  </li>
                </Fragment>
              )}
              {isAuth() && (
                <li>
                  <Link
                    to="/"
                    className="nav-link"
                    onClick={() => {
                      signout(() => {
                        this.props.history.push("/");
                      });
                    }}
                  >
                    <FontAwesomeIcon icon={faSkull} /> Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default withRouter(Navbar);
