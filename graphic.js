// *********************************************************
// ***************** Graphic Module ************************
// *********************************************************

// Patrick Section

// Build 

$('document').ready(function() {
    startGame();
});

var myGamePiece;

function startGame() {
    
    myGamePiece = new Component(75, 75, "red", 205, 195);
    myGameArea.start();
    console.log(myGamePiece);
    
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);

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
// y increase moves downward
function updateGameArea() {
    myGameArea.clear();
    myGamePiece.speedX = 0;         // basically stops it from moving onward in direction set
    myGamePiece.speedY = 0;
    if (myGameArea.key && myGameArea.key == 37) {
        moveleft();
    }
    if (myGameArea.key && myGameArea.key == 39) {
        moveright();
    }
    myGamePiece.newPos();
    myGamePiece.update();
}


function moveleft() {
    myGamePiece.speedX = -5;
}

function moveright() {
    myGamePiece.speedX = 5;
}


// need to build a frame so that the box cannot move outside of it
