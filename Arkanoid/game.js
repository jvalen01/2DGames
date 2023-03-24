const cvs = document.getElementById('gameCanvas');
const ctx = cvs.getContext('2d');

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

        //Creation of paddle
        this.paddle = { 
            x: cvs.width/2 - this.PADDLE_WIDTH/2,
            y: cvs.height - this.PADDLE_MARGIN_BOTTOM - this.PADDLE_HEIGHT,
            width: this.PADDLE_WIDTH,
            height: this.PADDLE_HEIGHT,
            dx: 5
        }
    }
    

    //Storing and modyfing data.
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @class View
 *
 * Visual representation of the model.
 */
class gameView {
    constructor(paddle) {

        this.paddle = paddle;
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
        ctx.drawImage(BG_IMG, 0, 0);

    }
    drawPaddle() {
        ctx.fillStyle = "#000000";
        ctx.fillRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
    
        ctx.strokeStyle = "#000000";
        ctx.strokeRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
    }
    //Move the paddle
    movePaddle(){
        if(this.rightArrow && this.paddle.x + this.paddle.width < cvs.width){
            this.paddle.x += this.paddle.dx;
        } else if(this.leftArrow && this.paddle.x > 0){
            this.paddle.x -= this.paddle.dx;
        }
    }




    draw(){
        this.drawPaddle();
    }

    update(){
        this.movePaddle();

    }

    
    //Neither the controller nor the model should know anything about the DOM, HTML elements, CSS, or any of that. 
    //Anything relating to it should be in the view.
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
class gameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.paddle = this.model.paddle;
    }



    loop(){
        //clear the canvas
        this.view.render();

        this.view.update();
        this.view.draw();

        
        
    
        if(!this.model.GAME_OVER){
            requestAnimationFrame(this.loop.bind(this));
        }
    
    }
}

const app = new gameController(new gameModel(), new gameView())


app.loop();

