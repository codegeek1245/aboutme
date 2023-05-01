let gap = 10;
let cirNum = 40;
let cirSize = 20;
let angle = 0;
let ptNum = 100;
let rectSize = 600;
var album = 0;
let bandN = [];
let bandA = [];
let colorB = [];
let colorR = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(degrees);
}
function draw() {
  background("black");

  
 
  noCursor();
  noStroke();
  fill("blue");
  circle(mouseX, mouseY, 5);

  colorR = ["green","blue", "white", "yellow"];
  push();
  translate(width / 2, height / 2);
  rotate(angle);
  angle = angle + map(mouseX, 0, width, -0.1, 0.1);
  noFill();
  stroke(colorR[album]);
  strokeWeight(1);

  for (let i = 0; i < cirNum; i++) {
    arc(0, 0, cirSize + gap * i, cirSize + gap * i, angle * i, 360 - angle / 3);
  }
  pop();

  //tile subtitle
  bandN = ["U.F.O", "Weekends", "MoonGazer", "Sailor Moon"];
  bandA = ["Demo track", "Wonder Days", "To The Moon", "Fight Evil"];
  push();
  fill('white');
  translate(width / 2, height - 20);
  textFont("Arial");
  textSize(15);
  textAlign(CENTER, CENTER);
  text(bandN[album], 0, 0);
  textSize(10);
  text(bandA[album], 0, 10);
  pop();

  //border album
  colorB = ["gold", "silver", "purple", "blue"];
  push();
  translate(width/2, height/2);
  noFill();
  stroke(colorB[album]);
  strokeWeight(2);
  rectMode(CENTER);
  rect(0, 0, rectSize, rectSize);

  //Random noise

  stroke("yellow");
  strokeWeight(1);
  for (let i = 0; i < ptNum; i++) {
    point(
      random(-rectSize / 2, rectSize / 2),
      random(-rectSize / 2, rectSize / 2)
    );
  }
  pop();
}

function mousePressed(){
  album += 1;
  if(album >= bandN.length){
    album = 0;
  }
}
