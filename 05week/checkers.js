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
let playerTurn = black; // to track player turn


// console.log(playerTurn);

function Checker(symbol) {
  // Your code here
  this.symbol = symbol;
}



function Board() {
  this.grid = [];
  // creates an 8x8 array, filled with null values


  this.createGrid =()=> {
    console.log('3 --- inside createGrid method which creates the board array(s)');
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = []; // does this just build start board??? FIXME
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(' '); // does this just build start board??? FIXME
      }
    }


    this.fillBoard =()=> {
      console.log('inside fillboard');

      for (let row = 0; row < 3; row += 2) {
        for (let b = 0; b < this.grid.length; b += 2) {
          this.grid[row].splice(b, 1, black.symbol)
        }
      }
      for (let b = 1; b < this.grid.length; b += 2) {
        this.grid[1].splice(b, 1, black.symbol)
      }
      for (let row = 5; row < this.grid.length; row += 2) {
        for (let r = 1; r < this.grid.length; r += 2) {
          this.grid[row].splice(r, 1, red.symbol)
        }
      }
      for (let r = 0; r < 8; r += 2) {
        this.grid[6].splice(r, 1, red.symbol)
      }
      console.log(this.grid);
    }

  }

  // prints out the board
  this.viewGrid =()=> {
    // add our column numbers
    console.log('4 --- inside viewGrid method which prints out the board')
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
    console.log(string);

  };


  // Your code here
}



function Game() {
  console.log('1 --- inside Game class');
  this.board = new Board();

  this.start =()=> {
    console.log('2----Inside start method');
    this.board.createGrid();
    this.board.fillBoard();

  };
  this.moveChecker =(whichPiece, toWhere)=> { //move the checker if legal
    console.log('5 --- Inside moveChecker method which alternates with viewGrid');
    //set new arrays then split original and make numbers, then push those numbers into the arrays
    parsInput(whichPiece, toWhere);
  }
}

const parsInput =(whichPiece, toWhere) => {
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
