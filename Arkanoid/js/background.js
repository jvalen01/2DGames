//Takes in the game object and sets the background to the background imafe
class Background extends GameObject {
    constructor(game) {
        super(game, 0, 0, game.canvas.width, game.canvas.height, undefined)
    }
  
    ondraw(ctx) {
      ctx.drawImage(BG_IMG, 0, 0);
    }
  }