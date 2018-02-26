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
// const black = new Checker("Black", `\u{26ab}`, 12, false); //FIXME can I reduce this scope???? so far no...
// const red = new Checker('Red', `\u{1F534}`, 12, false);
const black = new Checker("Black", 'b', 12, false, '1'); //FIXME can I reduce this scope???? so far no...
const red = new Checker('Red', 'r', 12, false, '1');
// const black = new Checker("Black", "B", 12);
// const red = new Checker('Red', "R", 12);
let turn = red;


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

function Checker(name, symbol, count, king, id) { //name, symbol, count and king of each checker
  this.name = name;
  this.symbol = symbol;
  this.count = count;
  this.king = king;
  this.id = id;
}

function Board() {
  this.grid = [];
  this.checkers = 0; //tracks checkers so tests pass
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
    console.log(`Current turn = ${turn.name}`); //annouce turn each time
    console.log(`${string}`);

  }

  this.fillBoard = () => { //FIXME maybe to refactor these loops?

    for (let row = 0; row < 3; row += 2) { //fill row 1 and 3 with same pattern black
      for (let b = 0; b < this.grid.length; b += 2) {
        this.grid[row].splice(b, 1, black)
        this.checkers++
      }
    }
    for (let b = 1; b < this.grid.length; b += 2) { //fill row 2 with alternate pattern black
      this.grid[1].splice(b, 1, black)
      this.checkers++
    }
    for (let row = 5; row < this.grid.length; row += 2) { //fill row 5 and 7 with same pattern red
      for (let r = 1; r < this.grid.length; r += 2) {
        this.grid[row].splice(r, 1, red)
        this.checkers++
      }
    }
    for (let r = 0; r < 8; r += 2) { //fill row 6 with alternate pattern red
      this.grid[6].splice(r, 1, red)
      this.checkers++
    }
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
  // let blackKingCounter = 0;
  // let redKingCounter = 0;
  this.moveChecker = (whichPiece, toWhere) => { //move the checker if valid and legal
    if (isInputValid(whichPiece, toWhere)) { //check for valid inputs
      parsInput(whichPiece, toWhere); //parse the inputs to numbers
      if (isMoveLegal()) { //check if move is legal
        this.board.grid[this.board.begin[0]].splice([this.board.begin[1]], 1, null) //if legal, remove checker
        this.board.grid[this.board.end[0]].splice([this.board.end[1]], 1, turn) //then splice into new postion

        // if (blackKingCounter < 1 || redKingCounter < 1) { //FIXME change this to determine how many are needed for king
        //   kingMe();
        // }
        if (turn === red) { //switch turns
          turn = black;
        } else {
          turn = red;
        }

      } else { //if illegal, don't move and throw error
        console.log('Illegal Move!!');
      }
    } else { //if invalid don't move and throw error
      console.log('!!-----INVALID INPUT!!');
    }
  }

  // const kingMe = () => {
  //   console.log('turn before kinging= ', turn.name);
  //   console.log('black king before = ', blackKingCounter);
  //   console.log(this.board.end);
  //   if (turn === black && this.board.end[0] === 7) {
  //     blackKingCounter++;
  //   }
  //   if (blackKingCounter === 1) {
  //     black.king = true;
  //   }
  //   if (turn === red && this.board.end[0] === 0) {
  //     redKingCounter++;
  //   }
  //   if (redKingCounter === 1) {
  //     red.king = true;
  //   }
  //   console.log('black king after = ', blackKingCounter);
  //   console.log(black);
  //
  // }

  const parsInput = (whichPiece, toWhere) => { //split and parse inputs into arays with numbers
    whichPiece = whichPiece.split(''); //split into an array of 2 strings
    toWhere = toWhere.split('');
    const numberwhichPiece = whichPiece.map((num) => { //parse each array into numbers
      return parseInt(num);
    });
    const numberToWhere = toWhere.map((num2) => {
      return parseInt(num2);
    });
    this.board.begin = numberwhichPiece; //make board object's begin eaual to the new array
    this.board.end = numberToWhere; //make board object's end equal to the new array
  }

  const isMoveLegal = () => { //main function to check for legal moves
    if (this.board.grid[this.board.begin[0]][this.board.begin[1]] === turn && //only can move own checker AND
      this.board.grid[this.board.end[0]][this.board.end[1]] === null) { //only can move to empty spot
      if (this.board.end[1] === this.board.begin[1] + 1 || //and only move +1 column
        this.board.end[1] === this.board.begin[1] - 1) { //OR only move -1 column
        if (turn === black && this.board.end[0] === this.board.begin[0] + 1 || //back can only move +1 row
          turn === red && this.board.end[0] === this.board.begin[0] - 1) { //OR red can only move -1 row
          return true
        }
      } else if (turn === black && this.board.end[0] === this.board.begin[0] + 2) { //if trying to move +2 rows black
        if (blackJumpRight()) { //call methods for either legal jump moves for black
          return true
        } else if (blackJumpLeft()) {
          return true
        } //OR
      } else if (turn === red && this.board.end[0] === this.board.begin[0] - 2) { //if trying to move -2 rows red
        if (redJumpRight()) { //call methods for either legal jump moves for red
          return true
        } else if (redJumpLeft()) {
          return true
        }
      }
    }
  } //end legal check

  /******the four methods below each check for specific jump scenarios and remove the jumped piece depending on if it's red or black, and what direction the jump was.*****/

  const blackJumpRight = () => { //this to check JUST black jumps to the right
    if (this.board.end[1] === this.board.begin[1] + 2) { //if +2 columns it's a right jump
      if (this.board.grid[this.board.end[0] - 1][this.board.end[1] - 1] !== turn &&
        this.board.grid[this.board.end[0] - 1][this.board.end[1] - 1] !== null) { //check that jumped position is not black or null
        killChecker(this.board.end[0] - 1, this.board.end[1] - 1); //if it's niether, remove opposite player
        return true
      }
    }
  } //end blackJumpRight

  const blackJumpLeft = () => { //this to check JUST black jumps to the left
    if ((this.board.end[1] === this.board.begin[1] - 2)) { //if -2 columns it's a left jump
      if (this.board.grid[this.board.end[0] - 1][this.board.end[1] + 1] !== turn &&
        this.board.grid[this.board.end[0] - 1][this.board.end[1] + 1] !== null) { //check that jumped postion is not black or null
        killChecker(this.board.end[0] - 1, this.board.end[1] + 1); //if it's niether, remove opposite player
        return true
      }
    }
  } //end blackJumpLeft

  const redJumpRight = () => { //this to check JUST red jumps to the right
    if (this.board.end[1] === this.board.begin[1] + 2) { //if +2 columns it's a red right jump
      if (this.board.grid[this.board.end[0] + 1][this.board.end[1] - 1] !== turn &&
        this.board.grid[this.board.end[0] + 1][this.board.end[1] - 1] !== null) { //check that jumped postion is not red or null
        killChecker(this.board.end[0] + 1, this.board.end[1] - 1); //if it's niether, remove opposite player
        return true
      }
    }
  } //end redJumpRight

  const redJumpLeft = () => { //this to check JUST red jumps to the left
    if ((this.board.end[1] === this.board.begin[1] - 2)) { //if -2 columns it's a left jump
      if (this.board.grid[this.board.end[0] + 1][this.board.end[1] + 1] !== turn &&
        this.board.grid[this.board.end[0] + 1][this.board.end[1] + 1] !== null) { //check that jumped postion is not red or null
        killChecker(this.board.end[0] + 1, this.board.end[1] + 1); //if it's niether, remove opposite player
        return true
      }
    }
  } //end redJumpLeft

  const killChecker = (rowPosition, columnPostion) => { //pass in coordinates from revlevant jump checks to kill a checker
    this.board.grid[rowPosition].splice([columnPostion], 1, null) //splice out the jumped checker
    if (turn === red) {
      black.count-- //lower black count by 1
      console.log(`${black.name} has lost a piece and only has ${black.count} checkers left!`);
    } else {
      red.count-- //lower red count by 1
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
// console.log(game.board.checkers);









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
