class Player extends GameObject {
    constructor(game, x, y, size) {
      super(game, x, y, size, size, size);
      this.physical = true;
      game.physicalObjects.push(this);

    }
  
    onmove(dt) {

      var last_x = this.x;
      var last_y = this.y;
      
      // Move player based on keyboard input
      var keys = this.game.keys
      if ( keys[37] ) this.x-=5;
      if ( keys[39] ) this.x+=5;
      if ( keys[38] ) this.y-=5;
      if ( keys[40] ) this.y+=5;
      if ( keys[32] ) {  // space key
        //this.startFiring()  // if pressed do something
      } else {
        //this.stopFiring()
      }

      // Reset position if collision occurs
      if (this.checkCollision(this.game.physicalObjects)) {
        this.x = last_x;
        this.y = last_y;
      }
    }

  
    ondraw(ctx) {
      ctx.fillStyle = "blue"
      ctx.beginPath()
      ctx.arc(this.x+this.width/2, this.y+this.height/2, this.width/2, 0, Math.PI*2)
      ctx.closePath()
      ctx.fill()
    }
  }
  