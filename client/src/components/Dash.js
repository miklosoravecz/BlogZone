import React from "react";
import { isAuth, getTime } from "../auth/helpers";

const Dash = () => {
  //send login time from token to localstorage
  getTime();
  const dashPage = () => (
    <div className="container App" id="home-container">
      <div className="jumbotron">
        <h1>
          Welcome <b className="username-logged">{isAuth().name}</b> to BlogZone
          !
        </h1>
        <p className="normal-text">
          Create a new blog post by clicking on the New Post button or check yor
          profile.
        </p>
      </div>
      <img
        className="image"
        src="https://cdn.pixabay.com/photo/2016/03/09/09/43/person-1245959_1280.jpg"
        alt="Mount"
      ></img>
    </div>
  );
  return <div>{dashPage()}</div>;
};

export default Dash;
