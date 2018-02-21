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
    var levelObjects = levelData[level];    // ex. [cloud, sun, lightning]

    for (var i = 0; i < levelObjects.length; i++) {
        var objectToPush = fallingObjectData[levelObjects[i]];
        typesToCreate.push(objectToPush);
    }
    buildFallingObjects(typesToCreate, levelAmount[level]);

}

// keys have to be entered via [] notation
var levelData = {
    1: ['cloud', 'sun', 'lightning'],
    2: ['healthBall', 'dollar1', 'sun', 'lightning'],
};
var levelAmount = {
    1: [2, 4, 6],
    2: [4, 4, 1, 1]
}


// current player stats
var player0 = new Character(100, 0);
var fallingObjectArray = [];

// fill the array
setFallingObjects(2);
console.log(fallingObjectArray);


// takes in an array of sprites in contact and apply points
function updateStatsAfterContact(player, contactingObjects) {
    // if in contact give me the sprite type
    for (var i = 0; i < contactingObjects.length; i++) {
        player.contact(contactingObjects[i]);
        
        // log out player stats
        console.log("PLAYER HEALTH:", player.health);
        console.log("PLAYER POINTS:", player.points);
    }   
}





