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

const black = new Checker('B');
const red = new Checker('R');
let turn = black;


const isInputValid = (whichPiece, toWhere) => {
  if (Number(whichPiece) && Number(toWhere)) { //make sure they are numbers
    const validInputs = /[0-7]/; //valid number range
    for (var i = 0; i < 2; i++) { //check that BOTH numbers are within range by looping it twice
      if (whichPiece.search(validInputs) === i && toWhere.search(validInputs) === i) {
        return whichPiece.length === 2 && toWhere.length === 2 //if loop is truethy, check if it's only 2 characters
      }
    }
  }
}

function Checker(symbol) {
  // Your code here
  this.symbol = symbol;
}

function Board() {
  this.grid = [];
  // creates an 8x8 array, filled with null values


  this.createGrid = (turn) => {
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

    // add our column numbers
    console.log('5 --- inside viewGrid method which prints out the board')
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
          rowOfCheckers.push(turn.symbol);
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += "\n";
    }

    console.log('Current turn = ', this.turn.symbol);
    console.log(string);
  }

  this.fillBoard = () => { //FIXME need to refactor these loops, try to use turn?
    console.log('4-----inside fillBoard');

    for (let row = 0; row < 3; row += 2) { //fill row 1 and 3 with same pattern black
      for (let b = 0; b < this.grid.length; b += 2) {
        this.grid[row].splice(b, 1, black.symbol)
      }
    }
    for (let b = 1; b < this.grid.length; b += 2) { //fill row 2 with alternate pattern black
      this.grid[1].splice(b, 1, black.symbol)
    }
    for (let row = 5; row < this.grid.length; row += 2) { //fill row 5 and 7 with same pattern red
      for (let r = 1; r < this.grid.length; r += 2) {
        this.grid[row].splice(r, 1, red.symbol)
      }
    }
    for (let r = 0; r < 8; r += 2) { //fill row 6 with alternate pattern red
      this.grid[6].splice(r, 1, red.symbol)
    }
    console.log(this.grid);
  }

}


//***********this is called first*************
function Game() {

  console.log('1 --- inside Game class');
  this.board = new Board(); //makes new instance of Board class

  this.start = () => {
    console.log('2----Inside start method');
    this.board.createGrid(turn);
    this.board.fillBoard();

  };
  this.moveChecker = (whichPiece, toWhere) => { //move the checker if legal
    console.log('6 --- Inside moveChecker method which alternates with viewGrid');
    if (isInputValid(whichPiece, toWhere)) {
      parsInput(whichPiece, toWhere)
      console.log('-----VALID!!');
    } else {
      console.log('-----IVALID INPUT!!');
    }
  }
}



const parsInput = (whichPiece, toWhere) => { //FIXME can refactor this with HO function
//set new arrays then split original and make numbers, then push those numbers into the arrays
  whichPiece = whichPiece.split('');
  const numberwhichPiece = [];
  toWhere = toWhere.split('');
  const numberToWhere = [];

  whichPiece.forEach((num) => {
    numberwhichPiece.push(parseInt(num));
  });
  toWhere.forEach((num2) => {
    numberToWhere.push(parseInt(num2));
  });
  console.log(numberwhichPiece, typeof(numberwhichPiece[0]));
  console.log(numberToWhere, typeof(numberToWhere[0]));
}


// Game {
//   board:
//    Board {
//      grid: [],
//      createGrid: [Function],
//      viewGrid: [Function],
//      fillBoard: [Function] },
//   start: [Function],
//   moveChecker: [Function] }



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
