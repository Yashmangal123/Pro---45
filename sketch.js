var score

function preload()
{
	bgImg = loadImage("bg.jpeg");
	jonani = loadAnimation("jon1.png","jon2.png","jon3.png","jon4.png","jon5.png","jon6.png","jon7.png","jon8.png")
	jonliedown = loadImage("jonlie.png");
  jonjump = loadImage("jon2.png");
  coinani = loadAnimation("giphy.gif");
  stoneimg = loadImage("stones.png");
}

function setup() {
 createCanvas(1280,715);

backGround = createSprite(600,360,1200,722);
backGround.addImage(bgImg);
backGround.scale = 3.98;
backGround.velocityX = -5;

jon = createSprite(400,450);
jon.addAnimation("jonAni",jonani);
jon.scale = 0.5;

jon2 = createSprite(400,450);
jon2.addImage(jonjump);
jon2.visible = false;
jon2.scale = 0.5;
//jon2.debug = true;

inv = createSprite(550,530,1000,10);
inv.visible = false;

coinsGroup = createGroup();
stonesGroup = createGroup();
score = 0
  
}


function draw() {
//rectMode(CENTER);
  background("white");

  if(backGround.x < 510){
    backGround.x = backGround.x+ backGround.width/2;
  }

  
  if(keyDown("space")&&jon2.y >=360){
	  jon2.velocityY = -10;
	  jon2.visible = true;
	  jon.visible = false;
  }

  if(jon2.y >=380){
	jon.visible = true;
	jon2.visible = false;
  }

  jon2.velocityY = jon2.velocityY + 0.5;
  jon2.collide(inv);

  if(jon2.isTouching(coinsGroup)){
    coinsGroup.destroyEach();
    score = score+2;
  }

  if(jon.isTouching(stonesGroup)){
    stonesGroup.destroyEach();
    score = 0;
  }

  spawnCoins();
  spawnStones();
  
  drawSprites();
  fill("green");
  strokeWeight(2);
  stroke("red");
  textSize(20); 
  text("Coins: " + score,900,30);
 
}


function spawnCoins(){
  if(frameCount % 300 === 0){
    var coins = createSprite(1200,Math.round(random(170,250)));
    //coins.debug = true;
    //coins.setCollider("circle", 0, -10, 250);
    coins.scale = 0.2;
    coins.addAnimation("coin",coinani);
    coins.velocityX = - 3;
    coins.lifetime = 600;
    coinsGroup.add(coins);
  }
}

function spawnStones(){
  if(frameCount % 250 === 0){
    var stone = createSprite(1200,Math.round(random(400,450)));
    //stone.debug = true;
    //stone.setCollider("circle", 0, -10, 250);
    stone.scale = 0.5;
    stone.addImage(stoneimg);
    stone.velocityX = - 3;
    stone.lifetime = 600;
    stonesGroup.add(stone);
  }
}
