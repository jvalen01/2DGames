class GameObject extends Node {
    constructor(game, x, y, width, height, size) {
      super();
      this.game = game ;// each gameobject can access the game object
      this.x = x;
      this.y = y;
      this.size = size;
      this.width = width;
      this.height = height;
    }
  
    move(dt) {
      // Trigger onmove event
      this.onmove(dt)
      // Notify all children
      this.notify("move", dt)
    }
  
    draw(ctx, score, health) {
      // Trigger ondraw event
      this.ondraw(ctx, score, health)
      // Notify all children
      this.notify("draw", ctx, score, health)
    }
  
    // Default event handlers
    onmove(dt) {}
  
    ondraw(ctx, score, health) {}

  }
  