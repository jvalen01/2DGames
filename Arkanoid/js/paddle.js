class Paddle extends GameObject {
    constructor(game, x, y, width, height) {
      super(game, x, y, width, height, undefined);
      game.physicalObjects.push(this);

      let PADDLE_WIDTH = 100;
      let PADDLE_HEIGHT = 20;
      this.game = game;

      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
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
        console.log("here")
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
  