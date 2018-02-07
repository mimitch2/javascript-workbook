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


const isInputValid=(startStack, endStack)=> {//set tests that user input is valid (a,b or c) and is only 1 character
  console.log('INSIDE VALID CHECK');
  const validInputs = /[abc]/;//regExp
  if (startStack.search(validInputs) === 0 && endStack.search(validInputs) === 0){
    return true
  }
}

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

const movePiece=(startStack, endStack)=> {//use pop and push to move between arrays
  stacks[endStack].push(stacks[startStack].pop());
}

function isLegal() {
  return true
}

function checkForWin() {
  // Your code here

}

function towersOfHanoi(startStack, endStack) {
  startStack = startStack.toLowerCase();
  endStack = endStack.toLowerCase();
  if (isInputValid(startStack, endStack) && isLegal(startStack, endStack)) {//check that inout is valid, and move is legal
    moves++;
    movePiece(startStack, endStack);
  }
}


function getPrompt() {
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
