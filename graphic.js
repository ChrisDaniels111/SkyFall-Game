// *********************************************************
// ***************** Graphic Module ************************
// *********************************************************

// Patrick Section

// Build 

$('document').ready(function() {
    startGame();
});

var myGamePiece;
var fallingSprites = [];


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
        // document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        $('.game').append(this.canvas);
        this.interval = setInterval(updateGameArea, 20);
        this.spriteInterval = setInterval(setupSprites, 2000);

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
// helper function to control movement
function onLeftWall() {
    if (myGamePiece.x < 0) {        // left wall
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


// y increase moves downward
function updateGameArea() {
    myGameArea.clear();
    myGamePiece.speedX = 0;         // stops it from increasing base speed
    myGamePiece.speedY = 0;
    if (myGameArea.key && myGameArea.key == 37 && !onLeftWall()) {
        moveleft();
    }
    if (myGameArea.key && myGameArea.key == 39 && !onRightWall()) {
        moveright();
    }
    myGamePiece.newPos();
    myGamePiece.update();
    updateSprites();
    
}


function moveleft() {
    myGamePiece.speedX = -5;
}

function moveright() {
    myGamePiece.speedX = 5;
}


// need to build a frame so that the box cannot move outside of it [DONE]
// need to make random objects fall [DONE]

function randomX() {
    return Math.floor(Math.random() * 471);         // return x value between 0 and 470
}
function randomY() {
    return -10;                                     // start right outside canvas 
}
function speedSelector() {
    return Math.floor(Math.random() * 4);
}

// creates falling sprites and append to array
function makeSprites(amount) {
    for (var i = 0; i < amount; i++) {
        var newSprite = new Component(10, 10, 'green', randomX(), randomY());
        fallingSprites.push(newSprite);
    }
}

// use fallingObjectArray in testObjects.js
function makeSprites() {
    for (var i = 0; i < fallingObjectArray.length; i++) {
        var fallObject = fallingObjectArray[i];
        var color;

        // can be made into a function to select images
        switch (fallObject.type) {
            case 'cloud': 
                color = 'white';
                break;
            case 'sun':
                color = 'orange';
                break;
            case 'dollar1':
                color = 'green';
                break;
        }


        var newSprite = new Component(10, 10, color, randomX(), randomY());
        fallingSprites.push(newSprite);
    }
}

function updateSprites() {
    for (var i = 0; i < fallingSprites.length; i++) {
        fallingSprites[i].y += speedSelector();
        fallingSprites[i].id = i;                   // make new attribute for falling sprites
        fallingSprites[i].update();
    }
    
    fallingSprites = fallingSprites.filter(sprite => !inContact(myGamePiece, sprite));       // delete sprites that are in contact with piece
    fallingSprites = fallingSprites.filter(sprite => sprite.y <= 480);      // delete sprites that are out of the frame
    
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

function inBetween(num1, num2, widthHeight) {
    if (num2 >= num1 && num2 <= num1 + widthHeight) {
        return true;
    }
    return false;
}

// build sprites at a certain interval
function setupSprites() {
    var amountOfSprites = Math.floor(Math.random() * 8) + 1; // 1 inclusive to 9 exclusive
    makeSprites(amountOfSprites);
}




// add module to attach falling sprites to objects; myGamePiece to character
