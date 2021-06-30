import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmileBeam } from "@fortawesome/free-solid-svg-icons";
import blogzone from "../images/blogzone.jpg";

class Home extends Component {
  render() {
    return (
      <div className="container" id="home-container">
        <div className="jumbotron App">
          <h1>Welcome to BlogZone!</h1>

          <p className="normal-text">
            On the site you can register, login to the system and create your
            own blog posts.
          </p>
        </div>

        <img className="image" src={blogzone} alt="Mount"></img>

        <div>
          <h2 className="normal-text">Let's start here:</h2>
          <a href="/register" className="icon-block">
            <span className="font">
              Register <FontAwesomeIcon icon={faSmileBeam} spin />
            </span>
          </a>
        </div>
      </div>
    );
  }
}

export default Home;
