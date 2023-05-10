class Brick extends GameObject {
    constructor(game, x, y, row, column, ball) {
      super(game);

      this.ball = ball;

      this.x = x;
      this.y = y;
      this.row = row;
      this.column = column;
      this.width = 55;
      this.height = 20;
      this.offSetTop = 18;
      this.offSetLeft = 22;
      this.marginTop = 30;
      this.fillColor = "#000000";
      this.strokeColor = "#FFF";

    }

    //Ball and brick collision detection
    ballBrickCollision() {
      if (this.ball.x + this.ball.radius > this.x
        && this.ball.x - this.ball.radius < this.x + this.width
        && this.ball.y + this.ball.radius > this.y
        && this.ball.y - this.ball.radius < this.y + this.height) {
        
        BRICK_HIT.play();
        //Reverse the vertical velocity of the ball
        this.ball.dy = -this.ball.dy;
        //Remove the brick from the game
        this.game.remove(this);
        //Increas the game's score count
        this.game.scoreCount+=1;
      }
    }
    onmove(dt){
      this.ballBrickCollision();
     
    }
  
  
    ondraw(ctx) {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = this.fillColor;
      ctx.fill();
      ctx.closePath();
    }
  }
  