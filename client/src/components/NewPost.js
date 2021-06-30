import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenFancy, faRocket } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
class NewPost extends Component {
  constructor(props) {
    super();

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeText = this.onChangeText.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      user: "",

      title: "",
      text: "",
      posts: [],
    };
  }

  componentDidMount() {
    this.setState({
      title: "test title",
      text: "test text",
    });
  }

  onChangeUser(e) {
    this.setState({
      title: e.target.value,
    });
  }
  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }
  onChangeText(e) {
    this.setState({
      text: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const post = {
      user: this.state.user,
      title: this.state.title,
      text: this.state.text,
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    axios
      .post("http://localhost:5000/api/posts/post", post, axiosConfig)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });

    window.location = "/";
  }
  render() {
    return (
      <form action="action_page.php" onSubmit={this.onSubmit}>
        <div className="container" id="home-container">
          <div className="jumbotron App">
            <h1>Create a new blog post</h1>
            <p>Please fill in this form to create post.</p>
            <hr className="hr" />
            <div className="jumbotron">
              <h4>
                <p>
                  <label htmlFor="text">
                    <FontAwesomeIcon icon={faRocket} className="font3" />
                    <b>&ensp; Post title:&ensp;</b>
                  </label>
                </p>
                <p>
                  <input
                    type="text"
                    placeholder="Post title"
                    name="Title"
                    required
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                  />
                </p>
                <p>
                  <label htmlFor="username">
                    <FontAwesomeIcon icon={faPenFancy} className="font3" />
                    <b>&ensp; Post body:&ensp;</b>
                  </label>
                </p>
               
                  <div className="form-group">
                    <div className="col-sm-10"></div>
                    <textarea
                      className="form-control"
                      rows="5"
                      placeholder="Write here your text..."
                      value={this.state.text}
                      onChange={this.onChangeText}
                    ></textarea>
                  </div>
            
              </h4>
            </div>

            <p className="button-centered">
              <button type="submit" className="mybutton">
                Submit
              </button>
            </p>
          </div>
        </div>
      </form>
    );
  }
}

export default NewPost;
