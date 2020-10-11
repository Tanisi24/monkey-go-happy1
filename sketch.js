var player, player_running;
var obstacle_img, obstaclesGroup;
var banana_img, foodGroup;
var jungle_img;
var ground;
var score = 0;

function preload() {
  backImage = loadImage("jungle.jpg");

  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImage = loadImage("banana.png");

  obstacleImage = loadImage("stone.png");
}


function setup() {
  createCanvas(600, 200);



  jungle_img = createSprite(300, 20, 100, 50);
  jungle_img.addImage("image", backImage);
  jungle_img.x = jungle_img.width / 2;
  jungle_img.velocityX = -4;
  jungle_img.scale = 1;
  jungle_img.visible = true;

  player = createSprite(120, 160, 20, 50);
  player.addAnimation("running", player_running);
  player.scale = 0.09;


  ground = createSprite(200, 190, 400, 10);
  ground.velocityX = -12;
  ground.x = ground.width / 2;
  ground.visible = false;


  foodGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {
  background(220);

  if (foodGroup.isTouching(player)) {
    score = score + 2;
    foodGroup.destroyEach();
  }

  if (jungle_img.x < 300) {
    jungle_img.x = jungle_img.width / 2;
  }

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  
  if(obstaclesGroup.isTouching(player)) {
    player.scale= 0.08;
    score = score  - 4;
    obstaclesGroup.destroyEach();
  }

  if (keyDown("space") && player.y >= 140) {
  player.velocityY = -12;
  }
  
   player.velocityY = player.velocityY + 0.6 ;
  
  switch (score) {
    case 10 : player.scale = 0.12;
      break;
    case 20 : player.scale = 0.14;
      break;
    case 30 : player.scale = 0.16;
      break;
    case 40 : player.scale = 0.18;
      break;
      default: break;
  }

  player.collide(ground);

  food();
  obstacles();
  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
}

function food() {
  if (frameCount % 80 === 0) {
    var banana_img = createSprite(600, 200, 10, 20);
    banana_img.addImage("object", bananaImage);
    banana_img.scale = 0.05;
    banana_img.velocityX = -3;
    banana_img.lifetime = 200;
    banana_img.y = Math.round(random(20, 100));
    foodGroup.add(banana_img);
  }
}

function obstacles() {
  if (frameCount % 250 === 0) {
    var obstacle_img = createSprite(600, 170, 10, 20);
    obstacle_img.addImage("obstacle", obstacleImage);
    obstacle_img.scale = 0.09;
    obstacle_img.velocityX = -4;
    obstacle_img.lifetime = 150;
    obstaclesGroup.add(obstacle_img);
  }
}