//Create variables here
var dog, dogIMG, happyDogIMG, database, foodS = 20, foodStock
var nameBox;
var feed, addFood;
var canvas;
var fedTime, lastfed, foodObj;

function preload(){
  //load images here
  dogIMG = loadImage("images/dogImg.png");
  happyDogIMG = loadImage("images/dogImg1.png");
}

function setup(){
    canvas = createCanvas(1000, 500);

    database = firebase.database();

    dog = createSprite(725,200,50,50);
    dog.addImage(dogIMG);
    dog.scale = 0.5;

    nameBox = createInput()
    nameBox.position(displayWidth/2 - 250 , displayHeight/2 + 20);
    nameBox.style('width', '160px');
    nameBox.style('height', '30px');  

    feed = createButton("Feed your dog ");
    addFood = createButton("Add food");
    feed.style('width', '150px');
    feed.position(displayWidth/2 - 400, 10)
    addFood.style('width', '150px');
    addFood.position(feed.width + feed.x, 10);

    foodStock = database.ref('food');
    foodStock.on("value",readStock);

    foodObj = new Food();
}


function draw(){ 
  background(46,139,87);

  feed.mousePressed(feedDog)
  addFood.mousePressed(addFoods)
  
    if(foodS<=0)
    {
      dog.addImage(dogIMG);
    }    
  
    textSize(20);
    fill("black");
    text("Bottles In Stock = " + foodS,460,30);
    text("Hello, I am your pet dog " + nameBox.value() + "",625,410);

    textSize(15)
    fill(0)
    text("Name of the dog -",382.5,465);

    console.log(foodS)

    foodObj.display(foodS)

    drawSprites();
}

function addFoods(){
  changeStock(foodS);
  dog.addImage(dogIMG)
}

function feedDog(){
  writeStock(foodS);
}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x)
{
  if(x!==0){
    x--
    dog.addImage(happyDogIMG);
}

  database.ref('/').update({
    food:x
  })
}

function changeStock(x){
  if(x>=20){
    x=20;
  }
  else{
    x=x+1
  }

  database.ref('/').update({
    food:x
  })
}

function twentyStock(x){
  x=20;

  database.ref('/').update({
    food:x
  })
}