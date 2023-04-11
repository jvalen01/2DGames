class Paddle extends GameObject {
    constructor(game) {
      const PADDLE_MARGIN_BOTTOM = 50;
		  const PADDLE_WIDTH = 100;
		  const PADDLE_HEIGHT = 20;

      super(game, game.canvas.width/2 - PADDLE_WIDTH/2, game.canvas.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT, undefined);

      this.game = game;

      this.x = game.canvas.width/2 - PADDLE_WIDTH/2;
      this.y = game.canvas.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT;
      this.width = PADDLE_WIDTH;
      this.height = PADDLE_HEIGHT;
      this.dx = 5;

    }
  
    onmove(dt) {

      // Save last position
      var last_x = this.x;
      var last_y = this.y;
      
      // Move player based on keyboard input
      var keys = this.game.keys
      if ( ( keys[39] )  && this.x + this.width < this.game.canvas.width) {
        this.x+=this.dx;
      }

      if ( ( keys[37] ) && this.x > 0) {
        this.x-=this.dx;
      }

      if ( keys[38] ) //Do something (Up key);
      if ( keys[40] ) {
        //Do something (Down key)
      }
      if ( keys[32] ) {  // space key
        //this.startFiring()  // if pressed do something
      } else {
        //this.stopFiring()
      }
    
    }

  
    ondraw(ctx) {
      ctx.fillStyle = "#808080";
      ctx.fillRect(this.x, this.y, this.width, this.height);

      ctx.strokeStyle = "#00FF00";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
  