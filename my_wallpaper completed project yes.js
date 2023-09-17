//your parameter variables go here!
let gridX = 10;
let gridY = 100;

let lineThickness =2;

let circleDia = 5;
let circleSizePara = 25;

let numSegments = 100; // Number of segments in the curvy line

let l = 1; 
let u = 5; 

let r1 = 255; 
let g1 = 255;
let b1 = 255; 

let r2 = 150; 
let g2 = 180; 
let b2 = 210

//not to be changed

let curveControlPoints = []; // Array to store control points
let curveEndY = (Math.random() * (30.00 - 10.00) + 10.00); // Y-coordinate where the curvy line ends
let startPoint, endPoint; // Variables for specific starting and ending points

function setup_wallpaper(pWallpaper) {
  //pWallpaper.output_mode(DEVELOP_GLYPH);

  bgColor1 = color(r1, g1, b1); 
  bgColor2 = color(r2, g2, b2);

  pWallpaper.output_mode(GRID_WALLPAPER);
  pWallpaper.resolution(FIT_TO_SCREEN);
  pWallpaper.show_guide(false); //set this to false when you're ready to print

  //Grid settings
  pWallpaper.grid_settings.cell_width  = gridX;
  pWallpaper.grid_settings.cell_height = gridY;
  pWallpaper.grid_settings.row_offset  = 15;

  startPoint = createVector(0, curveEndY); // Modify the values as needed
  endPoint = createVector(50,curveEndY); // Modify the values as needed
}

function wallpaper_background() {
  if (bgColor1 && bgColor2) {
    gradientBackground(bgColor1, bgColor2);
  }
}

function gradientBackground(c1, c2) { 
  for (let i = 0; i <= height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, i, width, i);
  }
}

function drawCircle(){
  let circleColour = color(random(0,10), random(0,15), random(0,5));
  let cirx = (Math.random() * (50.00 - 10.00) + 10.00);
  let cirY = (Math.random() * (30.00 - 10.00) + 10.00);
  stroke(circleColour);
  circleDia = (Math.random() * circleSizePara)
  circle(cirx, cirY, circleDia);
}


function drawline1(){
  let straightlinecolour = color(random(0, 5), random(0,3), random(0,5));
  let randomThickness = random(l, u);
  stroke(straightlinecolour);
  strokeWeight(randomThickness); // Set the line thickness
  line(0, 75, gridX, 75);
  
}

function drawline2(){
  let straightlinecolour = color(random(0, 5), random(0,3), random(0,5));
  let randomThickness = random(l2, u2);
  stroke(straightlinecolour);
  strokeWeight(randomThickness); 
  line(0, 75, gridX, 75);

}


function my_symbol() {
  drawCurvyLine();
  drawCircle();
  drawline1();
}

function drawCurvyLine() {
  // Set the control points for the Bezier curve
  curveControlPoints = [];
  curveControlPoints.push(startPoint.copy()); // Starting point
  curveControlPoints.push(createVector(startPoint.x + (Math.random() * 15), startPoint.y + (Math.random() * 20))); // Control point 1
  curveControlPoints.push(createVector(endPoint.x - (Math.random() * 15), endPoint.y - (Math.random() * 20))); // Control point 2
  curveControlPoints.push(endPoint.copy()); // Ending point

  // Draw the curvy line
  let lineColour = color(random(100, 115), random(190, 209), random(140,159)); // Line colours 
  stroke(lineColour);
  noFill();
  beginShape();
  for (let i = 0; i <= numSegments; i++) {
    let t = i / numSegments;
    let p = getCurvePoint(t, curveControlPoints);
    vertex(p.x, p.y);
  }
  endShape();

  // Calculate the y-coordinate where the line ends (at the ending point)
  curveEndY = endPoint.y;
}

function getCurvePoint(t, controlPoints) {
  // Use De Casteljau's algorithm to calculate the point on the Bezier curve
  if (controlPoints.length === 1) {
    return controlPoints[0].copy();
  }

  let nextControlPoints = [];
  for (let i = 0; i < controlPoints.length - 1; i++) {
    let x = lerp(controlPoints[i].x, controlPoints[i + 1].x, t);
    let y = lerp(controlPoints[i].y, controlPoints[i + 1].y, t);
    nextControlPoints.push(createVector(x, y));
  }

  return getCurvePoint(t, nextControlPoints);
}