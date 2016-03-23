var Player = function () {
	//
	// Attributes
	//

	var x = 290;
	var y = 360;
	var img = new Image();
	img.src = "res/img/player/red.png";
	var gravity = 0.2;
	var xSpeed = 3;
	var ySpeed = 10;
	var xDirection = 0;
	var yDirection = 1;
	var floating = false;
	var allowJump = true;
	var onBubble = false;
	var points = 0;

	//
	// Logic
	//

	this.logic = function (gameScreen, gameState) {
		move();								// Update the position of the player
		checkSides(gameScreen);				// Check if the player hits the sides
		checkFloating(gameScreen, gameState);			// Check if were goning for a ride
		// Check if the player hits the ground
		checkBottom(gameScreen, gameState)	
	}

	var move = function () {
		// X - Component
		x += xSpeed * xDirection;

		// Y - Component
		y += ySpeed * gravity * yDirection;
		

		if (yDirection < 0) {
			ySpeed -= 0.1;
		} else {
			ySpeed += 0.1;
		}
		if (ySpeed <= 0) {
			yDirection = 1;
		}
	}

	var checkBottom = function (gameScreen, gameState) {
		if (!gameState.getFloating() && y >= gameScreen.getHeight()-20) {
			y = gameScreen.getHeight()-20;
			allowJump = true;

		} else if (gameState.getFloating() && y >= gameScreen.getHeight()) {
			gameState.setState("GAMEOVER");		// The player has fallen down into the abyss
			console.log("GAMEOVER");
		}
	}

	var checkSides = function (gameScreen) {
		if (x+20 >= gameScreen.getWidth()) {
			x = gameScreen.getWidth()-20;
		}
		if (x <= 0) {
			x = 0;
		}
	}

	var checkFloating = function (gameScreen, gameState) {
		if (y < (gameScreen.getHeight() / 2)) {
			gameState.setFloating(true);
		}
	}

	// Continue with the jump function!
	this.jump = function (gameState) {
		if (onBubble) {
			allowJump = true;
		} else if (gameState.getFloating()) {
			allowJump = false;
		}

		if(allowJump) {
			ySpeed = 10;
			yDirection = -1;
		}
		allowJump = false;
	}

	//
	//	Setters
	//

	this.setY = function (value) {
		y = value;
	}
	this.setYSpeed = function (value) {
		ySpeed = value;
	}
	this.moveLeft = function () {
		xDirection = -1;
	}
	this.moveRight = function () {
		xDirection = 1;
	}
	this.freeze = function () {
		xDirection = 0;
	}

	this.setJump = function (value) {
		allowJump = value;
	}
	this.setOnBubble = function (value) {
		onBubble = value;
	}
	this.addPoint = function () {
		points += 1;
	}

	//
	// Getters
	//

	this.getX = function () {return x;}
	this.getY = function () {return y;}
	this.getPoints = function () {return points;}

	//
	//	Graphics
	//

	this.graphics = function (context) {
		img.onload = function () {
			context.drawImage(img, x, y);
		}
		context.drawImage(img, x, y);
	}

	//
	// Reset function
	//
	/*
	This method resets the players values to default 
	after a game over
	*/
	this.reset = function () {
		// Reset all the values
		x = 290;
		y = 360;
		gravity = 0.2;
		xSpeed = 3;
		ySpeed = 10;
		xDirection = 0;
		yDirection = 1;
		floating = false;
		allowJump = true;
		onBubble = false;
		points = 0;
	}
}