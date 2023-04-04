class Block extends GameObject {
    constructor(game, x, y) {
      let size = 50;
      super(game, x * size, y * size, size, size, size);
      //this.img = document.getElementById("block");
      this.physical = true;
      game.physicalObjects.push(this);
    }
  
    ondraw(ctx) {
        ctx.drawImage(BLOCK_IMG, this.x, this.y, 50, 50);
    }
  }
  