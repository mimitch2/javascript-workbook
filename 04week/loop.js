'use strict';


const carsInReverse = ['honda', 'toyota', 'bmw','jeep', 'ford', 'tesla'];
const persons = {
  firstName: "Jane",
  lasName: "Doe",
  birthDate: "Jan 5, 1925",
  gender: "female"
}

const ForLoopFunction=()=> {
  for (var i = 0; i < carsInReverse.length; i++) {
    console.log(carsInReverse[i]);
  }
}

ForLoopFunction();
