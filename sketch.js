
var cols, rows;
var w = 20;
var grid = [];

var current;
var dif=500;
var stack = [];
var gamestate=1;
var dif1,dif2,dif3,dif4;

function setup() {
  createCanvas(dif,dif);
  cols = floor(width / w);
  rows = floor(height / w);
  //frameRate(5);
  dif1=createSprite(250,100,100,50);
  dif2=createSprite(250,200,100,50);
  dif3=createSprite(250,300,100,50);
  dif4=createSprite(250,400,100,50);

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];


}

function draw() {
  

  if(gamestate===1){
   background(45);

   if(mousePressedOver(dif1)){
     dif=200;
     gamestate=2;
   }

   if(mousePressedOver(dif2)){
    dif=300;
    gamestate=2;
  }

  if(mousePressedOver(dif3)){
    dif=400;
    gamestate=2;
  }

  if(mousePressedOver(dif4)){
    dif=500;
    gamestate=2;
  }

   drawSprites();

  }
  if(gamestate===2){

    background(51);

    for (var i = 0; i < grid.length; i++) {
      grid[i].show();
    }
  
    current.visited = true;
    current.highlight();
    // STEP 1
    var next = current.checkNeighbors();
    if (next) {
      next.visited = true;
  
      // STEP 2
      stack.push(current);
  
      // STEP 3
      removeWalls(current, next);
  
      // STEP 4
      current = next;
    } else if (stack.length > 0) {
      current = stack.pop();
    }
  
  }
  
  function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
      return -1;
    }
    return i + j * cols;
  }
  
  
  function removeWalls(a, b) {
    var x = a.i - b.i;
    if (x === 1) {
      a.walls[3] = false;
      b.walls[1] = false;
    } else if (x === -1) {
      a.walls[1] = false;
      b.walls[3] = false;
    }
    var y = a.j - b.j;
    if (y === 1) {
      a.walls[0] = false;
      b.walls[2] = false;
    } else if (y === -1) {
      a.walls[2] = false;
      b.walls[0] = false;
    }
  }
  
}