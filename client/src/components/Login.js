import React, { useState } from "react";
import axios from "axios";
import { authenticate, isAuth } from "../auth/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAstronaut, faKey } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    buttonText: "Submit",
  });

  const { email, password } = values;

  const handleChange = (name) => (event) => {
    // console.log(event.target.value)
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signin`,
      data: { email, password },
    })
      .then((response) => {
        console.log("SIGNIN SUCCESS", response);

        //save the response(user, token) localstorage/cookie

        authenticate(response, () => {
          setValues({
            ...values,
            email: "",
            password: "",
            buttonText: "Submitted",
          });

          toast.success(`Hey ${response.data.user.name}, Welcome back!`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      })
      .catch((error) => {
        console.log("SIGNIN ERROR", error.response.data);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error, {
          position: toast.POSITION.TOP_LEFT,
        });
      });
  };

  const signinForm = () => (
    <form action="action_page.php">
      <div className="container" id="home-container">
        <div className="jumbotron App">
          <h1>Login</h1>
          <p>Please fill in this form to sign in.</p>
          <hr className="hr" />
          <div className="jumbotron ">
            <h4>
              <label for="email">
                <FontAwesomeIcon icon={faUserAstronaut} className="font3" />
                <b>&ensp; Email&ensp;</b>
              </label>
              <input
                onChange={handleChange("email")}
                value={email}
                type="email"
                required
              />
              <label for="psw">
                &ensp; &ensp; &ensp;
                <FontAwesomeIcon icon={faKey} className="font3" />
                <b>&ensp;Password&ensp;</b>
              </label>
              <input
                onChange={handleChange("password")}
                value={password}
                type="password"
                required
              />
            </h4>
          </div>
          <p className="button-centered">
            <button className="mybutton" onClick={clickSubmit}>
              {values.buttonText}
            </button>
          </p>
          <p>
            Don't have an account? <a href="/register">Register</a>.
          </p>
        </div>
      </div>
    </form>
  );

  //set up a timer for 2,5 seconds and after redirect to homepage
  function myTimer() {
    setTimeout(function () {
      window.location.href = "/dash";
    }, 2500);
  }

  //if the user is authenticated caals the timer function, if not gives Null

  return (
    <div>
      <ToastContainer />
      {isAuth() ? myTimer() : null}

      {signinForm()}
    </div>
  );
};

export default Login;
