import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

 class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: 'X',
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ],
      turns: 1,
      winner: '',
      win: false,
      cssClass: "reset-button",
      turnClass: "announce-winner"
    }
  }

  resetGame = () => {
    this.setState({player: 'X'})
    this.setState({
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ]})
    this.setState({winner: ''})
    this.setState({win: false})
    this.setState({turns: 1})
    this.setState({cssClass: "reset-button"})
    this.setState({turnClass: "announce-winner"})
  }

  checkForWin = (board) => {
    if (this.horizontalWin(board) || this.verticalWin(board) || this.diagonalWin(board)) {
      this.setState({winner: `${this.state.player} wins!!`})
      this.setState({win: true}) //set this to prevent clicks if win or tie
      this.setState({cssClass: "reset-button-show"})
      this.setState({turnClass: "turn-hide"})
    } else if (this.state.turns === 9) { //if it's 9 turns and no win, then it's a tie.
      this.setState({winner: `It's a tie`})
      this.setState({cssClass: "reset-button-show"})
      this.setState({turnClass: "turn-hide"})
    }
  }

  horizontalWin = (board) => {
    return board[0].every(x => x === this.state.player) || board[1].every(x => x === this.state.player) || board[2].every(x => x === this.state.player)
  }

  verticalWin = (board) => {
    return (board[0][0] === this.state.player && board[1][0] === this.state.player && board[2][0] === this.state.player) || (board[0][1] === this.state.player && board[1][1] === this.state.player && board[2][1] === this.state.player) || (board[0][2] === this.state.player && board[1][2] === this.state.player && board[2][2] === this.state.player)

  }

  diagonalWin = (board) => {
    if (board[1][1] === this.state.player) {
      if ((board[0][0] === this.state.player && board[2][2] === this.state.player) || (board[0][2] === this.state.player && board[2][0] === this.state.player)) {
        return true
      }
    }
  }

  isItLegal = (item) => {
    return item === null && this.state.win === false //only allow clicking if cell is null and noone has won
  }

  handleClickCell = (e) => {
    const wasClicked = e.target.dataset.cell.split('').map((num) => {
      return Number(num); //get the data-cell value for whatever cell was clicked, and turn into array of numbers FIXME, is there a better way to do this?
    });
    const temp = this.state.board //set a temporary container to hold this.state.board
    const finalPosition = temp[wasClicked[0]][wasClicked[1]]; //use wasClicked to translate the clicked cell to board array
    if (this.isItLegal(finalPosition)) {
      temp[wasClicked[0]][wasClicked[1]] = this.state.player //assign the array index to current player
      this.setState({turns: this.state.turns + 1}) //itterate turns
      this.setState({temp: temp}); //insert player symbol into correct array postion
      this.checkForWin(temp); //check for a win
      if (this.state.player === "X") { //switch player turn
        this.setState({player: "O"})
      } else {
        this.setState({player: "X"})
      }
    }
  }

  render = () => {
    return (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">Tic-Tac-Toe React</h1>
      </header>
      <div id="main-board">
        <div className="row">
          <div data-cell="00" onClick={this.handleClickCell}>{this.state.board[0][0]}</div>
          <div data-cell="01" onClick={this.handleClickCell}>{this.state.board[0][1]}</div>
          <div data-cell="02" onClick={this.handleClickCell}>{this.state.board[0][2]}</div>
        </div>
        <div className="row">
          <div data-cell="10" onClick={this.handleClickCell}>{this.state.board[1][0]}</div>
          <div data-cell="11" onClick={this.handleClickCell}>{this.state.board[1][1]}</div>
          <div data-cell="12" onClick={this.handleClickCell}>{this.state.board[1][2]}</div>
        </div>
        <div className="row">
          <div data-cell="20" onClick={this.handleClickCell}>{this.state.board[2][0]}</div>
          <div data-cell="21" onClick={this.handleClickCell}>{this.state.board[2][1]}</div>
          <div data-cell="22" onClick={this.handleClickCell}>{this.state.board[2][2]}</div>
        </div>
        <div className={this.state.turnClass}>Turn: {this.state.player}</div>
        <div className="announce-winner">{this.state.winner}</div>
        <button className={this.state.cssClass} onClick={this.resetGame}>New Game</button>
      </div>
    </div>);
  }
}

export default App;
