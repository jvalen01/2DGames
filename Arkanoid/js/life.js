//Takes in the game object and sets the background to orange
class Life extends GameObject {
    constructor(game) {
        super(game, 0, 0, 0, 0, undefined)
        this.textX = game.canvas.width - 80;
        this.textY = 35;
        
        this.img = LIFE_IMG;
    }
  
    ondraw(ctx, score, health) {
        ctx.fillStyle = "#FFF";
        ctx.font = "20px Germania One";
        ctx.fillText("Health: " + health, this.textX, this.textY);
        //ctx.drawImage(this.img, this.imgX, this.imgY, 25, 25);
    }
  }