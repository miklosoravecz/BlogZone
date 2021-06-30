import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import jwt from "jsonwebtoken";

const Activate = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    token: "",
    show: true,
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);
    //console.log(token)
    if (token) {
      setValues({ ...values, name, token });
    }
  }, [match.params.token, values]);

  const { name, token, /*show*/ } = values;

  const clickSubmit = (event) => {
    event.preventDefault();

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/account-activation`,
      data: { token },
    })
      .then((response) => {
        console.log("ACCOUNT ACTIVATION", response);
        setValues({ ...values, show: false });
        function myTimer() {
          setTimeout(function () {
            window.location.href = "/login";
          }, 2500);
        }
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        myTimer();
      })
      .catch((error) => {
        console.log("ACCOUNT ACTIVATION ERROR", error.response.data.error);
        toast.error(error.response.data.error, {
          position: toast.POSITION.TOP_LEFT,
        });
      });
  };

  const activationLink = () => (
    <div className="container" id="home-container">
      <div className="jumbotron">
        <h1 className="normal-text App">
          Hey {name}, Ready to activate your account?
        </h1>
        <p className="button-centered">
          <button className=" mybutton" onClick={clickSubmit}>
            Activate Account
          </button>
        </p>
      </div>
    </div>
  );

  return (
    <div className="col-d-6 offset-md-3">
      <ToastContainer />
      {activationLink()}
    </div>
  );
};

export default Activate;
