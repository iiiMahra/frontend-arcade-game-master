//--------------------------------------------Enemy Class---------------------------------------------

var Enemy = function(x, y, speed) {
     this.x = x;
     this.y = y;
     this.speed = speed;
     this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
 this.x += this.speed * dt;

// Reset the position of the enemies when they reach the end of the canvas
if (this.x > 505 /* the canvas width*/) {
     this.x = -150;
// Change the enemies speed randomly
     this.speed = 150 + Math.floor(Math.random() * 222);
 }
 this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
 ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//--------------------------------------------Player Class---------------------------------------------

var Player = function (x, y){
     this.x = x;
     this.y = y;
     this.sprite = 'images/char-cat-girl.png';
};

// Update the Player's position
Player.prototype.update = function() {

//when the player reachs the edges of the canvas 
    if (player.x > 400){
             player.x = 400;
     } 
    if (player.x < 0 ){
             player.x = 0;
     } 
    if (player.y > 400){
             player.y = 400;
     }
// when the player reach the water [win]   
    if (player.y < 0){
             player.x = 200;
             player.y = 400;
// calling levelIncrement that will increase the level
             this.levelIncrement();
     }
};

// Draw the Player on the screen 
Player.prototype.render = function() {
 ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// handleInput() method.
Player.prototype.handleInput = function(arrowKeys){


    if (arrowKeys == 'up'){
        this.y -= 90;
    }
    if (arrowKeys == 'down'){
         this.y += 90;
    }
    if (arrowKeys == 'right'){
        this.x += 101;
    }
    if (arrowKeys == 'left'){
        this.x -= 101;
    }

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
