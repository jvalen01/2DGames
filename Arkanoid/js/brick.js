class Brick extends GameObject {
    constructor(game, row, column) {
      let size = 50;
      super(game, row * size, column * size, size, size, size);
      //this.img = document.getElementById("block");
      this.physical = true;
      game.physicalObjects.push(this);

      this.row = row;
      this.column = column;
      this.width = 55;
      this.height = 20;
      this.offSetTop = 20;
      this.offSetLeft = 20;
      this.marginTop = 40;
      this.fillColor = "#808080";
      this.strokeColor = "#FFF";

      this.bricks = [];

    }

  createBricks() {
    for (let r = 0; r < this.row; r++) {
      this.bricks[r] = [];
      for (let c = 0; c < this.column; c++) {
        this.bricks[r][c] = {
          x: c * (this.offSetLeft + this.width) + this.offSetLeft,
          y: r * (this.offSetTop + this.height) + this.offSetTop + this.marginTop,
          status: true
        }
      }
    }
  }

  drawBricks() {
    for (let r = 0; r < this.row; r++) {
      for (let c = 0; c < this.column; c++) {
        let b = this.bricks[r][c];
        //draw the brick only if status is true
        if (b.status) {
          ctx.fillStyle = this.fillColor;
          ctx.fillRect(b.x, b.y, this.width, this.height);
          ctx.strokeStyle = this.strokeColor;
          ctx.strokeRect(b.x, b.y, this.width, this.height);
        }
      }
    }
  }
  
    ondraw(ctx) {
        this.createBricks();
        this.drawBricks();
    }
  }
  