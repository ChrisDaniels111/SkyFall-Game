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
// ******* assigned in graphicHelper.js *******
var username; // will get it from input
var arrayOfPlayers = [
    {username: 'Amber', score: 1000},
    {username: 'AAA', score: 999},
    {username: 'Chris', score: 888},
    {username: 'Random', score: 679},
    {username: 'Patrick', score: 234},
];


// ********************************************
// ************* Level Design *****************
// ********************************************

var imageDictionary = {
    // heals
    angel: './images/angel2.png',
    berry: './images/berry2.png',
    // damage
    fire: './images/fire.png',
    lightning: './images/bolt.png',
    // points
    coin0: './images/coin2.png',
    coin1: './images/coin2.png'
}

// holds the stats for different objects
var fallingObjectData = {     
    // heals
    angel: ['angel', 0, 5],
    berry: ['berry', 0, 10],
    // damage              
    fire: ['fire', 0, -15],
    lightning: ['lightning', -5, 0],
    // points
    coin0: ['coin0', 5, 0],
    coin1: ['coin1', 10, 0],
};

// levelData: arrays of keys for type of FallingObjects to be made
// levelAmount: arrays of FallingObjects amounts to be made
// keys have to be entered via [] notation
var levelData = {
    1: ['lightning', 'angel', 'coin0'],
    2: ['angel', 'coin0', 'fire', 'lightning'],
    3: ['fire', 'coin1', 'lightning'],
    4: ['fire', 'coin1', 'lightning', 'berry'],
    5: ['fire', 'coin1', 'lightning', 'berry'],
    6: ['fire', 'coin1', 'lightning', 'angel'],
};

var levelAmount = {
    1: [1, 1, 2],
    2: [1, 2, 1, 1],
    3: [1, 1, 2],
    4: [1, 2, 2, 1],
    5: [2, 2, 2, 1],
    6: [4, 2, 2, 1],
};

var levelSpeed = {
    1: 0.6,
    2: 0.75,
    3: 1,
    4: 1.25,
    5: 1.5,
    6: 2
}


// ********************************************
// ********************************************


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

// Handles Level Incrementation
function updateGameLevel() {
    var points = player0.points;
    if (points >= 200 && points < 500 && level == 1) {
        level++;                         // only allow level to incrememnt up
    } else if (points >= 500 && points < 700 && level == 2) {
        level++;
    } else if (points >= 700 && points < 900 && level == 3) {
        level++;
    } else if (points >= 1100 && points < 1300 && level == 4) {
        level++;
    } else if (points >= 1300 && level == 5) {
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













