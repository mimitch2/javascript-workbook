'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const isItValid=(hand1, hand2)=> {//check to see if answers are valid before comparing
  const possibleHands = ["rock", "paper", "scissors"];//array of valid inputs
  const newHand1 = hand1.toLowerCase().trim();//remove caps and white space
  const newHand2 = hand2.toLowerCase().trim();//remove caps and white space

  if(possibleHands.indexOf(newHand1) !== -1 && possibleHands.indexOf(newHand2) !== -1) {
    return rockPaperScissors(newHand1, newHand2);//run rockPaperScissors() only if both entries are valid
  }else{
    return 'Inavlid entry!! Please type rock, paper or scissors.'//else tell user of invalid entry(ies)
  }
}


const rockPaperScissors=(newHand1, newHand2)=> {//this runs ONLY if isItValid() passes
  if (newHand1 === newHand2) {//first check for a tie
    return "It's a tie!"//if true, it's a tie, if false move on
  } else if (newHand1 === 'rock' && newHand2 === 'scissors' ||//if no tie, check if hand1 is a winner
    newHand1 === 'scissors' && newHand2 === 'paper' ||
    newHand1 === 'paper' && newHand2 ==='rock'){
    return "Hand one wins!"//if true, hand1 wins
  }else{
    return "Hand two wins!"//else hand2 wins (no need to set conditions here)
  }
}

const getPrompt=()=> {//change to ES6 syntax
  rl.question('hand1: ', (answer1) => {
    rl.question('hand2: ', (answer2) => {
      console.log(isItValid(answer1, answer2));//changed this to call the new validation function
      getPrompt();
    });
  });
}



// Tests

if (typeof describe === 'function') {
  describe('#rockPaperScissors()', () => {
    it('should detect a tie', () => {
      assert.equal(rockPaperScissors('rock', 'rock'), "It's a tie!");
      assert.equal(rockPaperScissors('paper', 'paper'), "It's a tie!");
      assert.equal(rockPaperScissors('scissors', 'scissors'), "It's a tie!");
    });
    it('should detect which hand won', () => {
      assert.equal(rockPaperScissors('rock', 'paper'), "Hand two wins!");
      assert.equal(rockPaperScissors('paper', 'scissors'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock', 'scissors'), "Hand one wins!");
      assert.equal(rockPaperScissors('scissors', 'paper'), "Hand one wins!");
    });
    it('should scrub input to ensure lowercase with "trim"ed whitepace', () => {
      assert.equal(rockPaperScissors('rOcK', ' paper '), "Hand two wins!");
      assert.equal(rockPaperScissors('Paper', 'SCISSORS'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock ', 'sCiSsOrs'), "Hand two wins!");
    });
  });
  describe('#isitValid()', () => {
    it('should report invalid entries', () => {
      assert.equal(isItValid('blue', 'red'), "Inavlid entry!! Please type rock, paper or scissors.");
      assert.equal(isItValid('paper', 'yellow'), "Inavlid entry!! Please type rock, paper or scissors.");
      assert.equal(isItValid('"rock"', 'sCiSsOrs'), "Inavlid entry!! Please type rock, paper or scissors.");
    });
  });
}
