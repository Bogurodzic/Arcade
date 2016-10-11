// Enemies our player must avoid
//Parameter y - height of enemy's coordinate
//Speed - speed of the enemy
var Enemy = function(y, speed) {
    this.x = -101;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + (this.speed * dt);
    //
    if(player.x < this.x+80 && player.x > this.x-50 && player.y > this.y && player.y-5 < this.y+80){
        player.reset();
    }
    if (this.x >= 505){
        this.x = -101;
        var yPositions = [62, 145, 228, 310];
        //Randomly select one of four possible yPositions 
        this.y = yPositions[(Math.floor(Math.random()*4))]; 
    };
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player class
var Player = function() {
    this.reset();
    this.sprite = 'images/char-princess-girl.png';
};

//Reset player position
Player.prototype.reset = function(){
    this.x = 202;
    this.y = 410;
};

//Update player position
Player.prototype.update = function(){
    if (this.y <= 0) {
        this.reset();
    }
};

//Draw the player on the map
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//Parameter: key (up, down, left, right)
//Enable to move player
Player.prototype.handleInput = function(key){
    if (key == "up"){
        this.y -= 82;
    } else if (key == "down" && this.y < 404){
        this.y += 82;
    } else if (key == "right" && this.x <= 400){
        this.x += 100;
    } else if (key == "left" && this.x >= 100){
        this.x -= 100;
    }
};

// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(62, 150), new Enemy(62, 75), new Enemy(145, 200), new Enemy(228, 100), new Enemy(310, 55)];
var player = new Player();

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

