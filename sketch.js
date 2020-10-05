var playerRunning;
var bananaImage, bananaGroup;
var obstacleImage, obstacleGroup;
var backgroundSprite, backgroundImage;
var score;
var invisibleGround;
var uphillImage, uphillGroup;

var hearts, heartImage, heart1, heart2;

var gameOver, restart;
var gameOverImage, restartImage;

var play, end, gameState;


function preload() {
  backgroundImage = loadImage("jungle.jpg");
  
  playerRunning = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("stone.png");
  
  uphillImage = loadImage("uphill.png");
  
  heartImage = loadImage("heart.webp");
  
  gameOverImage = loadImage("gameOver.png");
  
  restartImage = loadImage("restart.png");

}

function setup() {
  createCanvas(600, 400);
  
  backgroundSprite = createSprite(200,175,200,200);
  backgroundSprite.addImage("backgroundImg", backgroundImage);
  backgroundSprite.velocityX = -6;
  
  player = createSprite(75,315,20,20);
  player.addAnimation("playerRunning", playerRunning);
  player.scale = 0.12;
  
  invisibleGround = createSprite(300,365,600,10);
  invisibleGround.visible = false;
  
  heart1 = createSprite(50,50,10,10);
  heart1.addImage("heart", heartImage);
  heart1.scale = 0.2;
  
  heart2 = createSprite(90,50,10,10);
  heart2.addImage("heart", heartImage);
  heart2.scale = 0.2;
  
  gameOver = createSprite(300,170,25,25);
  gameOver.addImage("gameOver", gameOverImage);
  
  restart = createSprite(300,350,10,10);
  restart.addImage("restart", restartImage);
  restart.scale = 0.35;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  uphillGroup = new Group();
  
  score = 0;
  
  hearts = 2;
  
  play = 1;
  end = 0;
  gameState = play;
}

function draw() {
  background(255);
  
  edges = createEdgeSprites();
  
  player.collide(invisibleGround);
  
  player.collide(edges[1]);
  
  if(gameState == play) {
    
    spawnBananas();
    
    spawnObstacles();
    
    spawnUphills();
    
    monkeyLife();
    
    gameOver.visible = false;
    restart.visible = false;
    
    player.collide(uphillGroup);
    
    if(backgroundSprite.x < 200) {
      backgroundSprite.x = backgroundSprite.width/2;
    }
  
    if((keyDown("space"))&&(player.y>314)) {
      player.velocityY = -16;
    }
    
    if((keyDown("space"))&&(player.y>180)) {
      player.velocityY = -16;
    }
    
    if(bananaGroup.isTouching(player)) {
      bananaGroup.destroyEach();
      score += 2;
    }
    
    if(hearts == 0) {
      gameState = end;
    }
  
    player.velocityY = player.velocityY + 0.8;
  }
  
  else if(gameState == end) {
    player.visible = false;
    gameOver.visible = true;
    restart.visible = true;
    
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    uphillGroup.destroyEach();
    
    backgroundSprite.velocityX = 0;
    
    if(mousePressedOver(restart)){
      reset();
    }
  }
  
  drawSprites();
  
  textSize(20);
  fill("white");
  text("Score: " + score, 450, 50);
}

function spawnBananas() {
  if(frameCount % 130 == 0) {
    var banana = createSprite(600, 350, 10, 10);
    banana.addImage("banana", bananaImage); 
    banana.y = Math.round(200,300);
    banana.scale = 0.05;
    
    banana.velocityX = -6;
    
    banana.lifetime = 125;
    
    //add each banana to the bananaGroup
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 120 == 0) {
    var obstacle = createSprite(600, 325, 20, 20);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.25;
    
    obstacle.velocityX = -6;
    
    obstacle.lifetime = 125;
    
    obstacle.setCollider("rectangle",0,0,350,350);
    
    //add each banana to the bananaGroup
    obstacleGroup.add(obstacle);
  }
}

function spawnUphills() {
  if(frameCount % 200 == 0) {
    var uphill = createSprite(600,235,20,20);
    uphill.scale = 2;
    
    uphill.addImage("uphill", uphillImage);
    uphill.velocityX = -6;
    
    uphill.lifetime = 125;
    
    uphill.setCollider("rectangle", 0,0,80,15);
    
    uphillGroup.add(uphill);
  }
}

function monkeyLife() {
  if(obstacleGroup.isTouching(player)) {
    hearts -= 1;
    obstacleGroup.destroyEach();
  }
  
  if(hearts == 2) {
    heart1.visible = true;
    heart2.visible = true;
  }
  
  if(hearts == 1) {
    heart2.visible = false;
    player.scale = 0.075;
  }
  
  if(hearts == 0) {
    heart1.visible = false;
  }
  
  switch(score){
    case 10: player.scale = 0.14;
      break;
    case 20: player.scale = 0.16;
      break;
    case 30: player.scale = 0.18;
      break;
    case 40: player.scale = 0.20;
      break;
    default: break;
      
  }
}

function reset() {
  gameState = play;
  
  player.visible = true;
  gameOver.visible = false;
  restart.visible = false;
  
  player.scale = 0.125;
  
  backgroundSprite.velocityX = -6;
  
  score = 0;
  hearts = 2;
  
}