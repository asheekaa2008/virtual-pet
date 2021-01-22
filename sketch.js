//Create variables here

function preload()
{
	//load images here
}

function setup() {
  createCanvas(800, 700);
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('Feedtime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  feed=createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFood);

  //read game state from database
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });

  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
  }
  
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foods);
    dog.addImage(dogHappy);
  }
fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text ("Last Feed : "+ lastFed%12+"PM",350,30);
}else if(lastFed==0){
  text("Last Feed : 12AM",350,30);
}else{
  text("Last Feed:"+ lastFed+"AM",350,30);
}
  drawSprites();
  //add styles here

}
//Function to read values from DB
function readStock(data){
  foods=data.val();
}

//Function to write values in DB
function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}
//function to uodate food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  food.updateFoodStock(food.getFoodStock()-1);
  database.ref('/')(update)({
    Food:food.getFoodStock(),
   FeedTime:hour()

  })
  
}
//function to add food stock
function addFoods(){
  foods++;
  database.ref('/').update({
    food:foods
  })
}
//Function to update gameState in database
function update(state){
  database.ref('/').update({
    gameState:state
  });
}

