import React from "react";
import ReactDOM from "react-dom";
import Home from "./home";

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.header = "";
    this.description = "";
  }
  renderhome() {
    const rootElement = document.getElementById("root");
    ReactDOM.render(<Home />, rootElement);
  }
  render() {
    if (this.props.message === "You WON!!") {
      this.header = "headerwon";
      this.description = "descriptionwon";
    } else if (this.props.message === "You LOST!!") {
      this.header = "headerlost";
      this.description = "descriptionlost";
    } else {
      this.header = "headertie";
      this.description = "descriptiontie";
    }
    return (
      <div ref="greeting" className="greeting">
        <div className={this.header}>{this.props.message}</div>
        <div className={this.description}>
          <button onClick={this.renderhome}> Play Again</button>
        </div>
      </div>
    );
  }
}
export default Popup;
