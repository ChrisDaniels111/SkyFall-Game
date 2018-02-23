# Project 1: Skyfall #
### February 20 - 23, 2018 ###
## Members ##
* Amber Schatz 
* Chris Daniels
* Patrick Truong


## Project Goal
### Create One Frame Side-Scroller Game ###
![Gameplay](/images/gameplay.png)

## Development Roadmap ##



Visual Interface | Game Interface
---------------- | ----------------
Username Input Ability | Falling Sprites for healing, damage, and points
Selectable Pokemon for Game Sprite (via API) | Canvas Styling
High Score Update on Page | Player Sprite with proper mechanics
CSS Design | Special Ability Sprites


## Game Design ##

### graphic.js ###
---
### Main Gameplay Loop and Sprite Management ###

```javascript
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
            ctx.fillText(this.text, this.x, this.y);                      
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
```
Component class is the template for all sprites. It was originally built to just create blocks; hence parameter for color. 

#### Functionality ###
* Draw sprite on canvas object
* Redraw sprite in different position with each update call


<br>
<br>
<br>



## Data Management ##
---

### Image File Management (graphicHelper.js, objects.js) ###
```javascript
var specialMoveDict = {
    grass: './images/grass2.png',
    fire: './images/fire-special2.png',
    water: './images/water2.png',
    ghost: './images/boo.png',
    electric: './images/bolt.png',
    rock: './images/rock.png',
    default: './images/angel2.png'
}

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

```
<br>

### Falling Sprites Management ###

```javascript
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
```
:smile: