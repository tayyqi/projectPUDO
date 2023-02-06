// declare global variables up here

function setup() {
  // code written in here will be executed once when the page loads
  setupAppCanvas();
}

var timestamp = 0;
var timeInterval = 1000; // in milliseconds

const direct = ["straight","right", "null","left"];
var curDir = [0, 2, 3, 1];
const dest = ["to Stamford Rd Entrance", "to kiosk","to MRT", "to boarding area"];

function update() {
  // code written in here will be executed every frame
  
  //after detecting marker  
  if (getMarker(0).present) {
    document.getElementById("dxns").innerHTML = "changed";
  } else{
    document.getElementById("dxns").innerHTML = "no tags detected";
  }
  
  //IN PROGRESS, based on orientation, direction of wayfinding changes
  var theta = getMarker(0).rotation;
  var orient = 0;
  
  if (theta >= -0.25*Math.PI && theta < 0.25*Math.PI){
    orient = 0;
  } else if (theta >= 0.25*Math.PI && theta < 0.75*Math.PI){
    orient = 1;
  } else if (theta >= -0.75*Math.PI && theta < -0.25*Math.PI){
    orient = -1;
  } else{
    orient = 2;
  }
  
  let wayfinding_inst = "";
  
  if(getMarker(0).present){
    for (let i=0; i< curDir.length; i++){
    var nuVal = (curDir[i] + orient);
    
    while(nuVal<0){
        nuVal += 4;
    }
    nuVal = nuVal%4; 
   
    if (nuVal == 2){
      
    } else {
      wayfinding_inst += "Head " + direct[nuVal] + " "+ dest[i]+".";
    }
  }
  
  document.getElementById("dxns").innerHTML = wayfinding_inst;
  console.log("wayfound");
  }
  

  var timeNow = Date.now();
  if (timeNow - timestamp > timeInterval) {
    // Do something here

    timestamp = timeNow; //end with setting the timestamp to the current time
  }
}

// setupAppCanvas() function will initialize #app-canvas.
// if you intend to use #app-canvas, call this function in setup()
var canvas;
var ctx;
var dpr;
var appWidth;
var appHeight;

function setupAppCanvas() {
  canvas = document.querySelector("#app-canvas");
  dpr = window.devicePixelRatio || 1;

  appWidth = window.innerWidth * dpr;
  appHeight = window.innerHeight * dpr;
  console.log("appWidth =", appWidth, " appHeight =", appHeight);

  canvas.width = appWidth;
  canvas.height = appHeight;

  ctx = canvas.getContext("2d");
}
