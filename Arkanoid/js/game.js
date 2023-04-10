class Game extends GameObject {
	constructor(canvas) {
		// Init game object
		super(undefined, 0, 0, canvas.width, canvas.height, undefined)

		this.canvas = canvas
		this.ctx = canvas.getContext("2d")
		this.levelCount = 1;
		this.physicalObjects = [];
		this.bricks = [];

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


	//method to create the bricks
	createBricks(rows, columns){
		const offSetLeftBrick = 20;
		const offSetTopBrick = 20;
		const marginTopBrick = 40;
		const width = 55;
		const height = 20;

		for(let r = 0; r < rows; r++){
			this.bricks[r] = [];
			for(let c = 0; c < columns; c++){
				this.bricks[r][c] = {
					x: c * (offSetLeftBrick + width) + offSetLeftBrick,
					y: r * (offSetTopBrick + height) + offSetTopBrick + marginTopBrick,
					status: true
				}
			}
		}
	}

	// create a level
	level1() {
		const PADDLE_MARGIN_BOTTOM = 50;
		const PADDLE_WIDTH = 100;
		const PADDLE_HEIGHT = 20;
		
		let rows = 3;
		let columns = 5;
		

		this.nodes = []

		// Add background to the game
		this.add(new Background(this));
		//add life
		let life = new Life(this);
		this.add(life);
		//add paddle
		let paddle = new Paddle(this, this.canvas.width/2 - PADDLE_WIDTH/2, this.canvas.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT )
		this.add(paddle);
		//add ball
		let ball = new Ball(this, paddle.x, paddle.y, 50, paddle, life);
		this.add(ball);

		//create bricks
		this.createBricks(rows, columns);
		//Add all bricks
		for(let r = 0; r < rows; r++){
			for(let c = 0; c < columns; c++){
				let b = this.bricks[r][c];
				//draw the brick only if status is true
				if(b.status){
					this.add(new Brick(this, b.x, b.y, 55, 20, ball))
				}
			}
		}		
	}
}

// Init
window.onload = function() {
	var game = new Game(document.getElementById("canvas"))
	game.loop()
}
