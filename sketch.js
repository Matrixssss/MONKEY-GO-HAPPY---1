var monkey , monkey_running, monkeyCollide;
var ground, invisiGround, groundImg;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var bananaScore = 0;

function preload(){
  groundImg = loadImage ("jungle.jpg");
  monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  monkeyCollide = loadAnimation("monkey_1.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup(){
 createCanvas(600,300);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  ground = createSprite(0,0,600,300);
  ground.addImage ("ground",groundImg)
  
  monkey = createSprite(80,230,10,10);
  monkey.scale = 0.08;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);
  
 
  invisiGround = createSprite(300,278,600,7);
  invisiGround.visible = false;
  
}

function draw(){
  background(240);
  
      if(ground.x<100){
    ground.x = ground.width/2;
  }

    obstacles();
    bananas();
    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -4;
  
    if(keyDown("space")&&monkey.y >= 235) {
      monkey.velocityY = -13; 
    
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      bananaScore = bananaScore+2
    }
   
  
 
  drawSprites(); 
  
  monkey.collide(invisiGround);

    
   fill("white");
  text("BANANAS COLLECTED: "+bananaScore, 20, 20);
  
   if(obstacleGroup.isTouching(monkey)){ 
        monkey.scale = 0.08;
   }
 
}

function bananas(){
  if (frameCount%80 === 0){ 
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-4;          
    banana.lifetime = 220;
    bananaGroup.add(banana);
    
  }
}

function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(620,253,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -4;
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
  }
}