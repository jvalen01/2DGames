# Arkanoid game

### Rules
Simple interactive game that includes text, picture, sound and controlled by keyboard. 

### Basic goals and functioning of the game:
- Should be 3 different levels. 
- Hit every bar to progress to next level. 
- You win if you complete all levels.
- You lose if the ball hit the ground more than 3 times (lives). 
- Have to implement collision logic with bars, paddle and walls.

### Description of game controls:
- Use keyboard right and left arrow to move the paddle. 

### Design of all game screens and menus:
- Three different levels with different amount of bricks.
- Game over screen.
- Start game screen?
- Instruction screen?

### OOP description of objects in the game (classes, their attributes and methods):
gameModel class:
- Manages the data of the application.
- Creates the ball and paddle. 

gameView class:
- Manages the user interface of the application.
- Is a visual representation of the model.
- Respnosible for drawing the ball, paddle and bricks.
- Also responsible for drawing the score and lives.
- And updating the screen.

gameController class:
- Links the model and the view.
- Responsible for the game logic (collsision detection, updating the game state, etc).
### MVC pattern:

In this case the model represents the game state, such as the position of the ball, 
the position of the paddle, and the score

The view in this case represents the visual elements of the game, such as the canvas and the graphics.

The controller in this case represents the user input and the game logic, such as collision detection and updating the game state.






