//Create variables here
var dog, dogHappy, database, foodS, foodStock

function preload()
{
  //load images here
  dog = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,250,50,50);
  dog.addImage(dog);
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
  }

  function readStock(data){
    foodS = data.val();
  }

  function writeStock(x){
    database.ref('/').update({
      Food:x
    })
  }

  textSize(10);
  fill("white");
  text("Food In Stock = " + foodStock,100,10);
  text("Note : Press Up Arrow Key To Feed Drago Milk.",100,10);
  drawSprites();
  //add styles here

}



