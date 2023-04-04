class Game extends GameObject {
	constructor(canvas) {
		// Init game object
		super(undefined, 0, 0, canvas.width, canvas.height, undefined)

		this.canvas = canvas
		this.ctx = canvas.getContext("2d")
		this.levelCount = 1;
		this.physicalObjects = [];

		// Model
		this.keys = []
		this.time = Date.now()

		// Event handlers
		var game = this
		window.addEventListener("keydown", function(event) {
			game.keys[event.keyCode] = true
		})

		window.addEventListener("keyup", function(event) {
			game.keys[event.keyCode] = false
		})

		// Loop callback
		this.loop = function() {
			game.onloop()
		}

		// Load level1
		if(this.levelCount = 1){
			this.level1()
		}
		
	}

	onloop() {
		// Get time delta
		var now = Date.now()
		var dt = (now - this.time) / 100
		this.time = now

		// Animate
		this.move(dt)

		// Draw
		this.draw(this.ctx)

		// Loop animation
		requestAnimationFrame(this.loop)
	}

	// create a level
	level1() {
		this.nodes = []
		this.add(new Background(this))
		this.add(new Player(this, 1, 120, 50))
		this.add(new Block(this, 0, 11))	
		this.add(new Block(this, 1, 11))	
		this.add(new Block(this, 2, 11))	
		this.add(new Block(this, 3, 11))	
		this.add(new Block(this, 4, 11))	
		this.add(new Block(this, 5, 11))	
		this.add(new Block(this, 6, 11))	
		this.add(new Block(this, 7, 11))			
		this.add(new Block(this, 8, 11))	
	}
}

// Init
window.onload = function() {
	var game = new Game(document.getElementById("canvas"))
	game.loop()
}
