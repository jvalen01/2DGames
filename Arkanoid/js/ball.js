class Ball extends GameObject {
    constructor(game, x, y, size, paddle, life) {
      super(game, x, y, size, size, size);

      this.game = game;
      this.paddle = paddle;
      this.dx = 3 * (Math.random() * 2 - 1);
      this.dy = -3;
      this.radius = 8;
      this.speed = 4;
      this.y = paddle.y - this.radius;
      this.x = game.canvas.width/2;
      this.life = life;


    }
    resetBall(){
        this.x = this.game.canvas.width/2;
        this.y = this.paddle.y - this.radius;
        this.dx = 3 * (Math.random() * 2 - 1);
        this.dy = -3;
    }

    //Ball and wall collision detection
    ballWallCollision() {
        if (this.x + this.radius > this.game.canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
            //WALL_HIT.play();
        }
        if (this.y - this.radius < 0) {
            this.dy = -this.dy;
            //WALL_HIT.play();
        }
        if (this.y + this.radius > this.game.canvas.height) {
            this.life.health--; // LOSE LIFE
            //LIFE_LOST.play();
            this.resetBall();
        }
    }
    //ball and paddle collision
    ballPaddleCollision() {
        if (this.x < this.paddle.x + this.paddle.width && this.x > this.paddle.x && this.y < this.paddle.y + this.paddle.height && this.y > this.paddle.y) {
            //check where the ball hit the paddle
            let collidePoint = this.x - (this.paddle.x + this.paddle.width / 2);
            //normalize the values
            collidePoint = collidePoint / (this.paddle.width / 2);
            //calculate the angle of the ball
            let angle = collidePoint * Math.PI / 3;
            //PADDLE_HIT.play();
            this.dx = this.speed * Math.sin(angle);
            this.dy = -this.speed * Math.cos(angle);
        }
    }

    
  
    onmove(dt) {

        this.x += this.dx;
        this.y += this.dy;
        this.ballWallCollision();
        this.ballPaddleCollision();

    
    }

  
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