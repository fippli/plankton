/*
 * This is the main plankton file
 * Info below:
 */
var plankton = function (highscore) {
	console.log("Running plankton");
	var playerInput = new PlayerInput();				// Get the user interaction
	var gameState = new GameState(highscore);			// Class to handle which state the game is in
	var gameScreen = new GameScreen();					// Get the HMTL5 canvas
	var background = new Background(gameScreen.getHeight(), gameScreen.getWidth());					// Get the background object
	var player = new Player();							// Player object
	var bubbles = new Bubbles();						// Bubbles object
	var sunlights = new Sunlights();					// Sunlights object
	var gameSound = new GameSound();					// Get the game sounds
														// Get enemies
	var difficulty = new Difficulty(player, gameState, gameScreen, bubbles, sunlights);	// Set the difficulty

	// The game loop:
	var gameLoop = function () {

		//
		// LOGIC
		//

		playerInput.getInput(player, gameState);					// Get if the key is pressed

		switch (gameState.getState()) {
			case "MAIN":
				background.logic(gameState);						// Execute background logic
				player.logic(gameScreen, gameState);				// Execute player logic
				bubbles.logic(player);								// Execute bubbles logic
				sunlights.logic(player, gameScreen, gameState);		// Execute sunlights logic

				// LEVEL UP
				difficulty.logic();
				
				break;
			case "GAMEOVER":
				// Nothing happens here so far ;)
				break;
		}

		//
		// GRAPHIC
		//

		switch (gameState.getState()) {
			case "MAIN":
				background.graphics(gameScreen, gameState, player);	// Animate background
				player.graphics(gameScreen.context());				// Animate player
				bubbles.graphics(gameScreen.context());				// Animate bubbles
				sunlights.graphics(gameScreen.context());			// Animate sunlights
				break;
			case "GAMEOVER":
				background.graphics(gameScreen, gameState, player);	// Switch to gameover screen
				gameSound.stopGameSound();							// Stop the gamesound
				break;
		}

		//
		//	Go for the next loop
		//
		if (gameState.getRun() === true) {
			requestAnimationFrame(gameLoop);			// Request to do this again ASAP
		} else {
			// Push the score to server


			//
			// RESET GAME
			//
			console.log("RESETTING");
			background.reset();							// Reset background values
			player.reset();								// Reset player values
			gameState.reset();							// Reset game state values
			bubbles.reset();							// Reset the bubbles
			sunlights.reset();							// Reset the sunlight values
			gameSound.reset();							// Reset the gamesound
			
			// Loop the game again
			requestAnimationFrame(gameLoop);			// Request to do this again ASAP
		}
		
	}

	gameLoop();

	// Get the score
	this.getScore = function () {
		return player.getPoints();
	}

	// Set the score
	this.setHighScore = function (value) {
		gameState.setHighScore(value);
	}
}

plankton(0);
