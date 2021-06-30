import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmileBeam } from "@fortawesome/free-solid-svg-icons";
import { isAuth, getCookie, tokenIsExpired, signout } from "../auth/helpers";
import { Link, Redirect } from "react-router-dom";
import { read } from "../auth/user";
import DefaultProfile from "../images/default_avatar.jpg";
import DeleteUser from "./DeleteUser";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      redirectToSignin: false,
    };
  }

  init = (userID) => {
    const token = getCookie().token;
    read(userID, token).then((data) => {
      if (tokenIsExpired()) {
        signout();
        this.setState({ redirectToSignin: true });
      } else {
        this.setState({ user: data });
      }
    });
  };

  componentDidMount() {
    const userID = this.props.match.params.userID;
    this.init(userID);
  }

  componentWillReceiveProps(props) {
    const userID = props.match.params.userID;
    this.init(userID);
  }

  render() {
    // console.log(tokenIsExpired());
    // console.log(isAuth());
    // console.log(this.state.user._id);
    // console.log(isAuth()._id );
    const { redirectToSignin, user } = this.state;
    if (redirectToSignin) return <Redirect to="/login" />;

    const photoLink = user._id
      ? `${process.env.REACT_APP_API}/user/photo/${
          user._id
        }?${new Date().getTime()}`
      : DefaultProfile;

    return (
      <div className="container" id="profile-container">
        <div className="jumbotron">
          <div className="jumbotron App">
            <h1 className="App">Profile</h1>

            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email adress</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody className="normal-text">
                <tr>
                  <th>
                    <FontAwesomeIcon
                      icon={faSmileBeam}
                      className="font2"
                      spin
                    />
                  </th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              </tbody>
            </table>
            <h4>Profile picture:</h4>

            <img
              id="edit-avatar"
              src={photoLink}
              onError={(i) => (i.target.src = `${DefaultProfile}`)}
              alt={user.name}
            />

            <p></p>
            <p className="button-centered">{`Joined ${new Date(
              user.created
            ).toDateString()}`}</p>

            {isAuth() && isAuth()._id === user._id && (
              <p className="button-centered normal-text">
                <Link
                  className="btn link-color"
                  to={`/user/update/${this.state.user._id}`}
                >
                  <button className="mybutton">Update profile</button>
                </Link>
              </p>
            )}
          </div>
          <div className="jumbotron App">
            <img
              className="image"
              src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg"
              alt="profile"
            ></img>
          </div>
          {isAuth() && isAuth()._id === user._id && (
            <div className="jumbotron App">
              <h2>Delete profile</h2>

              <DeleteUser userID={user._id} />

              <p className="normal-text">
                Are you sure about that, you would like to delete your profile?
                If you press the delete button all of your data will lost and
                you won't be able to re-enter to the site until that you will be
                registered again.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Profile;
