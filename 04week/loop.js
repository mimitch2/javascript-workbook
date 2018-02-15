'use strict';


const carsInReverse = ['honda', 'toyota', 'bmw','jeep', 'ford', 'tesla'];
const persons = {
  firstName: "Jane",
  lasName: "Doe",
  birthDate: "Jan 5, 1925",
  gender: "female"
};

const ForLoopFunction=()=> {
  for (var i = 0; i < carsInReverse.length; i++) {
    console.log(carsInReverse[i]);
  }
}

ForLoopFunction();

const forInFunction=()=> {
  for (let x in persons) {
    console.log(x);
  }
}

forInFunction();

const forInIfFunction=()=> {
  // for (let key in persons) {
  if (persons.hasOwnProperty('birthDate')) {
    console.log(persons['birthDate']);
  }else{
    console.log('no key');
  }
  // }
}

forInIfFunction();

const whileLoopFunction=()=> {
  let x = 0;
  while (x <= 1000) {
    console.log(x);
    x++;
  }
}

whileLoopFunction();


const doWhileFunction=()=> {
  let x = 0;
  do {
    console.log(x);
    x++;
  } while (x <= 1000);
}

doWhileFunction();
