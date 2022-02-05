var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombieImg,zombie;
var zombieGroup;
var heart1,heart2,heart3;
var gameState="fight";
var bullets=70;
var bullet;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
heart1Img=loadImage("assets/heart_1.png")
heart2Img=loadImage("assets/heart_2.png")
heart3Img=loadImage("assets/heart_3.png")
  bgImg = loadImage("assets/bg.jpeg")
  zombieImg = loadImage("assets/zombie.png")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  heart1=createSprite(displayWidth-150,40,20,20);
  heart1.visible=false;
  heart1.addImage("heart1",heart1Img);
heart1.scale=0.4;
heart2=createSprite(displayWidth-100,40,20,20);
heart2.visible=false;
heart2.addImage("heart2",heart2Img);
heart2.scale=0.4;

heart3=createSprite(displayWidth-150,40,20,20);

heart3.addImage("heart3",heart3Img);
heart3.scale=0.4;
//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("circle",0,0,100)
zombieGroup=new Group()
bulletGroup=new Group();
}

function draw() {
  background(0); 
if(gameState=="fight"){

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 bullet=createSprite(displayWidth-1150,player.y-30,20,10);
 bullet.velocityX=20;
 bulletGroup.add(bullet)
  player.addImage(shooter_shooting)
 bullets=bullets-1;
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if(bullets==0){
  gameState="bullet"
}

if(zombieGroup.isTouching(player)){
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy();
    }
  
  }
}

enemy();
drawSprites();
if(gameState=="bullet"){
text("you ran out of bullets",470,410);
zombieGroup.destroyEach();
bulletGroup.destroyEach();
player.destroy()
  }
  else if(gameState=="lost"){
    text("you lost",400,400);
    zombieGroup.destroyEach();
    player.destroy()
  }
else if(gameState=="won"){
  text("you won",400,400);
  zombieGroup.destroyEach();
  player.destroy()
}
 }
}
function enemy(){
  if(frameCount%150==0){
    zombie=createSprite(random(100,1000),random(300,600),40,40)
    zombie.addImage(zombieImg);
    zombie.scale=0.15;
    zombie.velocityX=-3;
    zombie.debug=true;
    zombie.setCollider("rectangle",0,0,400,400)
zombie.lifetime=200;
zombieGroup.add(zombie)
  }
}