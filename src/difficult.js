import React from "react";
import Popup from "./popup";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Difficult extends React.Component {
  constructor(props) {
    super(props);
    this.game = Array(9).fill(null);
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
    if (sq[i] === null && !this.gameover) {
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
      //check if computer has a winning move
      if (
        (this.state.squares[a] === this.state.squares[b] &&
          this.state.squares[a] === "O") ||
        (this.state.squares[a] === this.state.squares[c] &&
          this.state.squares[a] === "O") ||
        (this.state.squares[b] === this.state.squares[c] &&
          this.state.squares[c] === "O")
      ) {
        if (this.state.squares[a] === null) {
          const sq = this.state.squares;
          sq[a] = "O";
          this.setState({ squares: sq });
          flag = false;
          break;
        } else if (this.state.squares[b] === null) {
          const sq = this.state.squares;
          sq[b] = "O";
          this.setState({ squares: sq });
          flag = false;
          break;
        } else if (this.state.squares[c] === null) {
          const sq = this.state.squares;
          sq[c] = "O";
          this.setState({ squares: sq });
          flag = false;
          break;
        }
      }
    }

    if (flag && this.props.level === "Difficult") {
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        //prevent user from winning if its diff mode
        if (
          (this.state.squares[a] === this.state.squares[b] &&
            this.state.squares[a] === "X") ||
          (this.state.squares[a] === this.state.squares[c] &&
            this.state.squares[a] === "X") ||
          (this.state.squares[b] === this.state.squares[c] &&
            this.state.squares[c] === "X")
        ) {
          if (this.state.squares[a] === null) {
            const sq = this.state.squares;
            sq[a] = "O";
            this.setState({ squares: sq });
            flag = false;
            break;
          } else if (this.state.squares[b] === null) {
            const sq = this.state.squares;
            sq[b] = "O";
            this.setState({ squares: sq });
            flag = false;
            break;
          } else if (this.state.squares[c] === null) {
            const sq = this.state.squares;
            sq[c] = "O";
            this.setState({ squares: sq });
            flag = false;
            break;
          }
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
        const sq = this.game;
        let indicator = "red";
        if (this.state.squares[a] === "X") {
          indicator = "green";
        }
        sq[a] = indicator;
        sq[b] = indicator;
        sq[c] = indicator;
        this.game = sq;
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
      this.gameover = true;
    }

    return (
      <div className="container">
        <h3>{status}</h3>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {this.gameover && <Popup message={this.msg}> </Popup>}
        </ReactCSSTransitionGroup>
        <table className="grid" id="grid">
          <tr>
            <td onClick={() => this.clicked(0)}>
              <span className={this.game[0]}>{this.state.squares[0]} </span>
            </td>
            <td className="vert" onClick={() => this.clicked(1)}>
              <span className={this.game[1]}>{this.state.squares[1]} </span>
            </td>
            <td onClick={() => this.clicked(2)}>
              <span className={this.game[2]}>{this.state.squares[2]} </span>
            </td>
          </tr>
          <tr>
            <td className="hori" onClick={() => this.clicked(3)}>
              <span className={this.game[3]}>{this.state.squares[3]} </span>
            </td>
            <td className="vert hori" onClick={() => this.clicked(4)}>
              <span className={this.game[4]}>{this.state.squares[4]} </span>
            </td>
            <td className="hori" onClick={() => this.clicked(5)}>
              <span className={this.game[5]}>{this.state.squares[5]} </span>
            </td>
          </tr>
          <tr>
            <td onClick={() => this.clicked(6)}>
              {" "}
              <span className={this.game[6]}>{this.state.squares[6]} </span>
            </td>
            <td className="vert" onClick={() => this.clicked(7)}>
              <span className={this.game[7]}> {this.state.squares[7]}</span>
            </td>
            <td onClick={() => this.clicked(8)}>
              <span className={this.game[8]}> {this.state.squares[8]} </span>{" "}
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Difficult;
