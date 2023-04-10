//Takes in the game object and sets the background to orange
class Background extends GameObject {
    constructor(game) {
        super(game, 0, 0, game.canvas.width, game.canvas.height, undefined)
        this.physical = false;
    }
  
    ondraw(ctx) {
      ctx.fillStyle = "orange";
  
      // fill whole canvas
      ctx.fillRect(0, 0, this.width, this.height);
    }
  }