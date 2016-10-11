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
    //Reset the player position, if player position colides with bug position
    if(player.x < this.x+80 && player.x > this.x-50 && player.y > this.y && player.y-5 < this.y+80){
    	wins = 0;
    	winsAmount();
        player.reset();
    }
    //reset position of the bug if it will end its route
    if (this.x >= 505){
        this.x = -101;
        var yPositions = [62, 145, 228, 310];
        //Randomly select one of four possible yPositions 
        this.y = yPositions[(Math.floor(Math.random()*4))]; 
    };
};


//Crystal player can collect
//Prameter x - horizontal, y - vertical
var Crystal = function(x, y){
	this.x = x;
	this.y = y;
	this.sprite = 'images/Gem-Orange.png';
};

//Draw the crystal on the map
Crystal.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Reset crystal position
Crystal.prototype.reset = function(){
	this.x = crystalX[(Math.floor(Math.random()*5))];
	this.y = crystalY[(Math.floor(Math.random()*3))];
};

Crystal.prototype.update = function(){
	if(player.x < this.x+75 && player.x > this.x-25 && player.y < this.y + 20 && player.y > this.y-85){
		this.reset();
	}
};

//wins amount variable 
var wins = 0; 

//displays wins amount
function winsAmount(){
	ctx.fillStyle = "white";
	ctx.fillRect(70,20,150,100);
	ctx.font = "20px Georgia";
    ctx.strokeText(wins,70,49);
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

//Update player position if he will reach final destination
//and increasing his wins amount by 1
Player.prototype.update = function(){
    if (this.y <= 0) {
    	wins += 1;
    	winsAmount();
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

//
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(62, 150), new Enemy(62, 75), new Enemy(145, 200), new Enemy(228, 100), new Enemy(310, 55)];
var player = new Player();

//Crystal Y and X coords
var crystalY = [120, 200, 280];
var crystalX = [25, 125, 225, 325, 425];

//Randomly choose position for new crystal
var crystal = new Crystal(crystalX[(Math.floor(Math.random()*5))], crystalY[(Math.floor(Math.random()*3))]);

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

