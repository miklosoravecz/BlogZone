import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  getCookie,
  updateUser,
  tokenIsExpired,
  signout,
} from "../auth/helpers";
import { read, update } from "../auth/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserAstronaut,
  faAt,
  faKey,
  faDiceD20,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import DefaultProfile from "../images/default_avatar.jpg";

class EditUser extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      email: "",
      password: "",
      role: "",
      redirectToProfile: false,
      error: "",
      photo: null,
      loading: false,
      fileSize: 0,
    };
  }

  init = (userID) => {
    const token = getCookie().token;
    read(userID, token).then((data) => {
      if (tokenIsExpired()) {
        signout();
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
          password: data.password,
          error: "",
        });
      }
    });
  };

  componentDidMount() {
    const userID = this.props.match.params.userID;
    this.init(userID);
  }

  isValid = () => {
    const { name, password, fileSize, photo } = this.state;
    //100000 is 1 MB
    if (fileSize > 100000) {
      this.setState({
        error: "File size should be less than 1 Mb",
        loading: false,
      });
      return false;
    }
    if (name.length === 0) {
      this.setState({ error: "Name is required", loading: false });
      return false;
    }
    if (!password) {
      this.setState({ error: "Password is required", loading: false });
      return false;
    }
    if (!photo) {
      this.setState({ error: "Photo is required", loading: false });
      return false;
    }
    if (password && password.length >= 1 && password.length <= 5) {
      this.setState({
        error: "Password must be at least 6 characters",
        loading: false,
      });
      return false;
    }
    if (name.length < 6) {
      this.setState({
        error: "Name must be minimum 6 characters",
        loading: false,
      });
      return false;
    } else {
      return true;
    }
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleImageChange = (e) => {
    this.setState({
      photo: e.target.files[0],
      fileSize: e.target.files[0].size,
      error: "",
    });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const userID = this.props.match.params.userID;
      const token = getCookie().token;
      let form_data = new FormData();

      form_data.append("photo", this.state.photo /*, this.state.photo.name*/);
      form_data.append("name", this.state.name);
      form_data.append("password", this.state.password);

      update(userID, token, form_data).then((data) => {
        if (this.error) this.setState({ error: data.error });
        else
          updateUser(data, () => {
            this.setState((state) => {
              function myTimer() {
                setTimeout(function () {
                  const id = userID;
                  // console.log(id)
                  window.location.href = `/user/${id}`;
                }, 2500);
              }
              toast.success("Profile updated successfully!");
              myTimer();
            });
          });
      });
    }
  };

  render() {
    const {
      redirectToProfile,
      id,
      name,
      email,
      password,
      role,
      error,
      loading,
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />;
    }
    //  console.log(id)

    const updateForm = () => (
      <form>
        <div className="jumbotron App">
          <h4 className="App">
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
            <label for="name">
              <FontAwesomeIcon icon={faUserAstronaut} className="font3" />
              <b>&ensp; Username&ensp;</b>
            </label>
            <input
              onChange={this.handleChange("name")}
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
              Value={email}
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
              onChange={this.handleChange("password")}
              value={password}
              type="password"
              className="form-control"
            />
            <label for="photo">
              <FontAwesomeIcon icon={faImage} className="font3" />
              <b>&ensp;Photo&ensp;</b>
            </label>

            <input
              onChange={this.handleImageChange}
              type="file"
              accept="image/*"
              className="form-control"
            />
          </h4>
          <br />
          <p>Password should be minimum 6 characters long</p>
          <p>Username and password required</p>
          <p className="button-centered">
            <button className="mybutton" onClick={this.clickSubmit}>
              Update Profile
            </button>
          </p>
        </div>
      </form>
    );

    //?${new Date().getTime() gives the uploaded image instantly
    const photoLink = id
      ? `${process.env.REACT_APP_API}/user/photo/${id}?${new Date().getTime()}`
      : DefaultProfile;

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

          <p>
            You can change your username and/or password by fill in the form
          </p>
          <hr className="hr" />
          <img
            id="edit-avatar"
            src={photoLink}
            onError={(i) => (i.target.src = `${DefaultProfile}`)}
            alt={name}
          />
          {updateForm(name, email, password)}
          {loading ? (
            <div className="jumbotron text-center alert alert-success">
              <h2>Loading...</h2>
            </div>
          ) : (
            ""
          )}
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  }
}

export default EditUser;
