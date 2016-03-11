var canvas = document.getElementById("canvas");
var duck = document.getElementById("duck");
var stop = document.getElementById("stop");
var ctx = canvas.getContext("2d");
var duckX = 0;
var duckY = 0;
var isDuck = 0;
var score = 0;
var requestID;

var clear = function clear() {
    ctx.clearRect(0,0,538,538);
    //CHANGE THIS TO PRINTING BACKGROUND
}

var duckSetup = function duckSetup(){
    isDuck = 1;
    duckX =  Math.floor((Math.random() * 478))+10;
    duckY =  Math.floor((Math.random() * 478))+10;

    var x_vel = 5*(Math.floor(Math.random() * 2)*2-1);
    var y_vel = 5*(Math.floor(Math.random() * 2)*2-1);

    var duckGo = function(){
	clear();
	if ( duckX >= 498 || duckX <= 0 || Math.floor(Math.random() * 100) == 0) {
	    x_vel = -x_vel;
	} 
	if ( duckY >= 498 || duckY <= 0 || Math.floor(Math.random() * 100) == 0) {
	    y_vel = -y_vel;
	}
	duckX += x_vel;
	duckY += y_vel;
	var logo = new Image();
	logo.src = "duck_hunter.jpg";
	ctx.drawImage(logo,duckX,duckY,40,40);
	requestID = window.requestAnimationFrame(duckGo);
    };
    
    duckGo();
};

var shot = function shot(){
    var rect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;
    if( mouseX - duckX >= 0 && mouseX - duckX <= 40 && mouseY - duckY >= 0 && mouseY - duckY <= 40){
        score += 10;
        window.cancelAnimationFrame(requestID);
        clear();
        setTimeout(duckSetup, 2000);
    }else{
        score -= 10;
    }
}

var stopAnimation = function stopAnimation(){
    window.cancelAnimationFrame(requestID);
    clear();
}

canvas.addEventListener("click",shot);
duck.addEventListener("click",duckSetup);
stop.addEventListener("click",stopAnimation);
