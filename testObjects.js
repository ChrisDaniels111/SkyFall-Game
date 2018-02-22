/////////////////////////////////////////////////
//////////////// Main Objects ///////////////////
/////////////////////////////////////////////////

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
        return (this.health <= 0); 
    }
}

class FallingObject {
    constructor(type, points, health) {
        this.type = type;
        this.points = points;
        this.health = health;
    }
}


/////////////////////////////////////////////////
//////////////// Global Data ////////////////////
/////////////////////////////////////////////////

var player0 = new Character(100, 0);                
var fallingObjectArray = [];                        // holds the falling objects that are in play
var level = 1;                                      // starting level

// score data
var username = 'Patrick'; // will get it from input
var arrayOfPlayers = [
    {username: 'Amber', score: 100},
    {username: 'Chris', score: 50},
];

var fallingObjectData = {                           // holds the stats for different objects
    cloud: ['cloud', 0, -1],
    sun: ['sun', -1, -3],
    lightning: ['lightning', -3, -5],
    healthBall: ['healthBall', 0, 2],
    megaHealthBall: ['megaHealthBall', 6, 6],
    dollar1: ['dollar1', 1, 0],
    dollar5: ['dollar5', 5, 0],
    dollar10: ['dollar10', 10, 1],
    dollar20: ['dollar20', 20, 5]
};

// levelData: arrays of keys for type of FallingObjects to be made
// levelAmount: arrays of FallingObjects amounts to be made
// keys have to be entered via [] notation
var levelData = {
    1: ['dollar1', 'dollar5', 'dollar10'],
    2: ['healthBall', 'dollar5', 'sun', 'lightning'],
    3: ['cloud', 'dollar10', 'lightning'],
    4: ['cloud', 'dollar5', 'lightning'],
    5: ['cloud', 'dollar5', 'lightning'],
    6: ['cloud', 'dollar5', 'lightning'],
};

var levelAmount = {
    1: [1, 1, 1],
    2: [1, 1, 1, 1],
    3: [4, 3, 4],
    4: [2, 3, 2],
    5: [2, 3, 2],
    6: [2, 3, 2],
};

var levelSpeed = {
    1: 2,
    2: 3,
    3: 4,
    4: 5,
    5: 6,
    6: 7
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////


////////////////////////////////////////////////////
//////////////// Game Management ///////////////////
////////////////////////////////////////////////////

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

function updateGameLevel() {
    var points = player0.points;
    if (points >= 20 && points < 35 && level == 1) {
        level++;                         // only allow level to incrememnt up
    } else if (points >= 35 && points < 50 && level == 2) {
        level++;
    } else if (points >= 50 && points < 65 && level == 3) {
        level++;
    } else if (points >= 65 && points < 80 && level == 4) {
        level++;
    } else if (points >= 80 && level == 5) {
        level++;
    } 
}

////////////////////////////////////////////////////
////////////////////////////////////////////////////


////////////////////////////////////////////////////
//////////////// Helper Functions //////////////////
////////////////////////////////////////////////////


// uses global array fallingObjectArray
// helper function that allows building different amounts of different FallingObjects
function buildFallingObjects(arrayOfTypes, arrayOfAmount) {
    fallingObjectArray = [];    // reset the global object array every time 
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



// **********************
// build an api connection to create special falling objects []
// **********************










