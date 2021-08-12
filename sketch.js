var bg,bgImg;
var player, shooterImg, shooter_shooting;
var Zombozo, ZombozoImg, ZombozoGroup
var Heart1, Heart2, Heart3, Heart1Img,Heart2Img,Heart3Img
var bulletCount=70, bulletGroup, bullets
var gameState="Fight"
var Win,Lose
var life=3
var score=0
function preload(){
bgImg=loadImage("bg.jpeg")
shooterImg=loadImage("shooter_2.png")
shooter_shooting=loadImage("shooter_3.png")
ZombozoImg=loadImage("zombie.png")
Heart1Img=loadImage("heart_1.png")
Heart2Img=loadImage("heart_2.png")
Heart3Img=loadImage("heart_3.png")
}

function setup(){
createCanvas(windowWidth,windowHeight)
bg=createSprite(displayWidth/2-350,displayHeight/2-100)
bg.addImage(bgImg)
player=createSprite(displayWidth-1600,displayHeight-300,50,50)
player.addImage(shooterImg)
player.scale=0.5
player.debug=true
player.setCollider("rectangle",0,0,300,300)
ZombozoGroup=new Group();
bulletGroup=new Group();
Heart1=createSprite(1150,800,100,100)
Heart1.addImage(Heart1Img)
Heart1.scale=0.5
Heart2=createSprite(1100,800,100,100)
Heart2.addImage(Heart2Img)
Heart2.scale=0.5
Heart3=createSprite(1050,800,100,100)
Heart3.addImage(Heart3Img)
Heart3.scale=0.5
}

function draw(){
  background("YELLOW")
  if (gameState==="Fight"){
    if(life===3){
      Heart3.visible=true
      Heart2.visible=false
      Heart1.visible=false
    }
    if(life===2){
      Heart3.visible=false
      Heart2.visible=true
      Heart1.visible=false
    }
    if(life===1){
      Heart3.visible=false
      Heart2.visible=false
      Heart1.visible=true
    }
    if(life===0){
      Heart3.visible=false
      Heart2.visible=false
      Heart1.visible=false
      gameState="Lose"
    }
    if(score===100){
      gameState="Won"
    }
    if(keyDown(UP_ARROW)){
      player.y=player.y-15
    }
    if(keyDown(DOWN_ARROW)){
      player.y=player.y+15
    }
    if(keyWentDown("SPACE")){
      bullets= createSprite(displayWidth-1600,player.y-40,20,10)
      bullets.velocityX=5
      bulletGroup.add(bullets);
      player.depth=bullets.depth
      player.depth=player.depth+2
      player.addImage(shooter_shooting)
      bulletCount=bulletCount-1
    }
    if(keyWentUp("SPACE")){
      player.addImage(shooterImg)
    }
    if(bulletCount===0){
      gameState="bullet"
    }
    //Destroy zombie when bullet hits
    if(ZombozoGroup.isTouching(bulletGroup)){
      for(var i=0;i<ZombozoGroup.length;i++){
        if(ZombozoGroup[i].isTouching(bulletGroup)){
          ZombozoGroup[i].destroy();
          bulletGroup.destroyEach();
          score=score+5
        }
    }
  }
  //destroy Zombie when player touches them
  if(ZombozoGroup.isTouching(player)){
    for(var i=0;i<ZombozoGroup.length;i++){
      if(ZombozoGroup[i].isTouching(player)){
        ZombozoGroup[i].destroy();
        life=life-1
      }
  }
}
  Zombozos();
}
drawSprites();
textSize(25)
fill("White")
text("Booletz: "+ bulletCount,1050,100)
text("Score: "+ score,1050,150)
text("Lives: "+life,1050,125)
if(gameState==="Lose"){
    textSize(100)
    fill("White")
    text("haha you lost, git gud",300,400)
    ZombozoGroup.destroyEach();
    player.destroy();
  }
  else if(gameState==="Won"){
    textSize(90)
    fill("purple")
    text("Noice you get to sleep tonight",10,400)
    ZombozoGroup.destroyEach();
    player.destroy();
  }
  else if(gameState==="bullet"){
    textSize(100)
    fill("red")
    text("Your out of bullets!",400,400)
    ZombozoGroup.destroyEach();
    player.destroy();
    bulletGroup.destroyEach();
  }
  }
  
    function Zombozos(){
      if(frameCount%50===0){
      Zombozo=createSprite(random(500,1100),random(100,500),50,50)
      Zombozo.addImage(ZombozoImg)
      Zombozo.scale=0.25
      Zombozo.velocityX=-5
      Zombozo.lifetime=200
      ZombozoGroup.add(Zombozo)
      Zombozo.debug=true
      Zombozo.setCollider("rectangle",0,0,500,1000)
    }}