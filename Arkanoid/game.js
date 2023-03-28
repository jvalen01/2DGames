const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

/**
 * @class Model
 *
 * Manages the data of the application.
 */
class gameModel {
    constructor() {
        this.PADDLE_WIDTH = 100;
        this.PADDLE_MARGIN_BOTTOM = 50;
        this.PADDLE_HEIGHT = 20;
        this.BALL_RADIUS = 8;
        this.LIFE = 3; // The amount of lives the player will have before game over.

        //Creation of paddle. Position, width and height. 
        this.paddle = { 
            x: canvas.width/2 - this.PADDLE_WIDTH/2,
            y: canvas.height - this.PADDLE_MARGIN_BOTTOM - this.PADDLE_HEIGHT,
            width: this.PADDLE_WIDTH,
            height: this.PADDLE_HEIGHT,
            dx: 5
        }
        //Create ball. 
        this.ball = {
            x: canvas.width/2,
            y: this.paddle.y - this.BALL_RADIUS,
            radius: this.BALL_RADIUS,
            speed: 5,
            dx: 3 * (Math.random() * 2 - 1),
            dy: -3
        }
    }
    //Reset of ball after losing life. It will be placed on the paddle in the middle of the canvas.
    resetBall(){
        this.ball.x = canvas.width/2;
        this.ball.y = this.paddle.y - this.BALL_RADIUS;
        this.ball.dx = 3 * (Math.random() * 2 - 1);
        this.ball.dy = -3;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @class View
 *
 * Visual representation of the model.
 */
class gameView {
    constructor(paddle, ball) {

        this.paddle = paddle;
        this.ball = ball;
        this.rightArrow = false;
        this.leftArrow = false;

            //Control the paddle
        document.addEventListener("keydown", (event) => {
            if(event.keyCode == 37){
            this.leftArrow = true;
            } else if(event.keyCode == 39){
            this.rightArrow = true;
            }
        });
    
        document.addEventListener("keyup", (event) => {
            if(event.keyCode == 37){
            this.leftArrow = false;
            } else if(event.keyCode == 39){
            this.rightArrow = false;
            }
        });

    }

    render() {
        // draw the model
        context.drawImage(BG_IMG, 0, 0);

    }

    //function for drawing the paddle.
    drawPaddle() {
        context.fillStyle = "#000000";
        context.fillRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
    
        context.strokeStyle = "#000000";
        context.strokeRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
    }
    //Move the paddle
    movePaddle(){
        if(this.rightArrow && this.paddle.x + this.paddle.width < canvas.width){
            this.paddle.x += this.paddle.dx;
        } else if(this.leftArrow && this.paddle.x > 0){
            this.paddle.x -= this.paddle.dx;
        }
    }

    //Draw the ball:
    drawBall(){
        context.beginPath();
        context.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI*2);
        context.fillStyle = "#000000";
        context.fill();
        context.strokeStyle = "#808080";
        context.stroke();
        context.closePath();
    }

    //Move ball
    moveBall(){
        this.ball.x += this.ball.dx;
        this.ball.y += this.ball.dy;
    }

    draw(){
        this.drawPaddle();
        this.drawBall();
    }

    update(){
        this.movePaddle();
        this.moveBall();

    }

    
    //Neither the controller nor the model should know anything about the DOM, HTML elements, CSS, or any of that. 
    //Anything relating to it should be in the view.
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * @class Controller
 *
 * Links the user input and the view output.
 * Handles collision logic.
 *
 * @param model
 * @param view
 */
class gameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.paddle = this.model.paddle;
        this.view.ball = this.model.ball;
    }

    //Ball and wall collision logic:
    ballWallCollision(){
        if(this.model.ball.x + this.model.ball.radius > canvas.width || this.model.ball.x - this.model.ball.radius < 0){
            this.model.ball.dx = -this.model.ball.dx;
            WALL_HIT.play();
        }
        if(this.model.ball.y - this.model.ball.radius < 0){
            this.model.ball.dy = -this.model.ball.dy;
            WALL_HIT.play();
        }
        if(this.model.ball.y + this.model.ball.radius > canvas.height){
            this.model.LIFE--; // LOSE LIFE
            LIFE_LOST.play();
            this.model.resetBall();
        }
    }

    //Ball and paddle collision logic:
    ballPaddleCollision(){
        if(this.model.ball.x < this.model.paddle.x + this.model.paddle.width && this.model.ball.x > this.model.paddle.x && this.model.ball.y < this.model.paddle.y + this.model.paddle.height && this.model.ball.y > this.model.paddle.y){
            //check where the ball hit the paddle
            let collidePoint = this.model.ball.x - (this.model.paddle.x + this.model.paddle.width/2);

            //normalize the values
            collidePoint = collidePoint / (this.model.paddle.width/2);

            //calculate the angle of the ball depending on where it hit the paddle:
            let angle = collidePoint * Math.PI/3;
            PADDLE_HIT.play();
            this.model.ball.dx = this.model.ball.speed * Math.sin(angle);
            this.model.ball.dy = -this.model.ball.speed * Math.cos(angle);
        }
    }

    collisionDetection(){
        this.ballWallCollision();
        this.ballPaddleCollision();
    }


    loop(){
        //clear the canvas
        this.view.render();

        this.view.update();
        
        this.collisionDetection();
        this.view.draw();

        
        
    
        if(!this.model.GAME_OVER){
            requestAnimationFrame(this.loop.bind(this));
        }
    
    }
}

const app = new gameController(new gameModel(), new gameView())


app.loop();

