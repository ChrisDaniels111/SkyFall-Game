class Character {
    constructor(health, points) {
        this.health = health;
        this.points = points;
    }
    contact(fallingObject) {
        this.health += fallingObject.health;
        this.points += fallingObject.points;
    }
    gameover() {
        return (this.health <= 0 || this.points >= 100); 
    }
    won() {
        return this.points >= 100;
    }
}

var fallingObjectData = {
    cloud: ['cloud', 0, -1],
    sun: ['sun', -1, -3],
    lightning: ['lightning', -3, -5],
    healthBall: ['healthBall', 0, 2],
    megaHealthBall: ['megaHealthBall', 6, 6],
    dollar1: ['dollar1', 1, 0],
    dollar5: ['dollar5', 5, 0],
    dollar10: ['dollar10', 10, 1],
    dollar20: ['dollar20', 20, 5]
}

class FallingObject {
    constructor(type, points, health) {
        this.type = type;
        this.points = points;
        this.health = health;
    }

}

// helper function that allows building different amounts of different FallingObjects
function buildFallingObjects(arrayOfTypes, arrayOfAmount) {
    for (var i = 0; i < arrayOfTypes.length; i++) {
        var type = arrayOfTypes[i][0],
            points = arrayOfTypes[i][1],
            health = arrayOfTypes[i][2];
        
        for (var j = 0; j < arrayOfAmount[i]; j++) {
            var insert = new FallingObject(type, points, health);
            fallingObjectArray.push(insert);
        }
    }
}

// create falling objects base on level; example: 3 clouds, 5 suns, 2 dollar1
function setFallingObjects(level) {
    var typesToCreate = [];
    var arrayOfAmount = [];         // how many clouds/suns/dollars you want to make in array form
    if (level == 1) {
        typesToCreate.push(fallingObjectData.cloud);
        typesToCreate.push(fallingObjectData.sun);
        typesToCreate.push(fallingObjectData.dollar1);
        arrayOfAmount = [2, 4, 6];
        buildFallingObjects(typesToCreate, arrayOfAmount);
    }

}


var player0 = new Character(100, 0);
var fallingObjectArray = [];

// fill the array
setFallingObjects(1);