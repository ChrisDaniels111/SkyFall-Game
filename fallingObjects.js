// *********************************************************
// *********************************************************
// *********************************************************
// ****************** Chris' Section ***********************
// *********************************************************
// ******************* Falling Objects Class ***************
// *********************************************************



// 1. Build a FallingObject class with attributes: {type, damage, points, etc}
// function fallingObjects(number) {
//     fallingObjects[0] = {
//         type:'Sun',
//         healthPoints:-3,
//     }
//     fallingObjects[1] = {
//         type:'Cloud',
//         healthPoints:-1,
//     }
//     fallingObjects[2] = {
//         type:'Health Ball',
//         healthPoints:2,
//     }
//     fallingObjects[3] = 

// };
console.log('falling objects is loading')
$(document).ready(function () {
    console.log('this loading');

    var fallingObjectsArray = [];


    class FallingObject {
        constructor(type, points) {
            this.type = type;
            this.points = points;
        }
    }

    var cloud = new FallingObject('Cloud', -1);

    var sun = new FallingObject('Sun', -3);

    var healthBall = new FallingObject('Health Ball', 2);

    var dollar1 = new FallingObject('One', 1);

    var dollar5 = new Fallingobject('Five', 5);

    var dollar10 = new FallingObject('Ten', 10);

    var dollar20 = new FallingObject('Twenty', 20);


    fallingObjectsArray.push(cloud);
    fallingObjectsArray.push(sun);

    function pushObjects(object) {
        for (var i = 0; i < fallingObjectsArray.length; i++) {
            fallingObjectsArray.push(i)
        }
    };


    console.log(cloud.type)

    // 2. Build functions that allow you to make a lot of FallingObjects easy



    // ex. function makeFallingObjects(number) --> returns array of n-amount of FallingObjects
});
