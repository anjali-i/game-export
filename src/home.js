import React from "react";
import ReactDOM from "react-dom";
// import Easy from "./easy";
import Difficult from "./difficult";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  renderEasy() {
    const rootElement = document.getElementById("root");
    ReactDOM.render(<Difficult level="Easy" />, rootElement);
  }
  renderDifficult() {
    const rootElement = document.getElementById("root");
    ReactDOM.render(<Difficult level="Difficult" />, rootElement);
  }

  render() {
    return (
      <div className="container">
        <span className="text">Tic-Tac-Toe Game</span>
        <div className="text"> Select your difficulty level</div>
        <div>
          <button className=" btn btn-primary" onClick={this.renderEasy}>
            {" "}
            Easy
          </button>{" "}
          &nbsp;
          <button className="btn btn-primary" onClick={this.renderDifficult}>
            {" "}
            Difficult
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
