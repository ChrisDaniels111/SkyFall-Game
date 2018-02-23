// *********************************************************
// ***************** Graphic Module ************************
// *********************************************************


////////////////////////////////////////////////////////////
///////////////////// START SEQUENCE ///////////////////////
////////////////////////////////////////////////////////////
$('document').ready(function() {
    createPokemonInputBox();
    $('#characterSelect').hide();
    
    $('#start-button').click(function() {
        username = $('#usernameInput').val();       // assign end score username
        $('.user-input').remove();
        $("#characterSelect").show();               // shows pokemon selector

    });

});

// canvas gets drawn in line 32: APIModule.js; startGame()
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////
///////////////////// Game Operations //////////////////////
////////////////////////////////////////////////////////////


// ******************** Game Variables **********************

var myGamePiece,
    myScore,
    myBackground;
var fallingSprites = [];                                // contains all the falling sprite objects on screen         


// *********************************************************


// class for sprite; speedX/Y allows for acceleration
class Component {
    constructor(width, height, color, x, y, fileType) {
        
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.color = color;
        this.x = x;
        this.y = y; 
        this.fileType = fileType;
        
        if (fileType == 'image') {
            this.image = new Image();
            this.image.src = color;
        } 
    }
      
    update() {
        var ctx = myGameArea.context;
        if (this.fileType == 'image') {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else if (this.fileType == 'text') {
            ctx.font = `${this.width} ${this.height}`;
            ctx.fillStyle = this.color;
            ctx.fillText(this.text, this.x, this.y);                                // this.text gets instantiated when you create a text Component
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    newPos() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function startGame() {
    
    // gets pokemon image from APIModule.js
    console.log(imagePokeURL);
    myBackground = new Component(480, 270, './images/background.png', 0, 0, 'image');
    myGamePiece = new Component(75, 75, imagePokeURL, 205, 175, 'image');
    myScore = new Component('15px', 'arial', 'black', 250, 40, 'text');

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
        this.spriteInterval = setInterval(makeSprites, 1500);

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
    },
    stop : function () {
        clearInterval(this.interval);
        clearInterval(this.spriteInterval);
    }
}

// ********************************************
// ************* Gameplay Loop ****************
// ********************************************

// y increase moves downward
function updateGameArea() {
    // call data from testObject.js
    // gameover check
    if (player0.gameover()) {

        myGameArea.stop();
        addPlayerGameData();        // display high score
        appendEndScoreToPage();
       
        alert(`Gameover! Your score was ${player0.points}!`);
        // add visual animation and append username/score to div

    } else {

        // regular game play
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
        
        // background insertion
        myBackground.newPos();
        myBackground.update();

        // update the text of player points
        myScore.text = `SCORE: ${player0.points} HEALTH: ${player0.health}`;
        myScore.update();

        // updates the position of all sprites (removes some) each frame update
        myGamePiece.newPos();
        myGamePiece.update();
        updateGameLevel();              // adjusts level based on points; in testObjects.js
        updateSprites();

        if (!buttonExist) {
            updateSpecialMove();
        }
    }
}

// ********************************************
// ********************************************


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
    var contactingSprites = [];
    for (var i = 0; i < fallingSprites.length; i++) {
        fallingSprites[i].speedY = speedSelector();
        fallingSprites[i].update();
        fallingSprites[i].newPos();
    }

    // Build feature to change points
    contactingSprites = fallingSprites.filter(sprite => inContact(myGamePiece, sprite));
    updateStatsAfterContact(player0, contactingSprites);

    // contact sprites will be deleted in line 170
    fallingSprites = fallingSprites.filter(sprite => !inContact(myGamePiece, sprite));       // delete sprites that are in contact with piece
    fallingSprites = fallingSprites.filter(sprite => sprite.y <= 480);                       // delete sprites that are out of the frame
}


// use fallingObjectArray in testObjects.js
function makeSprites() {
    for (var i = 0; i < fallingObjectArray.length; i++) {
        var fallObject = fallingObjectArray[i];
        var img;

        img = spriteIMG(fallObject);

        var newSprite = new Component(20, 20, img, randomX(), randomY(), 'image');
        
        // add tracker to sprite type in data
        // add unique data ability to points/health
        newSprite.type = fallObject.type;
        newSprite.points = fallObject.points;
        newSprite.health = fallObject.health;
        
        fallingSprites.push(newSprite);
    }
    setFallingObjects(level);               // calls testObjects.js and changes the fallingObjectArray loadout
    console.log('level', level);
    
}


////////////////////////////////////////////////////////////
///////////////////// Helper Functions /////////////////////
////////////////////////////////////////////////////////////
///////////////////// Sprite Building //////////////////////
////////////////////////////////////////////////////////////


function randomX() {
    return Math.floor(Math.random() * 471);                         // return x value between 0 and 470
}
function randomY() {
    return - (Math.floor(Math.random() * 100) + 10);                 // start right outside canvas; between -10 and -50
}
function speedSelector() {
    return levelSpeed[level];               // create a speed selector based on levels
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
    return false;
}

// helper function to help decide color based on type
function spriteIMG(fallingObject) {
    return imageDictionary[fallingObject.type];
}

////////////////////////////////////////////////////////////
/////////////////// END Sprite Functions ///////////////////
////////////////////////////////////////////////////////////

