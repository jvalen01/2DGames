class Game extends GameObject {
	constructor(canvas) {
		// Init game object
		super(undefined, 0, 0, canvas.width, canvas.height, undefined)

		this.canvas = canvas
		this.ctx = canvas.getContext("2d")

		//Keep track of level and score with counters:
		this.levelCount = 0;
		this.scoreCount= 0;

		//Keep track of health
		this.health = 3;

		this.bricks = [];
		let GAME_OVER = false;

		this.keys = []
		this.time = Date.now()

		var game = this

		this.loop = function() {
			game.onloop(GAME_OVER)
			
		}

		const startButton = document.getElementById("start");
		startButton.addEventListener("click", () => this.startGame());

		const instructionButton = document.getElementById("instructions");
		instructionButton.addEventListener("click", () => this.showInstructions());


		window.addEventListener("keydown", function(event) {
			game.keys[event.keyCode] = true
		})

		window.addEventListener("keyup", function(event) {
			game.keys[event.keyCode] = false
		})

			
	}

	showMenu() {
		const menu = document.getElementById("menu");
		menu.style.display = "block";

		const instructions = document.getElementById("instructionscreen");
		instructions.style.display = "none";

	  }
	
	showInstructions(){
		const menu = document.getElementById("menu");
		menu.style.display = "none";

		const instructions = document.getElementById("instructionscreen");
		instructions.style.display = "block";

		const backButton = document.getElementById("back");
		backButton.addEventListener("click", () => this.showMenu());
	}

	startGame() {
		// Initialize the game
		this.level1();
	  
		// Hide the menu
		const menu = document.getElementById("menu");
		menu.style.display = "none";
	  
		// Start the game loop
		// Loop callback
		this.loop();

		
	  }


	onloop(GAME_OVER) {

		const gameover = document.getElementById("gameover");
		const youwin = document.getElementById("youwin");
		const youlose = document.getElementById("youlose");
		const restart = document.getElementById("restart");
		

		//Check if the player lost the game
		if(this.health == 0){
			//end game if health is 0
			GAME_OVER = true;
			
			gameover.style.display = "block";
    		youlose.style.display = "block";

			// CLICK ON PLAY AGAIN BUTTON
			restart.addEventListener("click", function () {
				location.reload(); // reload the page
			})

		}

		// Checks for if the player destroyed all bricks and can move on to next level.
		if(this.levelCount == 0 && this.scoreCount == 5){
			
			//Update level and score
			this.levelCount++;
			this.scoreCount = 0;
			this.level2();

		}
		if(this.levelCount == 1 && this.scoreCount == 10){

			//Update level and score
			this.levelCount++;
			this.scoreCount = 0;
			this.level3();
		}

		//If completed last level, you win.
		if(this.levelCount == 2 && this.scoreCount == 15){

			GAME_OVER = true;

			WIN.play();
			gameover.style.display = "block";
    		youwin.style.display = "block";

			// CLICK ON PLAY AGAIN BUTTON
			restart.addEventListener("click", function () {
				location.reload(); // reload the page
			})
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
		if(!GAME_OVER){
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
		let columns = 5;
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
		let ball = new Ball(this, paddle, life, 4);
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
		let columns = 5;
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
		let ball = new Ball(this, paddle, life, 5);
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
		let columns = 5;
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
		let ball = new Ball(this, paddle, life, 6);
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
	game.showMenu();
}
