// *********************************************************
// ***************** Graphic Module ************************
// *********************************************************

// Patrick Section

// Build 

$('document').ready(function() {
    startGame();
});



////////////////////////////////////////////////////////////
///////////////////// Game Operations //////////////////////
////////////////////////////////////////////////////////////


// ******************** Game Variables **********************

var myGamePiece;
var fallingSprites = [];
var colorDictionary = {
    cloud: 'white',
    sun: 'orange',
    lightning: 'yellow',
    healthBall: '#0061ff',
    megaHealthBall: '#e5e112',
    dollar1: 'green',
    dollar5: '#12e51c',
    dollar10: '#48d64f',
    dollar20: '#17841d',
}

// *********************************************************


// class for sprite; speedX/Y allows for acceleration
class Component {
    constructor(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.color = color;
        this.x = x;
        this.y = y;  
    }
      
    update() {
        var ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    newPos() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function startGame() {
    myGamePiece = new Component(75, 75, "red", 205, 195);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");

        // canvas placement in div 
        $('.game').append(this.canvas);

        // interval of updating character sprite and falling sprites
        this.interval = setInterval(updateGameArea, 20);
        this.spriteInterval = setInterval(makeSprites, 2000);

        // keyboard event listeners
        $('body').on('keydown', function(e) {
            myGameArea.key = e.keyCode;
        });
        $('body').on('keyup', function(e) {
            myGameArea.key = false;
        });

    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// y increase moves downward
function updateGameArea() {
    myGameArea.clear();
    myGamePiece.speedX = 0;         // stops it from increasing base speed
    myGamePiece.speedY = 0;

    // changes our sprite's x position
    if (myGameArea.key && myGameArea.key == 37 && !onLeftWall()) {
        moveleft();
    }
    if (myGameArea.key && myGameArea.key == 39 && !onRightWall()) {
        moveright();
    }

    // updates the position of all sprites (removes some) each frame update
    myGamePiece.newPos();
    myGamePiece.update();
    updateSprites();
}

////////////////////////////////////////////////////////////
///////////////////// Helper Functions /////////////////////
////////////////////////////////////////////////////////////
///////////////////// Sprite Movement //////////////////////
////////////////////////////////////////////////////////////

function moveleft() {
    myGamePiece.speedX = -5;
}

function moveright() {
    myGamePiece.speedX = 5;
}

// checks if our sprite is at the edge of our canvas
function onLeftWall() {
    if (myGamePiece.x < 0) {        
        myGamePiece.x = 0;
        return true;
    }
    return false;
}

function onRightWall() {
    if (myGamePiece.x > 405) {        // right wall; counts x from the left edge of box
        myGamePiece.x = 405;
        return true;
    }
    return false;
}



////////////////////////////////////////////////////////////
/////////////////// END Game Operations ////////////////////
////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////
///////////////////// Sprite Functions /////////////////////
////////////////////////////////////////////////////////////

function updateSprites() {
    for (var i = 0; i < fallingSprites.length; i++) {
        fallingSprites[i].y += speedSelector();
        fallingSprites[i].id = i;                   // make new attribute for falling sprites
        fallingSprites[i].update();
    }
    fallingSprites = fallingSprites.filter(sprite => !inContact(myGamePiece, sprite));       // delete sprites that are in contact with piece
    fallingSprites = fallingSprites.filter(sprite => sprite.y <= 480);                       // delete sprites that are out of the frame
}


// use fallingObjectArray in testObjects.js
function makeSprites() {
    for (var i = 0; i < fallingObjectArray.length; i++) {
        var fallObject = fallingObjectArray[i];
        var color;

        color = spriteColor(fallObject);

        var newSprite = new Component(10, 10, color, randomX(), randomY());
        fallingSprites.push(newSprite);
    }
}

////////////////////////////////////////////////////////////
///////////////////// Helper Functions /////////////////////
////////////////////////////////////////////////////////////
///////////////////// Sprite Building //////////////////////
////////////////////////////////////////////////////////////


function randomX() {
    return Math.floor(Math.random() * 471);         // return x value between 0 and 470
}
function randomY() {
    return -10;                                     // start right outside canvas 
}
function speedSelector() {
    return Math.floor(Math.random() * 4);
}

function inBetween(num1, num2, widthHeight) {
    if (num2 >= num1 && num2 <= num1 + widthHeight) {
        return true;
    }
    return false;
}

// need to plug in contact module between character and falling objects
function inContact(characterSprite, fallingSprite) {
    var playerX = characterSprite.x,
        playerY = characterSprite.y,
        playerW = characterSprite.width,
        playerH = characterSprite.height,
        fallX = fallingSprite.x,
        fallY = fallingSprite.y;

    // inside/touching; low resolution doesn't add contact on all pixel area
    if (inBetween(playerX, fallX, playerW) &&
        inBetween(playerY, fallY, playerH)) {
        return true;
    } 
    
}

// helper function to help decide color based on type
function spriteColor(fallingObject) {
    return colorDictionary[fallingObject.type];
}

////////////////////////////////////////////////////////////
/////////////////// END Sprite Functions ///////////////////
////////////////////////////////////////////////////////////


// add module to attach falling sprites to objects; myGamePiece to character
