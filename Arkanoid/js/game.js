class Game extends GameObject {
	constructor(canvas) {
		// Init game object
		super(undefined, 0, 0, canvas.width, canvas.height, undefined)

		this.canvas = canvas
		this.ctx = canvas.getContext("2d")
		this.levelCount = 1;
		this.scoreCount= 0;
		this.health = 3;
		this.bricks = [];

		let GAMEOVER = false;

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

		this.level1();

		// Loop callback
		this.loop = function() {
			game.onloop(GAMEOVER)
			
		}	
	}


	onloop(GAMEOVER) {

		if(this.health == 0){
			//end game
			GAMEOVER = true;
			const gameover = document.getElementById("gameover");
			const youlose = document.getElementById("youlose");
			gameover.style.display = "block";
    		youlose.style.display = "block";

			const restart = document.getElementById("restart");

			// CLICK ON PLAY AGAIN BUTTON
			restart.addEventListener("click", function () {
				location.reload(); // reload the page
			})

		}

		// Checks for if the player destroyed all bricks and can move on to next level.
		if(this.levelCount == 1 && this.scoreCount == 1){
			this.levelCount++;
			this.scoreCount = 0;
			this.level2();

		}
		if(this.levelCount == 2 && this.scoreCount == 2){
			this.levelCount++;
			this.scoreCount = 0;
			this.level3();
		}

		//If completed last level, you win.
		if(this.levelCount == 3 && this.scoreCount == 3){
			console.log("You win!");
			//Create a winning screen
			return;
		}

		// Get time delta
		var now = Date.now()
		var dt = (now - this.time) / 100
		this.time = now

		// Animate
		this.move(dt)

		// Draw
		this.draw(this.ctx, this.scoreCount, this.health)

		

		// Loop animation
		if(!GAMEOVER){
			this.loopId = requestAnimationFrame(this.loop)
		}
		

	}


	//method to create the bricks
	//Select number of rows and columns 
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
		let rows = 1;
		let columns = 1;
		this.nodes = []

		// Add background to the game
		this.add(new Background(this));
		//add life
		let life = new Life(this);
		this.add(life);
		//add paddle
		let paddle = new Paddle(this);
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
	// create a level
	level2() {
		let rows = 2;
		let columns = 1;
		this.nodes = []

		// Add background to the game
		this.add(new Background(this));
		//add life
		let life = new Life(this);
		this.add(life);
		//add paddle
		let paddle = new Paddle(this);
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
	// create a level
	level3() {
		let rows = 3;
		let columns = 1;
		this.nodes = []

		// Add background to the game
		this.add(new Background(this));
		//add life
		let life = new Life(this);
		this.add(life);
		//add paddle
		let paddle = new Paddle(this);
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
	var game = new Game(document.getElementById("canvas"));
	game.loop();
}
