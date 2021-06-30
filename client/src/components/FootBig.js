import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";

class FootBig extends Component {
  render() {
    return (
      <div className="container" id="contact-container">
        <div className="jumbotron">
          <h1>Contact</h1>
          <p className="normal-text">
            <FontAwesomeIcon icon={faWrench} />
            Contact us or check the
            <a href="/faq"> Faq </a>
            part for more information
          </p>
          <p className="normal-text">Email: blogzone@example.com</p>
        </div>
        
        <p>
          <a href="/faq"> Faq </a>
        </p>
        <p>
          <a href="/privacy"> Privacy Policy </a>
        </p>
        <p>
          <a href="/cookies"> Cookies Policy </a>
        </p>
        <p>
          <a href="/licenses"> Licenses </a>
        </p>
        <p>
          <a href="/terms"> Terms and conditions </a>
        </p>
      </div>
    );
  }
}

export default FootBig;
