import React from "react";
import Popup from "./popup";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
//included this logic within difficult
class Easy extends React.Component {
  constructor(props) {
    super(props);
    this.gameover = false;
    this.counter = 1;
    this.msg = "";
    this.state = {
      squares: Array(9).fill(null)
    };
    this.clicked = this.clicked.bind(this);
    this.checkWon = this.checkWon.bind(this);
    this.computerplays = this.computerplays.bind(this);
  }
  clicked(i) {
    const sq = this.state.squares;
    if (sq[i] == null && !this.gameover) {
      sq[i] = "X";
      this.counter++;
      this.setState({ squares: sq });
      console.log(this.counter);
      this.checkWon();
      if (!this.gameover) {
        this.computerplays();
      }
    }
  }
  computerplays() {
    let flag = true;
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        (this.state.squares[a] === this.state.squares[b] &&
          this.state.squares[a] === "O") ||
        (this.state.squares[a] === this.state.squares[c] &&
          this.state.squares[a] === "O") ||
        (this.state.squares[b] === this.state.squares[c] &&
          this.state.squares[c] === "O")
      ) {
        console.log("finding...");
        if (this.state.squares[a] === null) {
          const sq = this.state.squares;
          sq[a] = "O";
          this.setState({ squares: sq });
          flag = false;
          break;
        } else if (this.state.squares[b] == null) {
          const sq = this.state.squares;
          sq[b] = "O";
          this.setState({ squares: sq });
          flag = false;
          break;
        } else if (this.state.squares[c] == null) {
          const sq = this.state.squares;
          sq[c] = "O";
          this.setState({ squares: sq });
          flag = false;
          break;
        }
      }
    }
    //no chance of win..then place somewhere
    if (flag) {
      for (let i = 0; i < 9; i++) {
        if (this.state.squares[i] === null) {
          const sq = this.state.squares;
          sq[i] = "O";
          this.setState({ squares: sq });
          console.log("marking at" + i);
          flag = true;
          break;
        }
      }
    }
    //changing counter after computer plays
    this.counter++;
    console.log(this.counter);
  }
  checkWon() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    let player = this.state.counter % 2;
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.state.squares[a] &&
        this.state.squares[a] === this.state.squares[b] &&
        this.state.squares[a] === this.state.squares[c]
      ) {
        this.gameover = true;
        if (this.state.squares[a] === "X") {
          this.msg = "You WON!!";
          // return <b> You WON!!!</b>;
        } else {
          //return <b> You LOST!!!</b>;
          this.msg = "You LOST!!";
        }
      }
    }
    if (player === 0) return "Your turn";
    else return "Computer has played";
  }

  render() {
    var status = this.checkWon();
    if (this.counter === 1) {
      status = "Place your opening move!";
    } else if (this.counter > 9 && !this.gameover) {
      status = "";
      this.gameover = true;
      this.msg = "Its a tie!";
    } else if (this.gameover) {
      status = "";
    }
    return (
      <div className="container">
        <h3 className="text">{status}</h3>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {this.gameover && <Popup message={this.msg}> </Popup>}
        </ReactCSSTransitionGroup>
        <table className="grid">
          <tr>
            <td onClick={() => this.clicked(0)}> {this.state.squares[0]} </td>
            <td className="vert" onClick={() => this.clicked(1)}>
              {this.state.squares[1]}
            </td>
            <td onClick={() => this.clicked(2)}> {this.state.squares[2]} </td>
          </tr>
          <tr>
            <td className="hori" onClick={() => this.clicked(3)}>
              {" "}
              {this.state.squares[3]}{" "}
            </td>
            <td className="vert hori" onClick={() => this.clicked(4)}>
              {" "}
              {this.state.squares[4]}{" "}
            </td>
            <td className="hori" onClick={() => this.clicked(5)}>
              {" "}
              {this.state.squares[5]}{" "}
            </td>
          </tr>
          <tr>
            <td onClick={() => this.clicked(6)}> {this.state.squares[6]} </td>
            <td className="vert" onClick={() => this.clicked(7)}>
              {this.state.squares[7]}
            </td>
            <td onClick={() => this.clicked(8)}> {this.state.squares[8]} </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Easy;
