var canvas;
var canvasContext;
var ballX = 50; // Begining position X for ball
var ballY = 50; // Begining position Y for ball
var ballSpeedX = 10; //mooving in pxls in X
var ballSpeedY = 5; //mooving in pxls in Y

var paddle1Y = 250; //position of rectange
var paddle2Y = ballY; //position of 2nd rectangle
const paddleHeight = 100; //non-changable height for rectangle
const paddleThickness = 10;//thickness

//SCORING
var score1 = 0;
var score2 = 0;


//Cheking mouse position
function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect(); //callback the coordinates
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.left - root.scrollLeft;
    return {
        x: mouseX,
        y: mouseY
    }
}


window.onload = function () {
    // Getting the element of canvas 
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext('2d');
    // Set the speed of refresh
    var framesPerSecond = 30;
    setInterval(function () {
        ruchac();
        malowac();
    }, 1000 / framesPerSecond);
    //Declare the position of rectange with mouse position
    canvas.addEventListener("mousemove",
        function (evt) {
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y - (paddleHeight / 2); // Mouse on the center of rectangle
        })
};

//Moving a pudd 
function moveComputer(){
    var paddle2YCenter = paddle2Y + (paddleHeight/2);
    if (paddle2YCenter < ballY - 35){
        paddle2Y += 6;
    } else if ((paddle2YCenter > ballY + 35)){
        paddle2Y -= 6;
    }
}


function ruchac() {
    ballX = ballX + ballSpeedX; //adding for ball position mooving
    ballY = ballY + ballSpeedY;

    moveComputer();

    if (ballX > canvas.width) {
        if(ballY > paddle2Y && 
            ballY < paddle2Y + paddleHeight){
            ballSpeedX = -ballSpeedX;//when ball touches right puddle it change direction
        } else {
                ballReset();
                score++;
            }  
    } else if (ballX < 0) { //when touches left side
        if(ballY > paddle1Y && 
          ballY < paddle1Y+paddleHeight){
          ballSpeedX = -ballSpeedX;
        }else {
        ballReset();
        score1++;
    } //Make a reset
    } else if (ballY >= canvas.height) { //when ball touches bottom side it change direction to negative
        ballSpeedY = -ballSpeedY; // 20 ==> -20
    } else if (ballY < 0) { //when touches up side
        ballSpeedY = -ballSpeedY; // -20 ==> 20
    }
}



function malowac() {
    //FIELD
    colorRect(0, 0, canvas.width, canvas.height, "black"); //our field

    //RECTANGLE
    colorRect(0, paddle1Y, 10, paddleHeight, "white");

    //BALL
    makeCircle(ballX, ballY, 10, "white"); //arc special command to draw a circle arc/ballX, 100 ==> center of circle, 10 is radius,

    //SECOND RECTANGLE
    colorRect(canvas.width - paddleThickness,paddle2Y,paddleThickness, paddleHeight, "green");
    // paddle2Y = ballY - paddleHeight/2; //position of 2nd rectangle

}




//Make a konstruktor for figures
function colorRect(leftX, topY, width, height, drawColor) { // getting arguments
    canvasContext.fillStyle = drawColor; // Color of figure
    canvasContext.fillRect(leftX, topY, width, height);
}

//Make a konstruktor for circles
function makeCircle(centerX, centerY, radius, color) { // getting arguments
    canvasContext.beginPath();
    canvasContext.fillStyle = color; // Color of circe
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
    canvasContext.fillText("Score",canvas.width/2,100);
    canvasContext.fillText(score1,100,100);
    canvasContext.fillText(score2,canvas.width - 100,100);

}
//When ball scores , get out the rectangle
function ballReset() {
    ballSpeedX = -ballSpeedX; // changing the direction
    ballX = canvas.width / 2;
    ballY = canvas.height / 2; //Resets from center
}