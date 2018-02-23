// *********************************************************
// *********************************************************
// *********************************************************
// ****************** Chris' Section ***********************
// *********************************************************
// ******************* Falling Objects Class ***************
// *********************************************************



// 1. Build a FallingObject class with attributes: {type, damage, points, etc}
// 
$(document).ready(function () {

    var fallingObjectsArray = [];
    // var usernameArray = [];
    var players = [];


    /////////////   FALLING OBJECTS     /////////////////
    class FallingObject {
        constructor(type, points, health) {
            this.type = type;
            this.points = points;
            this.health = health;
        }
    }

    var cloud = new FallingObject('Cloud', 0, -1);

    var sun = new FallingObject('Sun', -1, -3);

    var lightning = new FallingObject('Lighting', -3, -5);

    var healthBall = new FallingObject('Health Ball', 0, 2);

    var megaHealthBall = new FallingObject('Mega Health Ball', 6, 6);

    var dollar1 = new FallingObject('One', 1, 0);

    var dollar5 = new FallingObject('Five', 5, 0);

    var dollar10 = new FallingObject('Ten', 10, 1);

    var dollar20 = new FallingObject('Twenty', 20, 5);


    fallingObjectsArray.push(cloud);//0
    fallingObjectsArray.push(sun);//1
    fallingObjectsArray.push(lightning);//2
    fallingObjectsArray.push(healthBall);//3
    fallingObjectsArray.push(megaHealthBall);//4
    fallingObjectsArray.push(dollar1);//5
    fallingObjectsArray.push(dollar5);//6
    fallingObjectsArray.push(dollar10);//7
    fallingObjectsArray.push(dollar20);//8

    // console.log(fallingObjectsArray);
    /////////////////    END    ///////////////////////////


    ////////////    USERNAME AND SCORE    /////////////////
    // class UsernameScore {
    //     constructor(username, score) {
    //         this.username = username;
    //         this.score = score;
    //     }
    // }

    // var player1 = new UsernameScore('Player 1', 333);

    // var player2 = new UsernameScore('Player 2', 444);

    // var player3 = new UsernameScore('Player 3', 111);

    // var player4 = new UsernameScore('Player 4', 222);


    // usernameArray.push(player1);//0
    // usernameArray.push(player2);//1
    // usernameArray.push(player3);//2
    // usernameArray.push(player4);//3

    // console.log(usernameArray);

    players[0] = {
        username: 'Player 1',
        score: 333,
    }
    players[1] = {
        username: 'Player 2',
        score: 444,
    }
    players[2] = {
        username: 'Player 3',
        score: 222,
    }
    players[3] = {
        username: 'Player 4',
        score: 111,
    };




    var sortPlayerScore = players.sort(function (a, b) { return a.score < b.score });


    //console.log("this is the highschore - ", highScore(players));
    // console.log(players.sort(function (a, b) { return a.score < b.score }));

    //////////////////////////    END    ///////////////////////////////



    //////////////////// ENTER USERNAME  /////////////////////

    $("#characterSelect").hide()



    $('#start-button').click(function() {

        $('.user-input').remove();
        $("#characterSelect").show()

        
    });

    // $('#pokemon').

        // $('#characterSelect').click(function(){

        //     // $('#characterSelect').remove();
        //     $('document').ready(function() {
        //         startGame();
            
        //     });
        // });




    ////////////////////////////    END    ///////////////////////////

    ///////////////       GAME OVER ALERT     //////////////////////

    // var loser = alert("YOU LOST, GAME OVER:(")

    


    ////////////////////////////    END    ///////////////////////////
});
