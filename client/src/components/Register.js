import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserAstronaut,
  faAt,
  faKey,
} from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
  const [values, setValues] = useState({
    name: "Test User",
    email: "your email adress",
    password: "",
    buttonText: "Register",
  });

  const { name, email, password } = values;

  const handleChange = (name) => (event) => {
    // console.log(event.target.value)
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signup`,
      data: { name, email, password },
    })
      .then((response) => {
        console.log("Signup Success", response);
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          buttonText: "Submitted",
        });
        function myTimer() {
          setTimeout(function () {
            window.location.href = "/";
          }, 2500);
        }
        toast.success(response.data.message);
        myTimer();
      })
      .catch((error) => {
        console.log("SIGNUP ERROR", error.response.data);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error, {
          position: toast.POSITION.TOP_LEFT,
        });
      });
  };

  const signupForm = () => (
    <div className="jumbotron App">
      <h4>
        <label for="username">
          <FontAwesomeIcon icon={faUserAstronaut} className="font3" />
          <b>&ensp; Username&ensp;</b>
        </label>
        <input
          onChange={handleChange("name")}
          value={name}
          type="text"
          className="form-control"
        />
        <br />
        <label for="email">
          &ensp;
          <FontAwesomeIcon icon={faAt} className="font3" />
          <b>&ensp;Email&ensp; </b>
        </label>
        <input
          onChange={handleChange("email")}
          value={email}
          type="email"
          className="form-control"
        />
        <br />
        <label for="psw">
          <FontAwesomeIcon icon={faKey} className="font3" />
          <b>&ensp;Password&ensp;</b>
        </label>

        <input
          onChange={handleChange("password")}
          value={password}
          type="password"
          className="form-control"
        />
      </h4>
      <br />
      <p>
        By creating an account you agree to our{" "}
        <a href="/terms">Terms & Privacy</a>.
      </p>
      <p className="button-centered">
        <button className="mybutton" onClick={clickSubmit}>
          {values.buttonText}
        </button>
      </p>
      <p className="App">
        Already have an account? <a href="/login">Sign in</a>.
      </p>
    </div>
  );

  return (
    <div className="container" id="home-container">
      <ToastContainer
        position="top-right"
        autoClose={2500}
        closeOnClick
        draggable
      />

      <div className="jumbotron">
        <h1>Sign up</h1>
        <p>Please fill in this form to create an account.</p>
        <hr className="hr" />
        {signupForm()}
      </div>
    </div>
  );
};

export default Signup;
