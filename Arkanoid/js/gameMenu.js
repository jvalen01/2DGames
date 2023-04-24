class GameMenu extends GameObject {

    constructor(canvas) {
		// Init game object
		super(undefined, 0, 0, canvas.width, canvas.height, undefined)
        this.canvas = canvas
		this.ctx = canvas.getContext("2d")

        const startScreen = document.getElementById("startScreen");
		const start = document.getElementById("start");
		const instructions = document.getElementById("instructions");

        var gameMenu = this

    }


    showScreen(){

        // CLICK ON Start BUTTON
			start.addEventListener("click", function () {
				var game = new Game(document.getElementById("canvas"));
	            game.loop();
			})

    }
    





}