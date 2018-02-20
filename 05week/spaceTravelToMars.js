'use strict';

const assert = require('assert');

const jobTypes = {
  pilot: 'MAV',
  mechanic: 'Repair Ship',
  commander: 'Main Ship',
  programmer: 'Any Ship!'
};

// create 2 classes, CrewMember and Ship
// CrewMember will have 4 items, name, job, specialSkill and ship plus the enterShip() method
// Ship will have name, type, ability and an empty array called crew for storing crew members. It will also have the missionStatement() method
// will need to enter the crew member object into the ship array, and also assign that ship to the crew memeber
// Make sure you only get the ship's mission statement IF the crew memeber's job value matches the ship's ability by setting  conditions

class CrewMember {
  constructor (name, job, specialSkill, ship) {
    this.name = name;
    this.job = job;
    this.specialSkill =  specialSkill;
    this.ship = ship;
  }
  enterShip(shipName){
    shipName.crew.splice(0, 1, this)//remove anything in array, then add new crew
    this.ship = shipName;//assign a ship to the crew member
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
    if (this.crew.length === 1) {//make sure there is only 1 crew member onboard
      if (this.crew[0].ship.type === jobTypes[this.crew[0].job] ||//make sure crew matches ship ability OR...
          this.crew[0].job === 'programmer'){//if programmer, can run any ship
        return this.ability;//return the ship's ability
      }
    }
    return "Can't perform a mission yet.";//else return error
  }
}

const crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
const crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');
const crewMember3 = new CrewMember('mechanic dude', 'mechanic', 'stuff');
const crewMember4 = new CrewMember('Programmer Mike', 'programmer', 'javascript');


const mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
const hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');

crewMember1.enterShip(mav);
console.log(mav.missionStatement());
crewMember2.enterShip(hermes);
console.log(hermes.missionStatement());
crewMember3.enterShip(mav);
console.log(mav.missionStatement());
crewMember4.enterShip(mav);
console.log(mav.missionStatement());
crewMember4.enterShip(hermes);
console.log(hermes.missionStatement());



//tests
if (typeof describe === 'function'){
  describe('CrewMember', function(){
    it('should have a name, a job, a specialSkill and ship upon instantiation', function(){
      const crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      assert.equal(crewMember1.name, 'Rick Martinez');
      assert.equal(crewMember1.job, 'pilot');
      assert.equal(crewMember1.specialSkill, 'chemistry');
      assert.equal(crewMember1.ship, null);
    });

    it('can enter a ship', function(){
      const mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      const crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      crewMember1.enterShip(mav);
      assert.equal(crewMember1.ship, mav);
      assert.equal(mav.crew.length, 1);
      assert.equal(mav.crew[0], crewMember1);
    });
  });

  describe('Ship', function(){
    it('should have a name, a type, an ability and an empty crew upon instantiation', function(){
      const mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      assert.equal(mav.name, 'Mars Ascent Vehicle');
      assert.equal(mav.type, 'MAV');
      assert.equal(mav.ability, 'Ascend into low orbit');
      assert.equal(mav.crew.length, 0);
    });

    it('can return a mission statement correctly', function(){
      const mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      const crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      const hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
      const crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');
      const crewMember3 = new CrewMember('Programmer Mike', 'programmer', 'javascript');
      assert.equal(mav.missionStatement(), "Can't perform a mission yet.");
      assert.equal(hermes.missionStatement(), "Can't perform a mission yet.");
      crewMember1.enterShip(mav);
      assert.equal(mav.missionStatement(), "Ascend into low orbit");
      crewMember2.enterShip(hermes);
      assert.equal(hermes.missionStatement(), "Interplanetary Space Travel");

// new tests below

      crewMember3.enterShip(mav);//check that programmer can go on any ship
      assert.equal(mav.missionStatement(), "Ascend into low orbit");
      crewMember3.enterShip(hermes);//check that programmer can go on any ship
      assert.equal(hermes.missionStatement(), "Interplanetary Space Travel");

    });

    it('refuse to return a mission statement if crew is wrong', function(){
      const mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      const crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      const hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
      const crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');
      crewMember1.enterShip(hermes);//if crew is wrong, throw error
      assert.equal(hermes.missionStatement(), "Can't perform a mission yet.");

      crewMember2.enterShip(mav);//if crew is wrong, throw error
      assert.equal(mav.missionStatement(), "Can't perform a mission yet.");
    });
  });
}
