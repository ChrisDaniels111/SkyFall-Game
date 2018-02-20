// *********************************************************
// *********************************************************
// *********************************************************
// ***************** Amber's Section ***********************
// *********************************************************
// ******************* Character Class *********************
// *********************************************************



// 1. Build a character class with attributes: {name, health, points, etc}
var fallingObjectType;
var fallingObjectPoints;
var fallingObjectHealth;


class Character {
    constructor(health, points) {
        this.health = health;
        this.points = points;
    }
}

var stickMan = new Character(100, 0);

var contact = function (stickCharacter, fallingItem) {
    console.log(fallingItem.type);
    stickCharacter.health = stickCharacter.health + fallingItem.health;
    stickCharacter.points = stickCharacter.points + fallingItem.points;
}
contact(stickMan, cloud);
console.log(stickMan);

var gameOver = function(stickMan){
    if (stickMan.health <= 0){
        alert("game over");
        console.log("game over");
    }
    else if  (stickMan.points >= 100) {
        alert("you win");
        console.log("you win");
        
    }
    else {
        console.log("function is runing");
    }
}

// 2. Add checks for isAlive(), won()/gameover()

