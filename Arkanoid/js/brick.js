class Brick extends GameObject {
    constructor(game, x, y, row, column, ball) {
      let size = 50;
      super(game, y, x, size, size, size);

      this.ball = ball;

      this.x = x;
      this.y = y;
      this.row = row;
      this.column = column;
      this.width = 55;
      this.height = 20;
      this.offSetTop = 20;
      this.offSetLeft = 20;
      this.marginTop = 40;
      this.fillColor = "#808080";
      this.strokeColor = "#FFF";

    }

    ballBrickCollision() {
      if (this.ball.x + this.ball.radius > this.x
        && this.ball.x - this.ball.radius < this.x + this.width
        && this.ball.y + this.ball.radius > this.y
        && this.ball.y - this.ball.radius < this.y + this.height) {
        //BRICK_HIT.play();
        this.ball.dy = -this.ball.dy;
        this.game.remove(this);
        this.game.scoreCount+=1;
        //SCORE += SCORE_UNIT;
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
  