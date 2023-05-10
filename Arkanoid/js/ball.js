class Ball extends GameObject {
    constructor(game, paddle, life, speed) {
      super(game);

      this.game = game;
      this.paddle = paddle;
      this.life = life;

      //Ball radius and speed
      this.radius = 8;
      this.speed = speed;
      //Ball starting position
      this.y = paddle.y - this.radius;
      this.x = game.canvas.width/2;
      //Horsiotal and vertical velocity
      this.dx = 4 * (Math.random() * 2 - 1);
      this.dy = -4;
    }

    //Resets the position and velocity of the ball to their initial values.
    //It is called when the ball goes below the canvas height, indicating a life loss.
    resetBall(){
        this.x = this.game.canvas.width/2;
        this.y = this.paddle.y - this.radius;
        this.dx = 3 * (Math.random() * 2 - 1);
        this.dy = -3;
    }

    
    //Detects collisions between the ball and the walls of the canvas.
    ballWallCollision() {
        //If the ball collides with the left or right wall, it reverses the horizontal velocity (this.dx) and plays a sound effect.
        if (this.x + this.radius > this.game.canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
            WALL_HIT.play();
        }
        //If the ball collides with the top wall, it reverses the vertical velocity (this.dy) and plays a sound effect
        if (this.y - this.radius < 0) {
            this.dy = -this.dy;
            WALL_HIT.play();
        }
        //If the ball goes below the canvas height (hits the bottom wall), you lose a life, 
        //a sound effect gets played and a call to the resetBall function is made to reset the ball's position and velocity
        if (this.y + this.radius > this.game.canvas.height) {
            this.game.health--; // LOSE LIFE
            LIFE_LOST.play();
            this.resetBall();
        }
    }
    //ball and paddle collision detection.
    //If there is a collision, this method calculates the point of collision (collidePoint) relative to the center of the paddle and normalizes it
    ballPaddleCollision() {
        if (this.x < this.paddle.x + this.paddle.width && this.x > this.paddle.x && this.y < this.paddle.y + this.paddle.height && this.y > this.paddle.y) {
            //check where the ball hit the paddle
            let collidePoint = this.x - (this.paddle.x + this.paddle.width / 2);
            //normalize the values
            collidePoint = collidePoint / (this.paddle.width / 2);
            //Based on the collidePoint, we calculate the angle at which the ball should bounce off the paddle
            let angle = collidePoint * Math.PI / 3;
            PADDLE_HIT.play();
            this.dx = this.speed * Math.sin(angle);
            this.dy = -this.speed * Math.cos(angle);
        }
    }

    
  
    //Update position of the ball and check for collisions
    onmove(dt) {
        this.x += this.dx;
        this.y += this.dy;
        this.ballWallCollision();
        this.ballPaddleCollision();
    }

    //Drawing the ball on the canvas
    ondraw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
      ctx.fillStyle = "#7DF9FF";
      ctx.fill();
      ctx.strokeStyle = "#808080";
      ctx.stroke();
      ctx.closePath();
    }
  }