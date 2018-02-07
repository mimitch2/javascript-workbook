'use strict';

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
let moves = 0;// use this to track moves so we only have to check for win after 14


const isInputValid=(startStack, endStack)=> {//set tests that user input is valid
  console.log('INSIDE VALID INPUTS');
  const validInputs = /[abc]/;//valid inputs
  if (startStack.length === 1 && endStack.length === 1){//check inputs are only 1 character
    if (startStack.search(validInputs) === 0 && endStack.search(validInputs) === 0){//check that inputs are a, b or c only
      return true
    }
  }
}

const printStacks=()=> {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

const movePiece=(startStack, endStack)=> {//use pop and push to move between arrays
  stacks[endStack].push(stacks[startStack].pop());
}

const isLegal=()=> {
  return true
}

const checkForWin=()=> {//see if last array= 4,3,2,1
  if (stacks.c.length === 4) {
    console.log("INSIDE WIN CHECK");
    return true
  }
}

const towersOfHanoi=(startStack, endStack)=> {
  startStack = startStack.toLowerCase();
  endStack = endStack.toLowerCase();
  if (isInputValid(startStack, endStack) && isLegal(startStack, endStack)) {//check that inout is valid, and move is legal
    moves++;//iterate moves on each legal move
    movePiece(startStack, endStack);
    if (moves>13) {//only check for win starting at 14 moves since 15 is minimum to win
      if (checkForWin(startStack, endStack)) {//only if checkForWin is true
        console.log("Winner!");
      }
    }
  }
}


const getPrompt=()=> {
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
