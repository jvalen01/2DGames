//Takes in the game object and sets the background to orange
class Life extends GameObject {
    constructor(game) {
        super(game, 0, 0, 0, 0, undefined)
        this.cvsWidth = game.canvas.width;
        
    }

  
    ondraw(ctx, score, health) {
        //draw text
        ctx.fillStyle = "#FFF";
        ctx.font = "25px Arial";
        ctx.fillText(health, this.cvsWidth - 25, 25);
        
        //draw image
        ctx.drawImage(LIFE_IMG, this.cvsWidth - 55, 5, this.width = 25, this.height = 25);
    }

  }