var GameScreen = function () {
	// Set up the game canvas
	var gameScreen = document.getElementById('game-screen');	// Get the canvas
	var ctx = gameScreen.getContext('2d');						// Get the context
	var screenWidth = 600;										// Set the width of the screen
	var screenHeight = 400;										// Set the height of the screen

	//
	// Getters
	//

	this.getHeight = function () {return screenHeight;	}		// Get the height of the canvas
	this.getWidth  = function () {return screenWidth;	}		// Get the width of the canvas
	this.context   = function () {return ctx;			}		// Get the context

}