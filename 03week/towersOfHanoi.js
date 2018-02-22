'use strict';
const colors = require('colors'); //required for colors in terminal
const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

let moves = 0; //to track moves so we only have to check for win after 14

const printStacks = () => {
  console.log(`Moves: ${moves}`.cyan.underline); //log moves for every turn in cyan and underlined
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

const isInputValid = (startStack, endStack) => { //set tests that user input is valid
  const validInputs = /[abc]/; //valid inputs
  return startStack.length === 1 && endStack.length === 1 && //checks inputs are only 1 character,
    startStack.search(validInputs) === 0 && endStack.search(validInputs) === 0//and match a,b or c
}

const isEmptyStart = (startStack, endStack) => {
  return stacks[startStack].length !== 0 //checks that startStack is not empty
}

const isBiggerThan = (startStack, endStack) => {
  return stacks[endStack].length === 0 || stacks[endStack].slice(-1) > stacks[startStack].slice(-1)
  //if endStack is emptey OR if end's last array item is greater than start's last
}

const movePiece = (startStack, endStack) => {
  stacks[endStack].push(stacks[startStack].pop()); //use pop and push to move between arrays
  moves++; //iterate moves on each legal move
}

const checkForWin = (startStack, endStack) => {
  return stacks.c.length === 4 //see if last stack= 4,3,2,1
}

const resetGame = () => { //reset board and moves
  stacks = {
    a: [4, 3, 2, 1],
    b: [],
    c: []
  };
  moves = 0;
}

const towersOfHanoi = (startStack, endStack) => {
  startStack = startStack.toLowerCase();
  endStack = endStack.toLowerCase(); //force inputs to lowercase
  if (isInputValid(startStack, endStack)) { //check that input is valid
    if (isEmptyStart(startStack, endStack)) { //if emptyStart is true
      if (isBiggerThan(startStack, endStack)) { //if isBiggertahn is true
        movePiece(startStack, endStack); //move peice
      } else {
        console.log(`\n\u{274C}  You can't do that!!! endStack's last number must be greater that startStack's number.\n`.red);
      }
    } else {
      console.log(`\n\u{274C}  You can't do that!!! You cannot move from an empty stack!\n`.red);
    }
  } else {
    console.log(`\n\u{274C}  Invalid Input!! Make sure you enter either a, b or c.\n`.red);
  }
  if (moves > 13) { //only check for win starting at 14 moves since 15 is minimum to win
    if (checkForWin(startStack, endStack)) {
      printStacks(); //show the winning board first
      console.log(`\n\u{1F3C6}  WINNER with only ${moves} tries! \n \u{2B07} NEW GAME`.green);
      resetGame(); //reset for new game
    }
  }
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

getPrompt();




// <*************************** Tests ************************>

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('prevent invalid inputs', () => {
      towersOfHanoi('34', '  L');
      assert.deepEqual(stacks.a, [4, 3, 2, 1]);
      assert.deepEqual(stacks.b, []);
      assert.deepEqual(stacks.c, []);
    });
    it('change input to lowercase', () => {
      towersOfHanoi('A', 'B');
      assert.deepEqual(stacks.a, [4, 3, 2]);
      assert.deepEqual(stacks.b, [1]);
      assert.deepEqual(stacks.c, []);
    });
    it('should move from one stack to another empty stack', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks.a, [4, 3, 2]);
      assert.deepEqual(stacks.b, [1]);
    });
    it('should prevent moving to a stack with a larger number', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks.a, [4, 3, 2]);
      assert.deepEqual(stacks.b, [1]);
      assert.deepEqual(stacks.c, []);
    });
    it('should prevent moving from an empty stack', () => {
      towersOfHanoi('c', 'b');
      assert.deepEqual(stacks.a, [4, 3, 2]);
      assert.deepEqual(stacks.b, [1]);
      assert.deepEqual(stacks.c, []);
    });
    it('should allow moving to a stack with a larger number', () => {
      towersOfHanoi('b', 'a');
      assert.deepEqual(stacks.a, [4, 3, 2, 1]);
      assert.deepEqual(stacks.b, []);
      assert.deepEqual(stacks.c, []);
    });
    it('should dectect a win', () => {
      stacks = {
        a: [],
        b: [1],
        c: [4, 3, 2]
      };
      towersOfHanoi('b', 'c');
      assert.deepEqual(stacks.a, []);
      assert.deepEqual(stacks.b, []);
      assert.deepEqual(stacks.c, [4, 3, 2, 1]);
    });
    it('should reset game', () => {
      stacks = {
        a: [2],
        b: [1],
        c: [4, 3]
      };
      moves = 5;
      resetGame();
      assert.deepEqual(stacks.a, [4, 3, 2, 1]);
      assert.deepEqual(stacks.b, []);
      assert.deepEqual(stacks.c, []);
      assert.equal(moves, 0);
    });
  });
}



//
// Test 1: It should test to make sure the start stack has an avaialbe piece to grab. Example:
// stackStart = a    OK
// stackStart = b    NOT OK
// stackStart = c    NOT OK
//
// a: [4, 3, 2, 1],
// b: [],
// c: []
//
// Test 2: It should test to be sure that the startStack number is less than the endStack number. Example:
// stackStart = b & endStack = c  would be an allowable move
// stackStart = a & endStack = b  would NOT be an allowable move
//
// a: [4, 3],
// b: [1],
// c: [2]
//
//
//
// Test 3: It should move the piece from the startStack to the endStack if legal.
//
// BEFORE
// a: [4, 3, 2, 1],
// b: [],
// c: []
//
// AFTER
// startStack = a endStack = b
// a: [4, 3, 2,],
// b: [1],
// c: []
//
//
// Test 4: It should test for a win. Example:
// if stacks.c === 4, then WIN
// a: [],
// b: [],
// c: [4, 3, 2, 1]
//
// Test 5
