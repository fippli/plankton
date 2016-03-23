var BackgroundNode = function (path, spd) {
	var img = new Image();
	img.src = path;
	var y = 0;
	var speed = spd;

	this.getImg = function () {
		return img;
	}

	this.move = function (floating) {
		if (floating) {
			y += speed;
		}
	}

	this.getY = function () {
		return y;
	}

	this.setY = function (value) {
		y = value;
	}
}

var Background = function (screenHeight, screenWidth) {

	// Enter name
	

	// Main Stage
	var bg1  = new BackgroundNode("res/img/bg/seabottom.png", 0.05);
	var bg21 = new BackgroundNode("res/img/bg/cliff1.png",    0.3 );
	var bg22 = new BackgroundNode("res/img/bg/cliff1.png",    0.3 );
	var bg31 = new BackgroundNode("res/img/bg/cliff2.png",    0.7 );
	var bg32 = new BackgroundNode("res/img/bg/cliff2.png",    0.7 );
	var bg4  = new BackgroundNode("res/img/bg/seaweed.png",   1.5 );

	// Game Over

	//
	// LOGIC
	//

	bg22.setY(0-screenHeight);
	bg32.setY(0-screenHeight);

	this.logic = function (gameState) {
		var state = gameState.getState();
		var floating = gameState.getFloating();
		switch (state) {
			case "MAIN":
				bg1.move(floating);
				bg21.move(floating);
				bg22.move(floating);
				bg31.move(floating);
				bg32.move(floating);
				bg4.move(floating);

				updateBackground(bg21);
				updateBackground(bg22);
				updateBackground(bg31);
				updateBackground(bg32);
			case "GAMEOVER":
				// Nothing happens here so far
				break;
		}		
	}

	var updateBackground = function (bg) {
		if (bg.getY() >= screenHeight) {
			bg.setY(1-screenHeight);
		}
	}

	//
	//	GRAPHIC
	//

	this.graphics = function (gameScreen, gameState, player) {
		switch (gameState.getState()) {
			case "MAIN":
				mainStage(gameScreen);
				drawPoints(gameScreen, player);
				break;
			case "GAMEOVER":
				gameoverStage(gameScreen, player, gameState);
				break;
		}
	}

	var mainStage = function (gameScreen) {
		ctx = gameScreen.context();
		ctx.fillStyle = "#3921A5";
		ctx.rect(0,0,600,400);
		ctx.fill();
		
		bg1.getImg().onload = function () {
			ctx.drawImage(bg1.getImg(), 0, bg1.getY(), screenWidth, screenHeight);
		}
		bg21.getImg().onload = function () {
			ctx.drawImage(bg21.getImg(), 0, bg21.getY(), screenWidth, screenHeight);
		}
		bg22.getImg().onload = function () {
			ctx.drawImage(bg22.getImg(), 0, bg22.getY(), screenWidth, screenHeight);
		}
		bg31.getImg().onload = function () {
			ctx.drawImage(bg31.getImg(), 0, bg31.getY(), screenWidth, screenHeight);
		}
		bg32.getImg().onload = function () {
			ctx.drawImage(bg32.getImg(), 0, bg32.getY(), screenWidth, screenHeight);
		}
		bg4.getImg().onload = function () {
			ctx.drawImage(bg4.getImg(), 0, bg4.getY(), screenWidth, screenHeight);
		}
		
		// Draw again after load...
		ctx.drawImage(bg1.getImg(),  0, bg1.getY(),  screenWidth, screenHeight);
		ctx.drawImage(bg21.getImg(), 0, bg21.getY(), screenWidth, screenHeight);
		ctx.drawImage(bg22.getImg(), 0, bg22.getY(), screenWidth, screenHeight);
		ctx.drawImage(bg31.getImg(), 0, bg31.getY(), screenWidth, screenHeight);
		ctx.drawImage(bg32.getImg(), 0, bg32.getY(), screenWidth, screenHeight);
		ctx.drawImage(bg4.getImg(),  0, bg4.getY(),  screenWidth, screenHeight);
	}

	var gameoverStage = function (gameScreen, player, gameState) {
		points = player.getPoints();
		points = points.toString();
		ctx = gameScreen.context();
		ctx.fillStyle = "#000000";
		ctx.rect(0,0,600,400);
		ctx.fill();
		ctx.font = "70px gamefont";
		ctx.fillStyle = '#ffffff';
		ctx.fillText("Game Over", 10, 100);
		ctx.font = "50px gamefont";
		ctx.fillText("Your Score: " + points, 20, 200);
		ctx.fillText("High Score: " + gameState.getHighScore(), 20, 300);
	}

	var drawPoints = function (gameScreen, player) {
		points = player.getPoints();
		points = points.toString();
		ctx = gameScreen.context();
		ctx.font = "20px gamefont";
		ctx.fillStyle = '#ffffff';
		ctx.fillText(points, 550, 30);
	}

	this.reset = function () {
		bg1.setY(0);
		bg4.setY(0);
	}
}