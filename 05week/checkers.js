'use strict';
const colors = require('colors'); //so I can have colors in the terminal!
const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const black = new Checker("Black", 'b', 12, false); //FIXME can I reduce this scope???? so far no...
const red = new Checker('Red', 'r', 12, false);
let turn = red;
let win = false;

const isInputValid = (whichPiece, toWhere) => {
  const checkNumberRange = (value) => { //fucntion to pass into every method to check number range
    return value >= 0 && value <= 7;
  }
  return whichPiece.every(checkNumberRange) && toWhere.every(checkNumberRange) &&
    whichPiece.length === 2 && toWhere.length === 2 //check numbers are in range and length is 2
}

function Checker(name, symbol, count, king) { //name, symbol, count and king of each checker
  this.name = name;
  this.symbol = symbol;
  this.count = count;
  this.king = king;
}

function Board() {
  this.grid = [];
  // this.checkers = [];//FIXME??? not sure what this is for other than the original test
  this.createGrid = () => { // creates an 8x8 array, filled with null values
    for (let row = 0; row < 8; row++) { // loop to create the 8 rows
      this.grid[row] = [];
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null); // push in 8 columns of nulls
      }
    }
  }

  // const setCheckerCount=()=> {//FIXME, can't get this to work correctly, it always starts with 0
  //   console.log('start checkercount');
  //   this.grid.forEach((item)=> {
  //     if (this.grid[item] !== null){
  //       this.grid[item].count++
  //       console.log('YES');
  //     }
  //
  //   });
  //   console.log('after checkercount', this.grid);
  //   console.log(red, black)
  // }
  // setCheckerCount();

  this.viewGrid = () => { // prints out the board
    let string = "  0 1 2 3 4 5 6 7\n"; // add our column numbers
    for (let row = 0; row < 8; row++) { // we start with our row number in our array
      const rowOfCheckers = [row];
      for (let column = 0; column < 8; column++) { // a loop within a loop
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
          rowOfCheckers.push(this.grid[row][column].symbol);
          // this.checkers.push(this.grid[row][column]);//FIXME this is purely for the test to pass, why else???
        } else {
          rowOfCheckers.push(' '); // just push in a blank space
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      string += "\n"; // add a 'new line'

    }
    if (!win) {
      console.log(`Current turn = ${turn.name}`.yellow.underline); //annouce turn each time
    }
    console.log(`${string}`);
  }

  this.fillBoard = () => {
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

    // ***** below is just to help test win checks, so it only pushes 1 checker each
    // this.grid[5].splice(5, 1, black)
    // black.count = 1;
    // this.grid[6].splice(6, 1, red)
    // red.count = 1;
    // turn = red; //change this back and forth for easy win tests
    // // red.king = true;
    // // black.king = true;
    //**********END TEST AREA*************************
  }
} //end board class

function Game(begin, end) {
  this.begin = begin; //numneric array of original whichPiece input
  this.end = end; //numneric array of original toWhere input
  this.board = new Board(); //makes new instance of Board class

  this.start = () => {
    this.board.createGrid();
    this.board.fillBoard(); //call to fill board with initial postions
  };

  this.moveChecker = (whichPiece, toWhere) => { //move the checker if valid and legal
    whichPiece = whichPiece.split(''); //split into an array of 2 strings
    toWhere = toWhere.split('');
    if (isInputValid(whichPiece, toWhere)) { //check for valid inputs
      parsInput(whichPiece, toWhere); //parse the inputs to numbers
      if (isMoveLegal()) { //check if move is legal
        this.board.grid[this.board.begin[0]].splice([this.board.begin[1]], 1, null) //if legal, remove checker
        this.board.grid[this.board.end[0]].splice([this.board.end[1]], 1, turn) //then splice into new postion
        if (!black.king || !red.king) { //only call kingMe if one or both are not kinged
          kingMe();
        }
        if (!win){
          if (turn === red) { //switch turns
            turn = black;
          } else {
            turn = red;
          }
        }
        if (checkForWin()) {
          win = true;
          this.board.viewGrid();
          console.log(`\n    ${turn.name} Wins!!!  \n`.yellow.underline);
          console.log(`      NEW GAME   \n`.green.underline);
          resetGame();
        }
      } else { //if illegal, don't move and throw error
        console.log('Illegal Move!!');
      }
    } else { //if invalid don't move and throw error
      console.log('INVALID INPUT!!');
    }
  } //end movechecker

  const kingMe = () => {
    let blackKingCounter = 0;//these count how many pieces made it to end of board
    let redKingCounter = 0;

    if (turn === black && this.board.end[0] === 7) { //if black hits row 7
      blackKingCounter++; //iterate how many times he has
    }
    if (blackKingCounter === 1) { //if counter reaches threshold...
      black.king = true; //make all black pieces kings and change symbol
      black.symbol = "B";
    }
    if (turn === red && this.board.end[0] === 0) { //if red hits row 0
      redKingCounter++; //itterate how many times he has
    }
    if (redKingCounter === 1) { //if counter reaches threshold...
      red.king = true; //make all red pieces kings and change symbol
      red.symbol = "R";
    }
  } //end KingMe

  const checkForWin=()=> {
    return black.count === 0 || red.count === 0
  }

  const resetGame=()=> {
    black.symbol = "b";
    black.count = 12;
    red.symbol = "r";
    red.count = 12;
    black.king = false;
    red.king = false;
    win = false;
    turn = red;
    this.start();
  }

  const parsInput = (whichPiece, toWhere) => { //split and parse inputs into arays with numbers
    const numberwhichPiece = whichPiece.map((num) => { //parse each array into numbers
      return Number(num);
    });
    const numberToWhere = toWhere.map((num2) => {
      return Number(num2);
    });
    this.board.begin = numberwhichPiece; //make board object's begin eaual to the new array
    this.board.end = numberToWhere; //make board object's end equal to the new array
  } //endParseInput

  const isMoveLegal = () => { //main function to check for legal moves
    if (this.board.grid[this.board.begin[0]][this.board.begin[1]] === turn && //only can move own checker AND
      this.board.grid[this.board.end[0]][this.board.end[1]] === null) { //only can move to empty spot
      if (this.board.end[1] === this.board.begin[1] + 1 || //and only move +1 column
        this.board.end[1] === this.board.begin[1] - 1) { //OR only move -1 column

        if (turn === black || turn === red && red.king === true) { //black regular OR red kings can move +1 row
          if (this.board.end[0] === this.board.begin[0] + 1) {
            return true
          }
        } else if (turn === red || turn === black && black.king === true) { //red regular OR black kings can move +1 row
          if (this.board.end[0] === this.board.begin[0] - 1) {
            return true
          }
        } //below we check for valid jump moves
      } else if (turn === black && this.board.end[0] === this.board.begin[0] + 2 || //if trying to move +2 rows black
        turn === red && red.king === true && this.board.end[0] === this.board.begin[0] + 2) { //or king red +2 rows
        if (blackOrRedKingJumpRight() || blackOrRedKingJumpLeft()) { //call methods for either legal jump moves for black or red kings
          return true
        }
      } else if (turn === red && this.board.end[0] === this.board.begin[0] - 2 || //if trying to move -2 rows red
        turn === black && black.king === true && this.board.end[0] === this.board.begin[0] - 2) { //or king black -2 rows
        if (redOrBlackKingJumpRight() || redOrBlackKingJumpLeft()) { //call methods for either legal jump moves for red or black kings
          return true
        }
      }
    }
  } //end isMoveLegal

  /******the four methods below each check for specific jump scenarios.  FIXME both right jumps and both left jumps START with the same initial condition. Try to refactor*/

  const blackOrRedKingJumpRight = () => { //this to check JUST black jumps to the right
    if (this.board.end[1] === this.board.begin[1] + 2) { //if +2 columns it's a right jump
      if (this.board.grid[this.board.end[0] - 1][this.board.end[1] - 1] !== turn &&
        this.board.grid[this.board.end[0] - 1][this.board.end[1] - 1] !== null) { //check that jumped position is not black or null
        killChecker(this.board.end[0] - 1, this.board.end[1] - 1); //
        return true
      }
    }
  } //end blackOrRedKingJumpRight

  const blackOrRedKingJumpLeft = () => { //this to check JUST black jumps to the left
    if ((this.board.end[1] === this.board.begin[1] - 2)) { //if -2 columns it's a left jump
      if (this.board.grid[this.board.end[0] - 1][this.board.end[1] + 1] !== turn &&
        this.board.grid[this.board.end[0] - 1][this.board.end[1] + 1] !== null) { //check that jumped postion is not black or null
        killChecker(this.board.end[0] - 1, this.board.end[1] + 1); //if it's niether, remove opposite player
        return true
      }
    }
  } //end blackOrRedKingJumpLeft

  const redOrBlackKingJumpRight = () => { //this to check JUST red jumps to the right
    if (this.board.end[1] === this.board.begin[1] + 2) { //if +2 columns it's a red right jump
      if (this.board.grid[this.board.end[0] + 1][this.board.end[1] - 1] !== turn &&
        this.board.grid[this.board.end[0] + 1][this.board.end[1] - 1] !== null) { //check that jumped postion is not red or null
        killChecker(this.board.end[0] + 1, this.board.end[1] - 1); //if it's niether, remove opposite player
        return true
      }
    }
  } //end redOrBlackKingJumpRight

  const redOrBlackKingJumpLeft = () => { //this to check JUST red jumps to the left
    if ((this.board.end[1] === this.board.begin[1] - 2)) { //if -2 columns it's a left jump
      if (this.board.grid[this.board.end[0] + 1][this.board.end[1] + 1] !== turn &&
        this.board.grid[this.board.end[0] + 1][this.board.end[1] + 1] !== null) { //check that jumped postion is not red or null
        killChecker(this.board.end[0] + 1, this.board.end[1] + 1); //if it's niether, remove opposite player
        return true
      }
    }
  } //end redOrBlackKingJumpLeft

  const killChecker = (rowPosition, columnPostion) => { //pass in coordinates from revlevant jump checks to kill a checker
    this.board.grid[rowPosition].splice([columnPostion], 1, null) //splice out the jumped checker
    //FIXME, if using this.checkers, remove one here..
    if (turn === red) {
      black.count-- //lower black count by 1
      console.log(`${black.name} has lost a piece and only has ${black.count} checkers left!`.red);
    } else {
      red.count-- //lower red count by 1
      console.log(`${red.name} has lost a piece and only has ${red.count} checkers left!`.red);
    }
  }
} //end Game class

function getPrompt() {
  game.board.viewGrid(); //call to print out initial board
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game([null, null], [null, null]); //creates a new Game class instance with begin and end constuctors
game.start(); //passed game instance to the start method inside of Game class










// Tests

if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      game.start();
      game.board.viewGrid();
      // assert.equal(game.board.checkers.length, 24);//FIXME WTF is checkers????? I bet it's tracking how many checks on the board
      const checkerCount = red.count + black.count
      assert.equal(checkerCount, 24);
    });
  });

  describe('Game.moveChecker()', function() {
    it('should move a checker', function() {
      assert(!game.board.grid[4][4]);
      game.moveChecker('55', '44');
      assert(game.board.grid[4][4]);
      game.moveChecker('22', '33');
      assert(game.board.grid[3][3]);
      game.moveChecker('51', '40');
      assert(game.board.grid[4][0]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('33', '55');
      assert(game.board.grid[5][5]);
      assert(!game.board.grid[3][3]);
      const checkerCount = red.count + black.count
      assert.equal(checkerCount, 23);
    });
    it('should be able to king either piece', () => {
      game.board.viewGrid();
      game.moveChecker('62', '51');
      game.moveChecker('24', '33');
      game.moveChecker('73', '62');
      game.moveChecker('55', '73');
      game.board.viewGrid();
      assert.equal(black.king, true);
      assert.equal(black.symbol, "B");
    });
  });
} else {
  getPrompt();
}
