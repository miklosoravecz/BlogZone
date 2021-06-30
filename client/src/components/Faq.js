import React, { Component } from "react";

class Foot extends Component {
  render() {
    return (
      <div class="container" id="post-container">
        <div class="jumbotron">
          <img
            className="image2"
            src="https://cdn.pixabay.com/photo/2017/07/10/23/43/question-mark-2492009_1280.jpg"
            alt="Question"
          ></img>
          <div class="card-body">
            <h1>How i can register to the site?</h1>
            <p>
              By clicking on the register button and filling in the form. For
              registration needs a username, email adress and password.
            </p>
            <h1>How i can sign in to the site?</h1>
            <p>
              If you already have a valid account, you can sign in the site by
              clicking on the login menu and fill in the login form.
            </p>
            <h1>What can i do in the BlogZone site?</h1>
            <p>
              You can choose from the menu. You can check your account details
              in the profile menu and edit your personal data or edit/delete
              your own posts from the site.
            </p>
            <p>
              You can also surf on the different blog posts and clicking on them
              read the full post, check pictures and leave comments.
            </p>
            <p>
              You able to create own new posts aswell, clicking on new post
              button. There you can add title and write text to the form, and
              submit it with the submit button.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Foot;
