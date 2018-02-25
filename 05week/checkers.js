'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/*
-is valid uses search() regEx to verify input is proper.
1. use  R and B class attributes  to push into arrays to start and print out board -- how to push them in?
2. create 2 more variables that track how many pieces each player has, and update each time one is removed
3. create a playerTurn variable to track turns
4. create legal move function to only allow Red to move red, black to move black AND is your move allowed
5. move piece, and if a jump, remove jumped B or R from array  AND reduce counter need to change string into number split
6. check for win would evaluate each players count each turn
7. add reset fucntion to reset all variables and objects to orginial states
*/
const black = new Checker("Black", `\u{26ab}`); //FIXME can I reduce this scope????
const red = new Checker('Red', `\u{1F534}`);
let turn = red;

// const move = new Board([null, null], [null, null]);//create Board instance that stores start and end postions

const isInputValid = (whichPiece, toWhere) => { //FIXME mixed good/bad numbers are passing and they should'nt
  if (Number(whichPiece) && Number(toWhere)) { //make sure they are numbers
    const validInputs = /[0-7]/; //valid number range
    for (var i = 0; i < 2; i++) { //check that BOTH numbers are within range by looping it twice
      if (whichPiece.search(validInputs) === i && toWhere.search(validInputs) === i) {
        return whichPiece.length === 2 && toWhere.length === 2 //if loop is truethy, check if it's only 2 characters
      }
    }
  }
}

function Checker(name, symbol) {
  this.name = name;
  this.symbol = symbol;
}

function Board(begin, end) {
  this.grid = [];
  this.begin = begin;
  this.end = end;

  this.createGrid = () => { // creates an 8x8 array, filled with null values
    for (let row = 0; row < 8; row++) { // loop to create the 8 rows
      this.grid[row] = [];
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null); // push in 8 columns of nulls
      }
    }
  }

  this.viewGrid = () => { // prints out the board
    // console.log('5 --- inside viewGrid method which prints out the board')
    let string = "  0 1 2 3 4 5 6 7\n"; // add our column numbers
    for (let row = 0; row < 8; row++) { // we start with our row number in our array
      const rowOfCheckers = [row];
      for (let column = 0; column < 8; column++) { // a loop within a loop
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
          rowOfCheckers.push(this.grid[row][column].symbol);
        } else {
          rowOfCheckers.push(' '); // just push in a blank space
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      string += "\n"; // add a 'new line'
    }
    console.log('Current turn = ', turn.name); //annouce turn each time
    console.log(string);

  }

  this.fillBoard = () => { //FIXME maybe to refactor these loops?
    for (let row = 0; row < 3; row += 2) { //fill row 1 and 3 with same pattern black
      for (let b = 0; b < this.grid.length; b += 2) {
        this.grid[row].splice(b, 1, black)
      }
    }
    for (let b = 1; b < this.grid.length; b += 2) { //fill row 2 with alternate pattern black
      this.grid[1].splice(b, 1, black)
    }
    for (let row = 5; row < this.grid.length; row += 2) { //fill row 5 and 7 with same pattern red
      for (let r = 1; r < this.grid.length; r += 2) {
        this.grid[row].splice(r, 1, red)
      }
    }
    for (let r = 0; r < 8; r += 2) { //fill row 6 with alternate pattern red
      this.grid[6].splice(r, 1, red)
    }
  }


} //end board class

function Game() {
  let blackOnBoard = 12; //start with 12 of each to track when one is removed
  let redOnBoard = 12;
  this.board = new Board([null, null], [null, null]); //makes new instance of Board class
  this.start = () => {
    this.board.createGrid();
    this.board.fillBoard();
  };

  this.moveChecker = (whichPiece, toWhere) => { //move the checker if legal
    if (isInputValid(whichPiece, toWhere)) {
      this.parsInput(whichPiece, toWhere);
      if (this.isMoveLegal()) { //FIXME put jump check here with condition, then call remove function?
        console.log("LEGAL MOVE");


        this.moveIt(); //FIXME need to get this working INSIDE moveChecker

      } else {
        console.log('Illegal Move!!');
      }
    } else {
      console.log('!!-----INVALID INPUT!!');
    }
  }

  this.parsInput = (whichPiece, toWhere) => { //split and parse inputs into arays with numbers
    whichPiece = whichPiece.split('');
    toWhere = toWhere.split('');
    const numberwhichPiece = whichPiece.map((num) => {
      return parseInt(num);
    });
    const numberToWhere = toWhere.map((num2) => {
      return parseInt(num2);
    });
    this.board.begin = numberwhichPiece; //make move object's start the new array
    this.board.end = numberToWhere; //make move object's end the new array
  }

  this.isMoveLegal = () => {
    // console.log(this);
    // console.log(this.board.begin);
    // console.log(this.board.grid);
    // console.log("INSIDE ISLEGAL");
    if (this.board.grid[this.board.begin[0]][this.board.begin[1]] === turn && //only can move own checker AND
      this.board.grid[this.board.end[0]][this.board.end[1]] === null) { //only can move to empty spot
      if (this.board.end[1] === this.board.begin[1] + 1 || //and only move +1 column
        this.board.end[1] === this.board.begin[1] - 1) { //OR only move -1 column
        if (turn === black && this.board.end[0] === this.board.begin[0] + 1 || //back can only move +1 row
          turn === red && this.board.end[0] === this.board.begin[0] - 1) { //OR red can only move -1 row
          return true
        }
      } else if (this.canItJump()) { //check for jump move FIXME should this be checked in movepiece?
        return true
      }
    }
  } //end legal check

  this.canItJump = () => { //FIXME refactor this, it's WAY too long
    if (turn === black) {
      if (this.board.end[0] === this.board.begin[0] + 2) { //if trying to move +2 rows black
        if (this.board.end[1] === this.board.begin[1] + 2) { //and +2 columns it's a right jump FIXME checking this twice
          if (this.board.grid[this.board.end[0] - 1][this.board.end[1] - 1] !== turn &&
            this.board.grid[this.board.end[0] - 1][this.board.end[1] - 1] !== null) { //check that offset piece is not black or null
            return true
          }
        } else if ((this.board.end[1] === this.board.begin[1] - 2)) { //or -2 columns it's a left jump FIXME checking this twice
          if (this.board.grid[this.board.end[0] - 1][this.board.end[1] + 1] !== turn &&
            this.board.grid[this.board.end[0] - 1][this.board.end[1] + 1] !== null) { //check that offset piece is not black or null
            return true
          }
        }
      } //end black check
    } else if (turn === red) {
      if (this.board.end[0] === this.board.begin[0] - 2) { //if trying to move -2 rows red
        if (this.board.end[1] === this.board.begin[1] + 2) { //and +2 columns it's a right jump
          if (this.board.grid[this.board.end[0] + 1][this.board.end[1] - 1] !== turn &&
            this.board.grid[this.board.end[0] + 1][this.board.end[1] - 1] !== null) { //check that offset piece is not red or null
            return true
          }
        } else if ((this.board.end[1] === this.board.begin[1] - 2)) { //or -2 columns it's a left jump
          if (this.board.grid[this.board.end[0] + 1][this.board.end[1] + 1] !== turn &&
            this.board.grid[this.board.end[0] + 1][this.board.end[1] + 1] !== null) { //check that offset piece is not red or null
            return true
          }
        }
      }
    } //end red check
  } //end jump check
  this.moveIt = () => { //FIXME need to get this working INSIDE moveChecker
    this.board.grid[this.board.begin[0]].splice([this.board.begin[1]], 1, null)
    this.board.grid[this.board.end[0]].splice([this.board.end[1]], 1, turn)
    if (turn === red) {
      turn = black;
    } else {
      turn = red;
    }

  }

  // this.killChecker = () => {
  //   console.log(this.board.grid);
  //   this.board.grid.splice(this.board.grid[this.board.end[0] - 1][this.board.end[1] - 1], 1);
  //   this.killChecker(this.board.grid[this.board.end[0] - 1][this.board.end[1] - 1])
  // }

} //end Game class

function getPrompt() {
  game.board.viewGrid(); // call to print out initial board
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game(); //creates a new Game class instance
game.start(); //passed game instance to the start method inside of Game class

// Tests

if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24); //FIXME WTF is checkers????? I bet it's tracking how many checks on the board
    });
  });

  describe('Game.moveChecker()', function() {
    it('should move a checker', function() {
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23); //FIXME WTF is checkers?????
    });
  });
} else {
  getPrompt();
}
