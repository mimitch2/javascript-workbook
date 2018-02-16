'use strict';

let assert = require('assert');

let jobTypes = {
  pilot: 'MAV',
  mechanic: 'Repair Ship',
  commander: 'Main Ship',
  programmer: 'Any Ship!'
};

// Your code here

// we need to create 2 classes, CrewMember and Ship
// CrewMember will have 4 items, name, job, specialSkill and Ship
// Ship will have name, type, ability and an empty array called crew for storing crew members
// set conditions for who can enter a ship, using the jobType object to match with the ship's abilties
// Make sure you only get the ship's mission statement IF the crew memebers job matches the ship's ability

class CrewMember {
  constructor (name, job, specialSkill, ship) {
    this.name = name;
    this.job = job;
    this.specialSkill =  specialSkill;
    this.ship = ship;
  }
  enterShip(shipName){
    shipName.crew.push(this)
    this.ship = shipName;
    // console.log(shipName.crew[0].job);

    // console.log('inside EnterShip');
    // console.log(this.name);
    // console.log(this.ship.name);
    // console.log(shipName.crew);
    // console.log(shipName.crew.length);
    // console.log(typeof shipName.crew);
  }
}



class Ship {
  constructor (name, type, ability, crew) {
    this.name = name;
    this.type = type;
    this.ability =  ability;
    this.crew = [];

  }
  missionStatement(){
    let jobLookup = jobTypes[this.crew[0].job]
    console.log(this.crew[0].ship.type);
    console.log(jobLookup);
    // console.log(this.crew[0].job);
    // console.log(this.type);
    if (this.crew[0].ship.type === jobTypes[this.crew[0].job]){
      return this.ability
    }else{
      return "Can't perform a mission yet."
    }
  }
}
//
let crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
// // let crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');
let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
// // let hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
//
crewMember1.enterShip(mav)
// // // crewMember2.enterShip(hermes)
mav.missionStatement();

//tests
if (typeof describe === 'function'){
  describe('CrewMember', function(){
    it('should have a name, a job, a specialSkill and ship upon instantiation', function(){
      var crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      assert.equal(crewMember1.name, 'Rick Martinez');
      assert.equal(crewMember1.job, 'pilot');
      assert.equal(crewMember1.specialSkill, 'chemistry');
      assert.equal(crewMember1.ship, null);
    });

    it('can enter a ship', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      let crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      crewMember1.enterShip(mav);
      assert.equal(crewMember1.ship, mav);
      assert.equal(mav.crew.length, 1);
      assert.equal(mav.crew[0], crewMember1);
    });
  });

  describe('Ship', function(){
    it('should have a name, a type, an ability and an empty crew upon instantiation', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      assert.equal(mav.name, 'Mars Ascent Vehicle');
      assert.equal(mav.type, 'MAV');
      assert.equal(mav.ability, 'Ascend into low orbit');
      assert.equal(mav.crew.length, 0);
    });

    it('can return a mission statement correctly', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      let crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      let hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
      let crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');
      assert.equal(mav.missionStatement(), "Can't perform a mission yet.");
      assert.equal(hermes.missionStatement(), "Can't perform a mission yet.");

      crewMember1.enterShip(mav);
      assert.equal(mav.missionStatement(), "Ascend into low orbit");

      crewMember2.enterShip(hermes);
      assert.equal(hermes.missionStatement(), "Interplanetary Space Travel");
    });
  });
}
