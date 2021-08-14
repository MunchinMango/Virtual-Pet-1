//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImg, doghappyImg;
function preload()
{
	//load images here
  dogImg = loadImage("dogImg.png");
  doghappyImg = loadImage("dogImg1.png");
}

function setup() {
	database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  foodStock.set(20);
}


function draw() {  
  background("green")

  if(foodS !== 0){
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(doghappyImg);
    

   
  }

  if(keyWentUp(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg);
    
  }
}

if(foodS == 0){
  
  dog.addImage(dogImg);
  foodS = 20;

}
  drawSprites();
  //add styles here
  textSize(17);
  fill("black");
  text("Hello! I am your puppy! I am hungry",120,150);
  fill("black");
  text("Press up arrow key to feed your pet",125,50);
  fill("black");
  text("Milk Bottles Remaining  "+foodS,150,440);

}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}


