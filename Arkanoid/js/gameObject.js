class GameObject extends Node {
    constructor(game, x, y, width, height, size) {
      super();
      this.game = game ;// each gameobject can access the game object
      this.x = x;
      this.y = y;
      this.size = size;
      this.width = width;
      this.height = height;
      this.physical = false;
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

    checkCollision(physicalObjects) {

      // Test collision
      for (let i in physicalObjects) {
        var obj = physicalObjects[i];
        // Object is not the player.
        if (obj == this) continue;
        // test boundaries
        var test =
          this.x >= obj.x + obj.size ||
          this.x + this.size <= obj.x ||
          this.y >= obj.y + obj.size ||
          this.y + this.size <= obj.y;

        // if collision, then return the hit object
        if (!test) {
          return obj;
        }
      }
      return false;
    }
  }
  