// setup append end score to high score page


// create individual div for each user name

function addPlayerGameData() {
    var playerData = {};
    playerData.username = username;
    playerData.score = player0.points;
    arrayOfPlayers.push(playerData);
    arrayOfPlayers.sort((a, b) => a.score < b.score);
}

function appendEndScoreToPage() {
    $("#score-box").empty();            // clear the current data
    for (var i = 0; i < arrayOfPlayers.length; i++) {
        var playerData = arrayOfPlayers[i];
        var text = `${playerData.username} ${playerData.score}`
        var $div = $("<div>", {"id": `score${i}`});
        var $h3 = $("<h3>", {"text": text});
        $div.append($h3);
        $("#score-box").append($div);
    }
}

// create 20 sprites that shoot randomly from bottom of page to top; deletes any sprites it contacts; some add points

var specialMoveArray = [];
var haveSpecialMove = false;
var usedSpecialMove = false;

function makeSpecialSprites() {
    // make 20 sprites
    for (var i = 0; i < 20; i++) {
        var specialSprite = new Component(20, 20, './images/fire.png', 185, 300, 'image');
        specialMoveArray.push(specialSprite);
    }
    usedSpecialMove = true;
    $("#special").remove();
}

// run before updateSprites
function updateSpecialMove() {
    for (var i = 0; i < specialMoveArray.length; i++) {
        specialMoveArray[i].speedY = 1;
        specialMoveArray[i].update();
        specialMoveArray[i].newPos();
        
        // delete falling sprites that are touching special move
        fallingSprites = fallingSprites.filter(sprite => !inContact(specialMoveArray[i], sprite));
    }
    

    specialMoveArray = specialMoveArray.filter(sprite => sprite.y <= 0);    // remove sprites out of box
}
function specialMoveUsed() {
    haveSpecialMove = false;
    usedSpecialMove = true;
}

function canSpecialMove() {
    if (!haveSpecialMove && !usedSpecialMove) {     // first special move
        if (player0.points % 100 >= 0 && player0.points % 100 <= 10 && player0.points >= 100) {
            haveSpecialMove = true;
            createSpecialMoveButton();
            return true;
        } else {
            return false;
        }
    } else if (haveSpecialMove && !usedSpecialMove) {
        return true;
    } else if (!haveSpecialMove && usedSpecialMove) {
        return false;
    }
}

function createSpecialMoveButton() {
    var $button = $("<button>", {"class": "btn btn-primary", "id": "special", "type": "button", "text": "Special Ready"});
    $button.click(makeSpecialSprites);
    $('.game').append($button);
    // myGameArea.key = 32
}


