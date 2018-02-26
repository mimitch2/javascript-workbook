'use strict';
const colors = require('colors');
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

let turn = null;

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

function Checker(name, symbol, count, king) { //name, symbol, count and king of each checker
  this.name = name;
  this.symbol = symbol;
  this.count = count;
  this.king = king;
}

function Board() {

  this.grid = [];
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
    if (turn === this.black && this.red.count !== 0 || turn === this.red && this.black.count !== 0) {
      console.log(`Current turn = ${turn.name}`); //annouce turn each time
    }
    console.log(`${string}`);

  }

  this.fillBoard = () => { //FIXME maybe to refactor these loops?
    for (let row = 0; row < 3; row += 2) { //fill row 1 and 3 with same pattern black
      for (let b = 0; b < this.grid.length; b += 2) {
        this.grid[row].splice(b, 1, this.black)
      }
    }
    for (let b = 1; b < this.grid.length; b += 2) { //fill row 2 with alternate pattern black
      this.grid[1].splice(b, 1, this.black)
    }
    for (let row = 5; row < this.grid.length; row += 2) { //fill row 5 and 7 with same pattern red
      for (let r = 1; r < this.grid.length; r += 2) {
        this.grid[row].splice(r, 1, this.red)
      }
    }
    for (let r = 0; r < 8; r += 2) { //fill row 6 with alternate pattern red
      this.grid[6].splice(r, 1, this.red)
    }
    //***** below is just to help test win checks, so it only pushes 1 checker each
    // this.grid[5].splice(5, 1, black)
    // black.count = 1;
    // this.grid[6].splice(6, 1, red)
    // red.count = 1;
    // turn = black;//change this back and forth for easy win tests
    // red.king = true;
    // black.king = true;
    //**********END TEST AREA*************************
  }
} //end board class

function Game(begin, end) {
  console.log(this.board);
  this.black = new Checker("Black", 'b', 12, false); //FIXME can I reduce this scope???? so far no...
  this.red = new Checker('Red', 'r', 12, false);
  turn = this.red;
  console.log(this.black, this.red);
  this.begin = begin; //numneric array of original whichPiece input
  this.end = end; //numneric array of original toWhere input
  this.board = new Board(); //makes new instance of Board class

  this.start = () => {
    this.board.createGrid();
    this.board.fillBoard(); //call to fill board with initial postions
  };
  let blackKingCounter = 0;
  let redKingCounter = 0;
  this.moveChecker = (whichPiece, toWhere) => { //move the checker if valid and legal
    if (isInputValid(whichPiece, toWhere)) { //check for valid inputs
      parsInput(whichPiece, toWhere); //parse the inputs to numbers
      if (isMoveLegal()) { //check if move is legal
        this.board.grid[this.board.begin[0]].splice([this.board.begin[1]], 1, null) //if legal, remove checker
        this.board.grid[this.board.end[0]].splice([this.board.end[1]], 1, turn) //then splice into new postion

        if (blackKingCounter < 1 || redKingCounter < 1) { //change this to determine how many are needed for king
          kingMe();
        }
        if (checkForWin()) {
          console.log(`${turn.name} Wins!!!`);
          rl.question('Press Enter to start a new game: ', () => { // prompt user to start new game
            this.start();//FIXME why is the prompt printing twice???/
            getPrompt();
          });
        }
        if (turn === this.red) { //switch turns
          turn = this.black;
        } else {
          turn = this.red;
        }
      } else { //if illegal, don't move and throw error
        console.log('Illegal Move!!');
      }
    } else { //if invalid don't move and throw error
      console.log('INVALID INPUT!!');
    }
  }//end movechecker

  const kingMe = () => {
    if (turn === this.black && this.board.end[0] === 7) {//if black hits row 7
      blackKingCounter++;//iterate how many times he has
    }
    if (blackKingCounter === 1) {//if counter reaches threshold...
      this.black.king = true;//make all pieces kings and change symbol
      this.black.symbol = "B";
    }
    if (turn === this.red && this.board.end[0] === 0) {//if red hits row 0
      redKingCounter++;//itterate how many times he has
    }
    if (redKingCounter === 1) {//if counter reaches threshold...
      this.red.king = true;//make all pieces kings and change symbol
      this.red.symbol = "R"
    }
  }//end KingMe

  const checkForWin = () => {
    return turn === this.red && this.black.count === 0 || turn === this.black && this.red.count === 0
  }

  const parsInput = (whichPiece, toWhere) => { //split and parse inputs into arays with numbers
    whichPiece = whichPiece.split(''); //split into an array of 2 strings
    toWhere = toWhere.split('');
    const numberwhichPiece = whichPiece.map((num) => { //parse each array into numbers
      return Number(num);
    });
    const numberToWhere = toWhere.map((num2) => {
      return Number(num2);
    });
    this.board.begin = numberwhichPiece; //make board object's begin eaual to the new array
    this.board.end = numberToWhere; //make board object's end equal to the new array
  }//endParseInput

  const isMoveLegal = () => { //main function to check for legal moves
    if (this.board.grid[this.board.begin[0]][this.board.begin[1]] === turn && //only can move own checker AND
      this.board.grid[this.board.end[0]][this.board.end[1]] === null) { //only can move to empty spot
      if (this.board.end[1] === this.board.begin[1] + 1 || //and only move +1 column
        this.board.end[1] === this.board.begin[1] - 1) { //OR only move -1 column

        if (turn === this.black || turn === this.red && this.red.king === true){//black regular OR red kings can move +1 row
          if(this.board.end[0] === this.board.begin[0] + 1) {
            return true
          }
        }else if (turn === this.red || turn === this.black && this.black.king === true){//red regular OR black kings can move +1 row
          if (this.board.end[0] === this.board.begin[0] - 1){
            return true
          }
        }//below we check for valid jump moves
      } else if (turn === this.black && this.board.end[0] === this.board.begin[0] + 2 || //if trying to move +2 rows black
        turn === thisred && this.red.king === true && this.board.end[0] === this.board.begin[0] + 2) { //or king red +2 rows
        if (blackOrRedKingJumpRight() || blackOrRedKingJumpLeft()) { //call methods for either legal jump moves for black or red kings
          return true
        }
      } else if (turn === this.red && this.board.end[0] === this.board.begin[0] - 2 || //if trying to move -2 rows red
        turn === this.black && this.black.king === true && this.board.end[0] === this.board.begin[0] - 2) { //or king black -2 rows
        if (redOrBlackKingJumpRight() || redOrBlackKingJumpLeft()) { //call methods for either legal jump moves for red or black kings
          return true
        }
      }
    }
  } //end legal check

  /******the four methods below each check for specific jump scenarios and remove the jumped piece depending on if it's red or black, and what direction the jump was.FIXME both right jumps and both left jumps START with the same initial condition-try to refactor*/

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
    if (turn === this.red) {
      this.black.count-- //lower black count by 1
      console.log(`${black.name} has lost a piece and only has ${black.count} checkers left!`);
    } else {
      this.red.count-- //lower red count by 1
      console.log(`${red.name} has lost a piece and only has ${red.count} checkers left!`);
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
    // console.log(game.board.checkers.length);

    // console.log(game.board.fillBoard());
    it('board should have 24 checkers', () => {
      const game = new Game([null, null], [null, null]);
      game.start();
      game.board.viewGrid();
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
