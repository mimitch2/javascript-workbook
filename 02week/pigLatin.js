'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//<*******************Whiteboard******************************>
// 1. declare a GLOBAL empty array called "wordArray" to store the individual letters of the input string
//
// 2.  create the function isInputValid(word) that should first force all letters to lower case, then validate that input taken from getPrompt() is only a single word.
//
// -first force string to lower case using toLowerCase()
// -move onto the if/else statement:
// IF the word contains no spaces (this is done using indexOf and searching for a space ‘ ‘)
// THEN
// -move onto the next function splitWord()
// ELSE
// -Throw an error that the input is invalid
// 3.  function splitWord(word):
// -assign wordArray to the string with .split() attached to create an array of the individual letters
// -move onto the next function pigLatin()
//
// 4. function pigLatin():
// -declare a LOCAL array that stores all vowels named vowelArray[‘a’, ‘e’, ‘i’, ‘o’, ‘u’] to reference
// -if/else statement to determine if the first letter is a vowel:
// IF the first letter in wordArray is a vowel (use indexOf to compare wordArray’s 0 index)
// THEN
// -turn the array of letters back into a string (using.join()),  and return the full string plus ‘yay”)
// ELSE
// -create a variable “vowelIndex” to store the index of the first vowel found
// -loop through the string until you find the index position of the first vowel encountered using a for loop, assigning the for loop’s i variable to “vowelIndex” UNTIL it gets to a vowel (by using another if statement that if it encounters a vowel, stop the loop)
// -Once you have the index of the first vowel, create a new variable newWord assign it to the subString() of the original string
// -return the newWord variable plus the original string starting at the index position if the vowel plus “ay”
// ELSE
// -return error that the word has no vowels
//<****************************Begin code*********************************>

let wordArray =[];//global array

const isInputValid=(word)=> {
  word = word.toLowerCase();//force input to lowercase
  if (word.indexOf(' ') === -1) {//check to be sure there are no spaces in user input
    // console.log('INSDIE VALIDATOR');
    return splitWord(word);//if there are no spaces, call splitWord()
  } else{
    return 'Invalid input! Only use a single word with no spaces.'//else throw error
  }
}

const splitWord=(word)=> {
  wordArray = word.split('');//insert the string as an array of it's letters into wordArray[]
  // console.log(wordArray);
  return pigLatin(wordArray);//call pigLatin()
}


const pigLatin=(word)=> {
  const vowelArray = ['a','e','i','o','u'];
  if (vowelArray.indexOf(wordArray[0]) !== -1) {// check if first letter is a vowel
    return `${wordArray.join('')}yay`;//if so, just return the full word + yay
  }else{//else move and analyze where the first vowel is
    let vowelIndex;//create variable to store first vowel index position
    word = wordArray.join('');//change the array back into a string
    for (var i = 0; i < word.length; i++) {//loop through string....
      vowelIndex = word.charAt(i);//assign variable char the index of the vowel...
      if(vowelArray.indexOf(vowelIndex) !== -1)
        break;//stop loop once a vowel is found, thus char will be the index of that first vowel
    }
    if (i < word.length) {//make sure it actually finds a vowel
      let newWord = word.substring(i);//if so, create new variable that is the original string from the first vowel to the end
      return `${newWord + word.substring(0, i)}ay`//return the new word, plus the first removed letter(s) plus ay
      // console.log(newWord + word.substring(0, i));
    }else{
      return "There are no vowels in this word. Do you even English bro?"//unless there are no vowels in the word
    }
  }
}


const getPrompt=()=> {
  rl.question('word ', (answer) => {
    console.log( isInputValid(answer) );//changed this to call input function
    getPrompt();
  });
}

//<***************************Tests*********************>

if (typeof describe === 'function') {

  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
  });
} else {

  getPrompt();

}


//forEach replaces loops!!!  Must be array  array.forEach((goodnameForAFunction)=>{

// })

// 
// <******************BACKUP************************************>
//
// 'use strict';
//
// const assert = require('assert');
// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
//
// //<*******************Whiteboard******************************>
// // 1. declare a GLOBAL empty array called "wordArray" to store the individual letters of the input string
// //
// // 2.  create the function isInputValid(word) that should first force all letters to lower case, then validate that input taken from getPrompt() is only a single word.
// //
// // -first force string to lower case using toLowerCase()
// // -move onto the if/else statement:
// // IF the word contains no spaces (this is done using indexOf and searching for a space ‘ ‘)
// // THEN
// // -move onto the next function splitWord()
// // ELSE
// // -Throw an error that the input is invalid
// // 3.  function splitWord(word):
// // -assign wordArray to the string with .split() attached to create an array of the individual letters
// // -move onto the next function pigLatin()
// //
// // 4. function pigLatin():
// // -declare a LOCAL array that stores all vowels named vowelArray[‘a’, ‘e’, ‘i’, ‘o’, ‘u’] to reference
// // -if/else statement to determine if the first letter is a vowel:
// // IF the first letter in wordArray is a vowel (use indexOf to compare wordArray’s 0 index)
// // THEN
// // -turn the array of letters back into a string (using.join()),  and return the full string plus ‘yay”)
// // ELSE
// // -create a variable “vowelIndex” to store the index of the first vowel found
// // -loop through the string until you find the index position of the first vowel encountered using a for loop, assigning the for loop’s i variable to “vowelIndex” UNTIL it gets to a vowel (by using another if statement that if it encounters a vowel, stop the loop)
// // -Once you have the index of the first vowel, create a new variable newWord assign it to the subString() of the original string
// // -return the newWord variable plus the original string starting at the index position if the vowel plus “ay”
// // ELSE
// // -return error that the word has no vowels
// //<****************************Begin code*********************************>
//
// let wordArray =[];//global array
//
// const isInputValid=(word)=> {
//   word = word.toLowerCase();//force input to lowercase
//   if (word.indexOf(' ') === -1) {//check to be sure there are no spaces in user input
//     // console.log('INSDIE VALIDATOR');
//     return splitWord(word);//if there are no spaces, call splitWord()
//   } else{
//     return 'Invalid input! Only use a single word with no spaces.'//else throw error
//   }
// }
//
// const splitWord=(word)=> {
//   wordArray = word.split('');//insert the string as an array of it's letters into wordArray[]
//   // console.log(wordArray);
//   return pigLatin(wordArray);//call pigLatin()
// }
//
//
// const pigLatin=(word)=> {
//   const vowelArray = ['a','e','i','o','u'];
//   if (vowelArray.indexOf(wordArray[0]) !== -1) {// check if first letter is a vowel
//     return `${wordArray.join('')}yay`;//if so, just return the full word + yay
//   }else{//else move and analyze where the first vowel is
//     let vowelIndex;//create variable to store first vowel index position
//     word = wordArray.join('');//change the array back into a string
//     for (var i = 0; i < word.length; i++) {//loop through string....
//       vowelIndex = word.charAt(i);//assign variable char the index of the vowel...
//       if(vowelArray.indexOf(vowelIndex) !== -1)
//         break;//stop loop once a vowel is found, thus char will be the index of that first vowel
//     }
//     if (i < word.length) {//make sure it actually finds a vowel
//       let newWord = word.substring(i);//if so, create new variable that is the original string from the first vowel to the end
//       return `${newWord + word.substring(0, i)}ay`//return the new word, plus the first removed letter(s) plus ay
//       // console.log(newWord + word.substring(0, i));
//     }else{
//       return "There are no vowels in this word. Do you even English bro?"//unless there are no vowels in the word
//     }
//   }
// }
//
//
// const getPrompt=()=> {
//   rl.question('word ', (answer) => {
//     console.log( isInputValid(answer) );//changed this to call input function
//     getPrompt();
//   });
// }
//
// //<***************************Tests*********************>
//
// if (typeof describe === 'function') {
//
//   describe('#pigLatin()', () => {
//     it('should translate a simple word', () => {
//       assert.equal(pigLatin('car'), 'arcay');
//       assert.equal(pigLatin('dog'), 'ogday');
//     });
//     it('should translate a complex word', () => {
//       assert.equal(pigLatin('create'), 'eatecray');
//       assert.equal(pigLatin('valley'), 'alleyvay');
//     });
//     it('should attach "yay" if word begins with vowel', () => {
//       assert.equal(pigLatin('egg'), 'eggyay');
//       assert.equal(pigLatin('emission'), 'emissionyay');
//     });
//     it('should lowercase and trim word before translation', () => {
//       assert.equal(pigLatin('HeLlO '), 'ellohay');
//       assert.equal(pigLatin(' RoCkEt'), 'ocketray');
//     });
//   });
// } else {
//
//   getPrompt();
//
// }
