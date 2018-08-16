// Enemies player must avoid
const Enemy = function(startY) {
    this.y = startY;
    this.toStart();

    this.sprite = 'images/enemy-bug.png';
};

// Function to update the enemy's position
Enemy.prototype.update = function(dt) {
    //move enemy across board
    if (this.x > 505){
      this.toStart();
    }
    else {
      this.x = this.x + this.speed*dt;
    };

    //if player and enemy collide
    if(Math.abs(this.x - player.x) < 70 && this.y === player.y){
      player.toStart();
    };
};

//Set the enemy to the starting position
Enemy.prototype.toStart = function(){
  this.x = -450 * Math.random() - 100;
  this.speed = 150 * Math.random() + 130;
};

//Enemy render function
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Star class
const Star = function(hx){
  this.x = hx;
  this.y = -35;;
  this.sprite = 'images/Star.png';
};
Star.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
const Player = function() {
  this.toStart();
  this.sprite = 'images/char-pink-girl.png';
};

// Set the player to the starting position
Player.prototype.toStart = function(){
  this.x = 202;
  this.y = 380;
  playerWon = false;
};

// Player update function
Player.prototype.update = function() {
};

// Player render function
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// player handleInput function
Player.prototype.handleInput = function(keyPressed,) {

  // Switch determining which direction to move
  if(playerWon){
    return;
  }
  else{
    switch(keyPressed) {
      case "left":
        if (this.x > 0){
          this.x = this.x - 101;
        };
        break;
      case "right":
        if (this.x < 404){
          this.x = this.x + 101;
        };
        break;
      case "up":
        if (this.y > -35) {
          this.y = this.y - 83;
        };
        break;
      case "down":
        if (this.y < 380) {
          this.y = this.y + 83;
        };
        break;
      };
  };

  // Player has won
  if(this.y === -35){
    playerWon = true;
    this.won();
  }
};

Player.prototype.won = function(){
  stars = [new Star(0), new Star(101), new Star(202), new Star(303), new Star(404)];
  allEnemies.forEach(function(enemy) {
    enemy.speed = 0;
  })
  setTimeout(function() {
    stars = [];
    player.toStart();
    allEnemies.forEach(function(enemy) {
      enemy.toStart();
    })
  },1000);
}
// Enemies with startY
const allEnemies = [new Enemy(48), new Enemy(131), new Enemy(214)];
const player = new Player();
var stars = [];
var playerWon = false;



// Listens for key presses and sends the keys to
// Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
