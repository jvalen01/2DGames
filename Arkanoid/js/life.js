//Takes in the game object and sets the background to orange
class Life extends GameObject {
    constructor(game) {
        super(game, 0, 0, game.canvas.width, game.canvas.height, undefined)
        this.physical = false;
        this.health = 3;
        this.textX = game.canvas.width - 80;
        this.textY = 35;
        
        this.img = LIFE_IMG;
    }
  
    ondraw(ctx) {
        ctx.fillStyle = "#FFF";
        ctx.font = "20px Germania One";
        ctx.fillText("Health: " + this.health, this.textX, this.textY);
        //ctx.drawImage(this.img, this.imgX, this.imgY, 25, 25);
    }
  }