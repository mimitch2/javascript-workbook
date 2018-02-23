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

write moveCHecker method inside


they are pushing checker in as apposed to null

*/

const black = new Checker("Black", 'B');
const red = new Checker('Red', 'R');
let turn = red;
const move = new Board([null, null], [null, null]);

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
  // Your code here
  this.name = name;
  this.symbol = symbol;
}

function Board(start, end) {
  this.grid = [];
  // creates an 8x8 array, filled with null values
  this.start = start;
  this.end = end;

  this.createGrid = () => {
    this.turn = turn;
    console.log('3 --- inside createGrid method which creates the board array(s)');
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = []; // does this just build start board??? FIXME
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null); // does this just build start board??? FIXME
      }
    }
  }

  // prints out the board
  this.viewGrid = () => {
    console.log('5 --- inside viewGrid method which prints out the board')
    // console.log(this.grid);
    // add our column numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
          rowOfCheckers.push(this.grid[row][column].symbol);
        } else {
          // just push in a blank space
          rowOfCheckers.push(' ');
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += "\n";
    }

    console.log('Current turn = ', turn.name);
    console.log(string);

  }

  this.fillBoard = () => { //FIXME need to refactor these loops, try to use turn?
    console.log('4-----inside fillBoard');
    // console.log(move);
    // console.log(move.start[0]);
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

  this.isMoveLegal = () => {
    // console.log("INSIDE ISLEGAL");
    // // console.log(move.start[0]+ 1);
    // console.log('before check turn = ', turn);
    // console.log('turn in start postion ', this.grid[move.start[0]][move.start[1]]);

    if (this.grid[move.start[0]][move.start[1]] === turn && //only can move own checker AND
      this.grid[move.end[0]][move.end[1]] === null) { //only can move to empty spot
      if (move.end[1] === move.start[1] + 1 || //and only move +1 column
        move.end[1] === move.start[1] - 1) { //OR only move -1 column
        if (turn === black && move.end[0] === move.start[0] + 1 || //back can only move +1 row
          turn === red && move.end[0] === move.start[0] - 1) { //OR red can only move -1 row
          return true
        }
      } else if (move.end[1] === move.start[1] + 2 ||
        move.end[1] === move.start[1] - 2) {
        if (turn === black && move.end[0] === move.start[0] + 2 ||
          turn === red && move.end[0] === move.start[0] - 2) {
          return true
        }

      }
    }
  }

  this.moveIt = () => { //FIXME need to get this working INSIDE moveChecker
    console.log('-----Inside moveIt');
    this.grid[move.start[0]].splice([move.start[1]], 1, null)
    this.grid[move.end[0]].splice([move.end[1]], 1, turn)
    if (turn === red) {
      turn = black;
    } else {
      turn = red;
    }
    console.log('after moveIt turn = ', turn);
  }

}

function Game() {

  console.log('1 --- inside Game class');
  this.board = new Board(); //makes new instance of Board class

  this.start = () => {
    console.log('2----Inside start method');
    this.board.createGrid();
    this.board.fillBoard();
  };
  this.moveChecker = (whichPiece, toWhere) => { //move the checker if legal
    console.log('6 --- Inside moveChecker method which alternates with viewGrid');
    if (isInputValid(whichPiece, toWhere)) {
      console.log('!!-----VALID!!'); //FIXME figure out how to break this out
      whichPiece = whichPiece.split('');
      const numberwhichPiece = [];
      toWhere = toWhere.split('');
      const numberToWhere = [];

      whichPiece.forEach((num) => { //FIXME use map here??
        numberwhichPiece.push(parseInt(num));
      });
      toWhere.forEach((num2) => {
        numberToWhere.push(parseInt(num2));
      });
      // console.log(numberwhichPiece[0], numberToWhere[0]);
      move.start = numberwhichPiece;
      move.end = numberToWhere;
      whichPiece = numberwhichPiece;
      toWhere = numberToWhere;
      if (this.board.isMoveLegal() === true) {
        console.log("LEGAL MOVE");
        this.board.moveIt(); //FIXME need to get this working INSIDE moveChecker
      } else {
        console.log('Illegal Move!!');
      }
    } else {
      console.log('!!-----INVALID INPUT!!');
    }
  }
}

//   const parsInput = (whichPiece, toWhere) => { //FIXME can refactor this with HO function
//     //set new arrays then split original and make numbers, then push those numbers into the arrays
//     whichPiece = whichPiece.split('');
//     const numberwhichPiece = [];
//     toWhere = toWhere.split('');
//     const numberToWhere = [];
//
//     whichPiece.forEach((num) => {//FIXME use map here??
//       numberwhichPiece.push(parseInt(num));
//     });
//     toWhere.forEach((num2) => {
//       numberToWhere.push(parseInt(num2));
//     });
//     // console.log(numberwhichPiece[0], numberToWhere[0]);
//     move.start = numberwhichPiece;
//     move.end = numberToWhere;
//   }
// }



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
// console.log(game);
game.start(turn); //passed game instance to the start method inside of Game class









// Tests

if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
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
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}

//filter() is used in fuzzy search
