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
    if (this.crew.length !== 0) {
      if (this.crew[this.crew.length -1].ship.type === jobTypes[this.crew[this.crew.length -1].job] ||
          this.crew[this.crew.length -1].job === 'programmer'){
        console.log(this.ability);
        return this.ability;
      }
    }
    console.log("Can't perform a mission yet.");
    return "Can't perform a mission yet.";

  }
}

let crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
let crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');
let crewMember3 = new CrewMember('mechanic dude', 'mechanic', 'stuff');
let crewMember4 = new CrewMember('Programmer Mike', 'programmer', 'javascript');


let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
let hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');

crewMember1.enterShip(mav);
mav.missionStatement();
crewMember2.enterShip(hermes);
hermes.missionStatement();
crewMember3.enterShip(mav);
mav.missionStatement();
crewMember4.enterShip(mav);
mav.missionStatement()
crewMember4.enterShip(hermes);
hermes.missionStatement();
;


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
      let crewMember3 = new CrewMember('Programmer Mike', 'programmer', 'javascript');
      assert.equal(mav.missionStatement(), "Can't perform a mission yet.");
      assert.equal(hermes.missionStatement(), "Can't perform a mission yet.");

      crewMember1.enterShip(mav);
      assert.equal(mav.missionStatement(), "Ascend into low orbit");
      crewMember2.enterShip(hermes);
      assert.equal(hermes.missionStatement(), "Interplanetary Space Travel");

      crewMember3.enterShip(mav);//check that programmer can go on any ship
      assert.equal(mav.missionStatement(), "Ascend into low orbit");
      crewMember3.enterShip(hermes);//check that programmer can go on any ship
      assert.equal(hermes.missionStatement(), "Interplanetary Space Travel");

    });

    it('refuse to return a mission statement if crew is wrong', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      let crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      let hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
      let crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');
      crewMember1.enterShip(hermes);//if crew is wrong, throw error
      assert.equal(hermes.missionStatement(), "Can't perform a mission yet.");

      crewMember2.enterShip(mav);//if crew is wrong, throw error
      assert.equal(mav.missionStatement(), "Can't perform a mission yet.");
    });
  });
}
