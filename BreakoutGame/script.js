//Canvas element:
var cvs = document.getElementById("breakout");
var ctx = cvs.getContext("2d");

// ADD BORDER TO CANVAS
cvs.style.border = "1px solid #0ff";
// MAKE LINE THIK WHEN DRAWING TO CANVAS
ctx.lineWidth = 3;

//Variables:
const PADDLE_WIDTH = 100;
const PADDLE_MARGIN_BOTTOM = 50;
const PADDLE_HEIGHT = 20;
const BALL_RADIUS = 8;
let leftArrow = false;
let rightArrow = false;
let LIFE = 3; // PLAYER HAS 3 LIVES
let SCORE = 0;
const SCORE_UNIT = 1;
let LEVEL = 1;
const MAX_LEVEL = 3;
let GAME_OVER = false;


//Make paddle
const paddle = {
    x: cvs.width/2 - PADDLE_WIDTH/2,
    y: cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    dx: 5
}

function drawPaddle() {
    ctx.fillStyle = "#808080";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    ctx.strokeStyle = "#00FF00";
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

//Control the paddle
document.addEventListener("keydown", function(event){
    if(event.keyCode == 37){
        leftArrow = true;
    } else if(event.keyCode == 39){
        rightArrow = true;
    }
});

document.addEventListener("keyup", function(event){
    if(event.keyCode == 37){
        leftArrow = false;
    } else if(event.keyCode == 39){
        rightArrow = false;
    }
});

//Move the paddle
function movePaddle(){
    if(rightArrow && paddle.x + paddle.width < cvs.width){
        paddle.x += paddle.dx;
    } else if(leftArrow && paddle.x > 0){
        paddle.x -= paddle.dx;
    }
}

//Create ball
const ball = {
    x: cvs.width/2,
    y: paddle.y - BALL_RADIUS,
    radius: BALL_RADIUS,
    speed: 4,
    dx: 3 * (Math.random() * 2 - 1),
    dy: -3
}

//Draw ball
function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "#7DF9FF";
    ctx.fill();
    ctx.strokeStyle = "#808080";
    ctx.stroke();
    ctx.closePath();
}

//Move ball
function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;
}

//Ball and wall collision detection
function ballWallCollision(){
    if(ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0){
        ball.dx = -ball.dx;
        WALL_HIT.play();
    }
    if(ball.y - ball.radius < 0){
        ball.dy = -ball.dy;
        WALL_HIT.play();
    }
    if(ball.y + ball.radius > cvs.height){
        LIFE--; // LOSE LIFE
        LIFE_LOST.play();
        resetBall();
    }
}

function resetBall(){
    ball.x = cvs.width/2;
    ball.y = paddle.y - BALL_RADIUS;
    ball.dx = 3 * (Math.random() * 2 - 1);
    ball.dy = -3;
}

//ball and paddle collision
function ballPaddleCollision(){
    if(ball.x < paddle.x + paddle.width && ball.x > paddle.x && ball.y < paddle.y + paddle.height && ball.y > paddle.y){
        //check where the ball hit the paddle
        let collidePoint = ball.x - (paddle.x + paddle.width/2);
        //normalize the values
        collidePoint = collidePoint / (paddle.width/2);
        //calculate the angle of the ball
        let angle = collidePoint * Math.PI/3;
        PADDLE_HIT.play();
        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = -ball.speed * Math.cos(angle);
    }
}


//Create the bricks
const brick = {
    row: 3,
    column: 5,
    width: 55,
    height: 20,
    offSetLeft: 20,
    offSetTop: 20,
    marginTop: 40,
    fillColor: "#808080",
    strokeColor: "#FFF"
}

let bricks = [];

function createBricks(){
    for(let r = 0; r < brick.row; r++){
        bricks[r] = [];
        for(let c = 0; c < brick.column; c++){
            bricks[r][c] = {
                x: c * (brick.offSetLeft + brick.width) + brick.offSetLeft,
                y: r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop,
                status: true
            }
        }
    }
}

createBricks();

function drawBricks(){
    for(let r = 0; r < brick.row; r++){
        for(let c = 0; c < brick.column; c++){
            let b = bricks[r][c];
            //draw the brick only if status is true
            if(b.status){
                ctx.fillStyle = brick.fillColor;
                ctx.fillRect(b.x, b.y, brick.width, brick.height);
                ctx.strokeStyle = brick.strokeColor;
                ctx.strokeRect(b.x, b.y, brick.width, brick.height);
            }
        }
    }
}

// ball brick collision
function ballBrickCollision(){
    for(let r = 0; r < brick.row; r++){
        for(let c = 0; c < brick.column; c++){
            let b = bricks[r][c];
            if(b.status){
                if(ball.x + ball.radius > b.x 
                    && ball.x - ball.radius < b.x + brick.width 
                    && ball.y + ball.radius > b.y 
                    && ball.y - ball.radius < b.y + brick.height){
                    BRICK_HIT.play();
                    ball.dy = -ball.dy;
                    b.status = false; // the brick is broken
                    SCORE += SCORE_UNIT;
                }
            }
        }
    }
}

function showGameStats(text, textX, textY, img, imgX, imgY){
    //draw the text
    ctx.fillStyle = "#FFF";
    ctx.font = "25px Germania One";
    ctx.fillText(text, textX, textY);
    //draw an image
    ctx.drawImage(img, imgX, imgY, width = 25, height = 25);
}

function gameOver(){
    if(LIFE <= 0){
        showYouLose();
        GAME_OVER = true;
    }
}

function levelUp(){
    let isLevelDone = true;
    //check if all the bricks are broken
    for(let r = 0; r < brick.row; r++){
        for(let c = 0; c < brick.column; c++){
            isLevelDone = isLevelDone && !bricks[r][c].status;
        }
    }
    if(isLevelDone){
        WIN.play();
        if(LEVEL >= MAX_LEVEL){
            showYouWin()
            GAME_OVER = true;
            return;
        }
        brick.row++;
        createBricks();
        ball.speed += 0.5;
        resetBall();
        LEVEL++;
    }
}


function draw(){
    drawPaddle();
    drawBall();
    drawBricks();

    //SCORE
    showGameStats(SCORE, 35, 25, SCORE_IMG, 5, 5);
    //LIVES
    showGameStats(LIFE, cvs.width - 25, 25, LIFE_IMG, cvs.width - 55, 5);
    //LEVEL
    showGameStats(LEVEL, cvs.width/2, 25, LEVEL_IMG, cvs.width/2 - 30, 5);
}

function update(){
    movePaddle();
    moveBall();
    ballWallCollision();
    ballPaddleCollision();
    ballBrickCollision();
    gameOver();
    levelUp();
}

function loop(y){
    //clear the canvas
    ctx.drawImage(BG_IMG, 0, 0);
    draw();
    update();

    if(!GAME_OVER){
        requestAnimationFrame(loop);
    }

}

loop();

//select the sound element
const soundElement = document.getElementById("sound");

soundElement.addEventListener("click", audioManager);

function audioManager(){
    //change the image sound
    let imgSrc = soundElement.getAttribute("src");
    let SOUND_IMG = imgSrc == "img/SOUND_ON.png" ? "img/SOUND_OFF.png" : "img/SOUND_ON.png";
    soundElement.setAttribute("src", SOUND_IMG);
    //mute and unmute sounds
    WALL_HIT.muted = WALL_HIT.muted ? false : true;
    PADDLE_HIT.muted = PADDLE_HIT.muted ? false : true;
    BRICK_HIT.muted = BRICK_HIT.muted ? false : true;
    WIN.muted = WIN.muted ? false : true;
    LIFE_LOST.muted = LIFE_LOST.muted ? false : true;
}

// SHOW GAME OVER MESSAGE
/* SELECT ELEMENTS */
const gameover = document.getElementById("gameover");
const youwin = document.getElementById("youwin");
const youlose = document.getElementById("youlose");
const restart = document.getElementById("restart");

// CLICK ON PLAY AGAIN BUTTON
restart.addEventListener("click", function(){
    location.reload(); // reload the page
})

// SHOW YOU WIN
function showYouWin(){
    gameover.style.display = "block";
    youwon.style.display = "block";
}

// SHOW YOU LOSE
function showYouLose(){
    gameover.style.display = "block";
    youlose.style.display = "block";
}

