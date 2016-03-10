
console.log("loaded js");

// BASIC VARS
var canvas = document.getElementById("canvas");
var circle = document.getElementById("circle");
var duck = document.getElementById("duck");
var stop = document.getElementById("stop");
var ctx = canvas.getContext("2d");
var requestID;

// DUCK STUFF


var duckLogoSetup = function(){
    window.cancelAnimationFrame(requestID);

    var x_dvd = canvas.width/2 + Math.floor((Math.random() * 250) + 1) - 125;
    var y_dvd = canvas.height/2 + Math.floor((Math.random() * 250) + 1) - 125;
    var x_dir = 1.5;
    var y_dir = -1.5;

    var duckLogo = function(){
	clearBox();
	if ( x_duck >= (canvas.width - 60) || x_duck <= 0 ) {
	    x_dir = -x_dir;
	} 
	if ( y_duck >= (canvas.height - 40) || y_duck <= 0 ) {
	    y_dir = -y_dir;
	}
	x_duck += x_dir;
	y_duck += y_dir;
	var logo = new Image();
	logo.src = "duck_hunter.jpg";
	ctx.drawImage(logo,x_duck,y_duck,60,40);
	requestID = window.requestAnimationFrame(duckLogo);
    };
    
    duckLogo();

};

//* outlines the canvas that the user can draw in
function makeBox(x,y,w,h){
    ctx.strokeStyle = "#0000ff";
    ctx.strokeRect(x,y,w,h);
    ctx.stroke();
}
//*

function clearBox(){
    console.log("clear box called");
    ctx.clearRect(0,0,538,538);
    makeBox(0,0,538,538);
}

radius = 0; 
growing = true;

function drawCircle(event){
    clearBox();
    console.log("cleared, drawing");
    //** alterating size of circle
    if (growing){
	radius += 1; 
    } else{
	radius -= 1;
    }
    
    //** altering growing variable
    if (radius == canvas.width/2){
	growing = false;
    }
    if (radius == 0){
	growing = true;
    }

    //* drawing the circle itself
    ctx.beginPath();
    ctx.fillStyle = "#003FFF";
    ctx.arc(canvas.width/2, canvas.height/2, radius, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();
    
    requestID = window.requestAnimationFrame(drawCircle);
    
}

var stopIt = function(){
    console.log (requestID);
    window.cancelAnimationFrame(requestID);
}

makeBox(0,0,538,538);
circle.addEventListener("click",drawCircle);
duck.addEventListener("click",duckLogoSetup);
stop.addEventListener("click", stopIt);







