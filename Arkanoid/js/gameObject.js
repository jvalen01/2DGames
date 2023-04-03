class GameObject extends Node {
    constructor(game, x, y, width, height) {
      super()
      this.game = game // each gameobject can access the game object
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    }
  
    move(dt) {
      // Trigger onmove event
      this.onmove(dt)
      // Notify all children
      this.notify("move", dt)
    }
  
    draw(ctx) {
      // Trigger ondraw event
      this.ondraw(ctx)
      // Notify all children
      this.notify("draw", ctx)
    }
  
    // Default event handlers
    onmove(dt) {}
  
    ondraw(ctx) {}
  }
  