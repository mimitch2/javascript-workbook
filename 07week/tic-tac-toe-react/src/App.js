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
       ]

    }
  }

 // isItNull=(position)=> {
 // return (postion === null)
 // }

  handleClickCell=(event)=>{

    const wasClicked = event.target.getAttribute("data-cell").split('').map((num)=>{
          return Number(num);//get the data-cell value for whatever was clicked, and turn into array of numbers
    });
    const temp = this.state.board//set a temporary container to hold this.state.board
    // console.log(temp[wasClicked[0]][wasClicked[1]]);
    if (temp[wasClicked[0]][wasClicked[1]] === null){
    temp[wasClicked[0]][wasClicked[1]]=this.state.player//assign the array index to current player
      this.setState({temp: temp});
      if (this.state.player === "X"){
      this.setState({player: "O"})
    }else{
      this.setState({player: "X"})
}
}
  }


  render() {
    return (
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
      </div>
    );
  }
}


export default App;
