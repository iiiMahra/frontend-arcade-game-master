const levelCounter = document.querySelector('.level');
let level = 0;
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

//--------------------------------------------Check Collision---------------------------------------------
Enemy.prototype.checkCollision = function() {

     if (player.x < this.x + 80  &&
         player.x + 80  > this.x &&
         player.y < this.y + 60  &&
         player.y + 60 > this.y){

         player.x = 200;
         player.y = 400;
// Calling the level Decrement function that will decrease the level when the collision occur
         this.levelDecrement();
    }
};
//--------------------------------------------decrement level---------------------------------------------

// when the player collides with enemy:
Enemy.prototype.levelDecrement = function() {

    level--;
    if (level <= 0){
        level = 0;
// Decrease the lives    
        allLives.pop(); 
// Game over: when the player lose all the lives
        if (allLives.length === 0){
            swal(
            {// the alert from https://sweetalert2.github.io/
              type: 'error',
              title: 'Oops!!...',
              text: 'Game over',
            });
// when the user click the play again button in the alert
            allLives.push(life,life2,life3);
            this.x = -150;
        }   
 }
// adding the level into the screen
 levelCounter.innerHTML = 'Level: '+level; 


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

//--------------------------------------------increment level---------------------------------------------

// when the player collides with enemy:
Player.prototype.levelIncrement = function() {

    level++;
// adding the number moves into the screen
    levelCounter.innerHTML = 'Level:'+level;
};


//--------------------------------------------Lives Class---------------------------------------------

var Lives = function(x, y) {

    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 55;
    this.sprite = 'images/Heart.png';
};

Lives.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
};

//--------------------------------------------Creating objects---------------------------------------------
//Enemies objects:
var allEnemies = [];
var enemy = new Enemy(0, 55, 100)
var enemy2 = new Enemy(0, 144, 150)
var enemy3 = new Enemy(0, 233, 200)
allEnemies.push(enemy,enemy2,enemy3);
//player object:
var player = new Player(200, 400)
//Lives obkects:
let allLives = [];
var life = new Lives(40, 0);
var life2 = new Lives(80, 0);
var life3 = new Lives(120, 0);
allLives.push(life,life2,life3);
//----------------------------------------------------------------------------------------------------------
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
