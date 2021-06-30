import React, { useState, useEffect } from "react";
import axios from "axios";
import {isAuth, getCookie, signout, updateUser} from '../auth/helpers';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserAstronaut,
  faAt,
  faKey,
  faDiceD20,
  faImage
} from "@fortawesome/free-solid-svg-icons";

const Update = ({history}) => {
  const [values, setValues] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
    buttonText: "Update",
  });

  const token = getCookie('token');

  useEffect(()=> {
    loadProfile();
}, [])

const loadProfile = () => {
    axios({
        method: 'GET',
        url:`${process.env.REACT_APP_API}/user/${isAuth()._id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        console.log('PRIVATE PROFILE UPDATE', response)
        const{ role, name, email, photo} = response.data
        setValues({...values, role,name, email, photo})
    })
    .catch(error => {
        console.log('PROFILE UPDATE ERROR', error.response.data.error )
        if(error.response.status ===401){
            signout(()=> {
                history.push('/');
            });
        }
    });
};

  const { role, name, email, password } = values;

  const handleChange = (name) => (event) => {
    // console.log(event.target.value)
    setValues({ ...values, [name]: event.target.value });
    
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/user/update`,
      headers: {
        Authorization: `Bearer ${token}`
    },
        data: { name, password },
    })
      .then((response) => {
        console.log("PROFILE UPDATE SUCCESS", response);
        updateUser(response, () => {
            setValues({
                ...values,
                buttonText: "Submitted",
              });
              function myTimer() {
                setTimeout(function () {
                  window.location.href = "/";
                }, 2500);
              }
              toast.success('Profile updated successfully!');
              myTimer();
        })
        
      })
      .catch((error) => {
        console.log("UPDATE ERROR", error.response.data.error);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error, {
          position: toast.POSITION.TOP_LEFT,
        });
      });
  };

  const updateForm = () => (
    <form>
    <div className="jumbotron App">
      <h4 className = "App">
      <label for="role">
          &ensp;
          <FontAwesomeIcon icon={faDiceD20} className="font3" />
          <b>&ensp;Role&ensp; </b>
        </label>
        <input
          defaultValue={role}
          type="text"
          className="form-control"
          disabled
        />
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
          defaultValue={email}
          type="email"
          className="form-control"
          disabled
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
        <label for="photo">
          <FontAwesomeIcon icon={faImage} className="font3" />
          <b>&ensp;Photo&ensp;</b>
        </label>

        <input
          onChange={handleChange("photo")}
          type="file"
          accept="image/*"
          className="form-control"
        />
      </h4>
      <br />
      <p>
        Password should be minimum 6 characters long and username can't be empty
      </p>
      <p className="button-centered">
        <button className="mybutton" onClick={clickSubmit}>
          {values.buttonText}
        </button>
      </p>
    </div>
    </form>
  );

  return (
    <div className="container" id="home-container">
      <ToastContainer
        position="top-right"
        autoClose={2500}
        closeOnClick
        draggable
      />
     
      <div className="jumbotron App">
        <h1>Update profile</h1>
        <p>You can change your username and/or password by fill in the form</p>
        <hr className="hr" />
        {updateForm()}
      </div>
    </div>
  );
};

export default Update;