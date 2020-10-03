var trex,trexImg,PLAY,END,gameState,invisibleGround,ground,groundImg;
var cloudImg,cloudGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var obstacleGroup,score;
function preload(){
  trexImg=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImg=loadImage("ground2.png");  
  cloudImg=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")

}





function setup() {
  createCanvas(1000, 300);
  trex=createSprite(40,280,20,20);
  trex.addAnimation("trexA",trexImg)
  trex.scale=0.4;
  
  ground=createSprite(500,280,1000,5)
  ground.addImage(groundImg)
  ground.x=ground.width/2
  
  cloudGroup= new Group();
  obstacleGroup=new Group();
  
  invisibleGround=createSprite(500,295,1000,5)
  invisibleGround.visible=false;
  PLAY=0;
  END=1;
  score=0;
  gameState=PLAY;
}

function draw() {
  background(190);
  drawSprites()
  if(gameState===PLAY){
    ground.velocityX=-4;
      spawnCloud();
    spawnObstacle();
    score=score+Math.round(getFrameRate()/60);
    textSize(18)
    text("score"+score,100,100)

  if(keyDown("space")&&trex.y>250){
   trex.velocityY=-10; 
  }
    if(ground.x<0){
      ground.x=ground.width/2
    }
  trex.velocityY=trex.velocityY+0.8;
  trex.collide(invisibleGround)
    if(obstacleGroup.isTouching(trex)){
      gameState=END;
    }
  
  }else if(gameState===END){
    trex.velocityY=0;
    
    
    
  }
  
}

function spawnCloud(){
  if(frameCount % 60===0){
   var  cloud=createSprite(1000,10,30,30);
    cloud.y=Math.round(random(180,220))
    cloud.addImage(cloudImg)
    cloud.velocityX=-5
    cloud.scale=0.6
   cloud.lifetime=333;
  cloud.depth=trex.depth;         
  trex.depth=trex.depth+1
    //console.log("1")
 cloudGroup.add(cloud);
  }
}

function spawnObstacle(){
    if(frameCount %60===0){
      var obstacle = createSprite(1000,275,10,10);
      obstacle.scale=0.4
      obstacle.velocityX=-6
      var obs= Math.round (random(1,6));
     // obstacle.setAnimation("obstacle"+obs)
      switch(obs){
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
          
          default:  obstacle.addImage(obstacle1);
          
      }
      
      obstacle.debug=true
      obstacle.lifetime=333;
      
      
      
      obstacleGroup.add(obstacle);
      obstacleGroup.setColliderEach("rectangle",10,10,100,20)
      
    }
  
}
  
