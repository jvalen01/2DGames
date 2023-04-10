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
		else if (this.levelCount = 2){
			this.level2()
		}
		else if (this.levelCount = 3){
			this.level3()
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
		let PADDLE_MARGIN_BOTTOM = 50;
		let PADDLE_WIDTH = 100;
		let PADDLE_HEIGHT = 20;

		this.nodes = []
		this.add(new Background(this));
		let paddle = new Paddle(this, this.canvas.width/2 - PADDLE_WIDTH/2, this.canvas.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT )
		this.add(paddle);

		for(let r = 0; r < 3; r++){
			bricks[r] = [];
			for(let c = 0; c < 5; c++){
				bricks[r][c] = {
					x: c * (brick.offSetLeft + brick.width) + brick.offSetLeft,
					y: r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop,
					status: true
				}
			}
		}
		this.add(new Brick(this, 3, 5));
		this.add(new Ball(this, paddle.x, paddle.y, 50, bricks, paddle));
		
		
		
	}
}

// Init
window.onload = function() {
	var game = new Game(document.getElementById("canvas"))
	game.loop()
}
