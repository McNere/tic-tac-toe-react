import React, { Component } from 'react';
import Gameboard from "../components/Gameboard";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      turn: "X",
      round: 1,
      board: [],
      displaytext: "",
      winner: ""
    }
    
  }

  click = (event) => {
    const { board, round, turn, winner } = this.state;
    //update board state when empty square is clicked
    if (!event.target.textContent&&!winner) {
      const changedBoard = board.map((item, i) => {
        return Number(event.target.id)===i ? item = {id: item.id, played: turn} : item;
      });
      //check if there's a winner
      const winner = this.checkWin(changedBoard, turn);
      //update board state
      this.setState({board: changedBoard});
      //end game if there's a winner
      if (winner) {
        this.setState({displayText: `The winner is ${turn}`});
      } else { //continue game if there's no winner
        //increase round count
        this.setState({round: round+1});
        //change player turn
        turn==="X" ? this.setState({turn: "O", displayText: "Player 2's turn"}) : 
                     this.setState({turn: "X", displayText: "Player 1's turn"});       
      }
      //check if it's a draw
      if (!winner&&round === 9) {
        this.setState({displayText: "It's a draw!"});
      }
    }
  }

  checkWin = (board, player) => {
    //check board pattern for a winner
    if ((board[0].played === player&&board[1].played === player&&board[2].played === player) ||
        (board[3].played === player&&board[4].played === player&&board[5].played === player) ||
        (board[6].played === player&&board[7].played === player&&board[8].played === player) ||
        (board[0].played === player&&board[3].played === player&&board[6].played === player) ||
        (board[1].played === player&&board[4].played === player&&board[7].played === player) ||
        (board[2].played === player&&board[5].played === player&&board[8].played === player) ||
        (board[0].played === player&&board[4].played === player&&board[8].played === player) ||
        (board[2].played === player&&board[4].played === player&&board[6].played === player)) {
      this.setState({winner: player});
      return player;
    }
  }

  init = () => {
    //set up app content
    let fillBoard = [];
    for (let i=0; i<9; i++) {
      fillBoard.push({
        id: i,
        played: "",
      });
    }
    this.setState(
      {
        round: 1, 
        board: fillBoard, 
        displayText: "Player 1's turn", 
        winner: "",
        turn: "X"
      }
    );
  }

  render() {
    const { round, displayText, turn } = this.state;
    //render board content
    return (
      <div>
        <h1>Tic-Tac-Toe</h1>
        <h2 id="display" className={turn}>Round {round}: {displayText}</h2>
        <Gameboard click={this.click} board={this.state.board}/>
        <div className="bottombar">
          <button id="reset" onClick={this.init}>Reset</button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    //run init once page is loaded
    this.init();
  }
}

export default App;
