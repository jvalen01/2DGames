class Player extends GameObject {
    constructor(game, x, y) {
      super(game, x, y, 50, 50)

    }
  
    onmove(dt) {
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
    }
  
    ondraw(ctx) {
      ctx.fillStyle = "blue"
      ctx.beginPath()
      ctx.arc(this.x+this.width/2, this.y+this.height/2, this.width/2, 0, Math.PI*2)
      ctx.closePath()
      ctx.fill()
    }
  }
  