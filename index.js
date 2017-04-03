var w = 20;
var rows, cols;
var grid = [];
var current;
var stack = [];

function setup(){
  frameRate(5);
  createCanvas(400,400);
  rows = width/w;
  cols = height/w;
  for(var j = 0 ; j < rows ; j++) {
    for(var i = 0 ; i < cols ; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  current = grid[0];
}

function draw(){
  background(51);
  for(var i = 0 ; i < grid.length ; i++){
    grid[i].show();
  }
  current.visited = true;
  current.highlight();
  var next = current.checkNeighbors();
  if(next) {
    stack.push(current);
    removeWalls(current, next);
    current = next;
  }
  else if(stack.length > 0){
    current = stack.pop();
  }
}

function Cell(i, j) {
  this.col_pos = i;
  this.row_pos = j;
  this.walls = [true, true, true, true];
  this.visited = false;
}

Cell.prototype.show = function(){
  noFill();
  var x = this.col_pos * w;
  var y = this.row_pos * w;
  stroke(255);
  if(this.walls[0]){
    line(x     , y     , x + w , y     );
  }
  if(this.walls[1]){
    line(x + w , y     , x + w , y + w );
  }
  if(this.walls[2]){
    line(x + w , y + w , x     , y + w );
  }
  if(this.walls[3]){
    line(x     , y + w , x     , y     );
  }
  if(this.visited){
    noStroke();
    fill(255, 0, 255, 100);
    rect(x, y, w, w);
  }
}

Cell.prototype.highlight = function(){
  var x = this.col_pos * w;
  var y = this.row_pos * w;
  noStroke();
  fill(0, 255, 0);
  rect(x, y, w, w);
}

Cell.prototype.checkNeighbors = function(){
  var neighbor = [];

  var c = this.col_pos;
  var r = this.row_pos;
  var top    = grid[index(r-1   , c     )];
  var right  = grid[index(r     , c + 1 )];
  var bottom = grid[index(r + 1 , c     )];
  var left   = grid[index(r     , c - 1 )];

  if(top && !top.visited){
    neighbor.push(top);
  }
  if(right && !right.visited){
    neighbor.push(right);
  }
  if(bottom && !bottom.visited){
    neighbor.push(bottom);
  }
  if(left && !left.visited){
    neighbor.push(left);
  }

  if(neighbor.length > 0){
    var r = floor(random(0, neighbor.length));
    return neighbor[r];
  }
  else{
    return undefined;
  }
}

function index(r,c){
  if(r < 0 || r > rows || c < 0 || c > cols){
    return -1;
  }
  return r * cols + c;
}

function removeWalls(a, b){
  var row_diff = a.row_pos - b.row_pos;
  var col_diff = a.col_pos - b.col_pos;
  if(col_diff == 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  }else if(col_diff == -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  if(row_diff == 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  }else if(row_diff == -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}
