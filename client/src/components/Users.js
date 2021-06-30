import React, { Component } from "react";
import { list } from "../auth/user";
import DefaultProfile from "../images/default_avatar.jpg";
import { Link } from "react-router-dom";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    list().then((data) => {
      if (!data) {
        console.log(data.error);
      } else {
        this.setState({ users: data });
      }
    });
  }

  renderUsers = (users) => (
    <div className="row ">
      {users.map((user, i) => (
        <div className="card col-md-4" key={i}>
          <img
            className="users-images"
            src={`${process.env.REACT_APP_API}/user/photo/${user._id}`}
            onError={(i) => (i.target.src = `${DefaultProfile}`)}
            alt={user.name}
          />

          <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
            <p className="card-text">{user.email}</p>

            <Link
              to={`/user/${user._id}`}
              className="btn btn-primary btn-sm mybutton"
            >
              View Profile
            </Link>
          </div>
        </div>
      ))}
    </div>
  );

  render() {
    const { users } = this.state;
    //console.log(users)
    return (
      <div className="container" id="home-container">
        <div className="jumbotron App">
          <h1>Users</h1>
          <p>You can find here the other users profiles</p>
          <hr className="hr" />
        </div>
        <div className="jumbotron">{this.renderUsers(users)}</div>
      </div>
    );
  }
}

export default Users;
