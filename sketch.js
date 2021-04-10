var  blocksImg, coinsImg, mariorunningImg,mariojumpingImg;
var mountainImg,platformImg,tubesImg,coinImg;
var frontImg, backImg;
var score=0;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
//"Background/.png"
//"Coins/.png"
mountainImg=loadAnimation("Background/mountains01.png","Background/mountains02.png","Background/mountains03.png","Background/mountains04.png");	

platformImg=loadImage("Background/platform.png");

coinImg=loadAnimation("Coins/coin01.png","Coins/coin02.png","Coins/coin03.png","Coins/coin04.png","Coins/coin05.png");

tubesImg=loadAnimation("Background/tubes01.png","Background/tubes02.png","Background/tubes03.png","Background/tubes04.png","Background/tubes05.png");

mariorunningImg=loadAnimation("Mario/mario01.png","Mario/mario02.png","Mario/mario03.png","Mario/mario04.png","Mario/mario05.png","Mario/mario06.png");

mariojumpingImg=loadAnimation("Mario/mario13.png","Mario/mario14.png","Mario/mario15.png","Mario/mario16.png","Mario/mario17.png","Mario/mario18.png");

frontImg=loadImage("Background/Noob2.jpg");

backImg=loadImage("Background/Noob.png");

}


function setup() {
	createCanvas(1280,600);


	engine = Engine.create();
	world = engine.world;
backgr=createSprite(640,0,1280,600);
backgr.addImage(backImg);
backgr.velocityX=-2;
	
mario=createSprite(100,430,50,50);
mario.addAnimation("running",mariorunningImg);
mario.scale=0.9;
ground=createSprite(640,500,1280,10);
ground.visible=false;
coinsGroup=new Group();
	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);
  if (backgr.x<350) {
	backgr.x=backgr.width/2;	
	}
	if (ground.x<350) {
		ground.x=ground.width/2;	
		}
	if (keyDown("space")) {
		mario.velocityY=-12;
		mario.changeAnimation("jumping",mariojumpingImg);
	}
	mario.velocityY=mario.velocityY+0.8;
mario.collide(ground);
spawnCoins();
if (coinsGroup.isTouching(mario)) {
	score=score+1;
	coinsGroup.destroyEach();
}
  drawSprites();
textSize(25);
fill("black");
  text("Score ",+score,1100,50);
}
function spawnCoins() {
	//write code here to spawn the coins
	if (frameCount % 90 === 0) {
	  var coin = createSprite(1200,240,30,30);
	  coin.y = Math.round(random(240,320));
	  coin.addAnimation("moving",coinImg);
	  coin.scale = 3.0;
	  coin.velocityX = -6;
	  
	   //assign lifetime to the variable
	  coin.lifetime = 220;
	  
	  //adjust the depth
	  coin.depth = mario.depth;
	  mario.depth = mario.depth + 1;
	  
	  //add each coin to the group
	  coinsGroup.add(coin);
	}
	
  }
  
  function spawnObstacles() {
	if(frameCount % 60 === 0) {
	  var obstacle = createSprite(600,165,10,40);
	  obstacle.velocityX = -4;
	  
	  //generate random obstacles
	  var rand = Math.round(random(1,6));
	  switch(rand) {
		case 1: obstacle.addImage(obstacle1);
				break;
		case 2: obstacle.addImage(obstacle2);
				break;
		case 3: obstacle.addImage(obstacle3);
				break;
		case 4: obstacle.addImage(obstacle4);
				break;
		case 5: obstacle.addImage(obstacle5);
				break;
		case 6: obstacle.addImage(obstacle6);
				break;
		default: break;
	  }
	  //assign scale and lifetime to the obstacle           
	  obstacle.scale = 0.5;
	  obstacle.lifetime = 300;
	  //add each obstacle to the group
	  obstaclesGroup.add(obstacle);
	}
  }



