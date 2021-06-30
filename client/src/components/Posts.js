import React, { Component } from "react";

class Posts extends Component {
  render() {
    return (
      <div className="container" id="post-container">
        <div className="jumbotron App">
          <div className="card-body">
            <h1 className="card-title">Blog post title</h1>
            <h3 className="card-subtitle mb-2 text-muted">Card subtitle</h3>
            <p className="normal-text">
              Spicy jalapeno bacon ipsum dolor amet picanha dolore pig andouille
              dolore. Pork chop dolor irure ex anim doner frankfurter cupidatat
              non veniam sssssbeef ribs sirloin. Ham hock biltong consectetur
              est, tongue labore chuck nisi sint jowl boudin pork belly beef
              ribs andouille. Anim ut cupim shankle. Dolor do pariatur, laboris
              duis fugiat chicken boudin. Chuck picanha shoulder excepteur elit
              spare ribs. Enim veniam cupidagggtat est. Est andouille aliqua
              flank reprehenderit. Id kevin leberkas tenderloin ea strip steak
              pancetta. Cupim proident chicken velit, tenderloin pig ad.
              Bresaola pork loin picanha, hamburger laborum pancetta mollit. Ad
              fatback dolore consequat culpa. Tongue ullamco ea ut fugiat
              shankle. Irure sausage hamburger jowl biltong nisi anim eiusmod
              tenderloin prosciutto pig rump spare ribs esse pork. Id occaecat
              aute flank, duis proident sirloin. Corned beef meatloaf chislic
              nulla in in burgdoggen do cillum turkey irure. Deserunt hamburger
              laboris sirloin, labore jowl prosciutto cillum doner excepteur.
            </p>
            <button
              type="button"
              className="mybutton"
              onClick={() => this.setState({ showSomething: true })}
            >
              Comment
            </button>
            <button
              type="button"
              className="mybutton"
              onClick={() => this.setState({ showSomething: true })}
            >
              Pictures
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Posts;
