import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isCellEmpty: true,
      player: 'X',
      board: [
         [[null], [null], [null]],
         [[null], [null], [null]],
         [[null], [null], [null]]
       ],
       winner: ''
    }
  }


 checkForWin=(board)=> {
   console.log(board);
     if(this.horizontalWin(board) || this.verticalWin(board) || this.diagonalWin(board)){
      // console.log(`${this.state.player} WINS!!!`);
      this.setState({winner: `${this.state.player} WINS!!!!`})
     }
 }

 horizontalWin=(board)=> {
   return board[0].every(x=>x===this.state.player) ||
         board[1].every(x=>x===this.state.player) ||
         board[2].every(x=>x===this.state.player)
 }

 verticalWin=(board)=>{
  return (board[0][0] === this.state.player && board[1][0] === this.state.player && board[2][0] === this.state.player) ||
      (board[0][1] === this.state.player && board[1][1] === this.state.player && board[2][1] === this.state.player) ||
      (board[0][2] === this.state.player && board[1][2] === this.state.player && board[2][2] === this.state.player)

 }

 diagonalWin=(board)=>{
  if (board[1][1] === this.state.player){
    if ((board[0][0] === this.state.player && board[2][2] === this.state.player) ||
      (board[0][2] === this.state.player && board[2][0] === this.state.player)) {
    return true
    }
  }
 }


  handleClickCell=(e)=>{

    console.log(e.target.dataset.cell);
    const wasClicked = e.target.dataset.cell.split('').map((num)=>{
          return Number(num);//get the data-cell value for whatever was clicked, and turn into array of numbers
    });
    const temp = this.state.board//set a temporary container to hold this.state.board
    console.log(temp[wasClicked[0]][wasClicked[1]]);
    // if (temp[wasClicked[0]][wasClicked[1]]){
    temp[wasClicked[0]][wasClicked[1]]=this.state.player//assign the array index to current player

      this.setState({temp: temp});
      this.checkForWin(temp);
      if (this.state.player === "X"){
      this.setState({player: "O"})
    }else{
      this.setState({player: "X"})
   //  }
   }
  }




  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Tic-Tac-Toe React</h1>
        </header>
       <div>
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
         <div className="announce-winner">{this.state.winner}</div>
        </div>
</div>
    );
  }
}


export default App;
