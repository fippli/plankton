var Sunlight = function () {
	var x = Math.floor((Math.random() * 600) + 1);
	var y = Math.floor((Math.random() * 400) + 1) - 450;
	var speed = Math.floor((Math.random() * 2) + 1);					// Random between some values
	var img = new Image();
	img.src = "res/img/items/sunlight/sunlight.png";
	var remove = false

	//
	// Logic
	//

	this.move = function () {
		y += speed;
	}

	// Setters

	this.reset = function () {
		y = Math.floor((Math.random() * 400) + 1) - 450;
		x = Math.floor((Math.random() * 600) + 1);
		speed = Math.floor((Math.random() * 2) + 1);
	}

	// Getters
	this.getRemove = function () {
		return remove;
	}

	this.getX = function () {return x;}

	this.getY = function () {return y;}

	//
	// Graphics
	//

	this.draw = function (context) {
		img.onload = function () {
			context.drawImage(img, x, y);
		}
		context.drawImage(img, x, y);
	}
}



var Sunlights = function () {
	var sunlights = [];
	var ammount = 10;					// This is hardcoded so to allocate memory

	for (i = 0; i < ammount; i++) {
		sunlights.push(new Sunlight());
	}

	//
	//	Logic
	//

	this.logic = function (player, gameScreen, gameState) {
		for (var i = 0; i < ammount; i++) {
			if (gameState.getFloating()) {
				sunlights[i].move();
			}
			if (checkIfTaken(player, sunlights[i])) {
				sunlights[i].reset();
				player.addPoint();
			} else if (sunlights[i].getY() > gameScreen.getHeight()) {
				sunlights[i].reset();
			}
		}
	}

	var checkIfTaken = function (player, sunlight) {
		var SX = sunlight.getX();
		var SY = sunlight.getY();
		var PX = player.getX();
		var PY = player.getY();
		
		if (PX < (SX+7) && (PX+20) > SX) {
			if ((PY+20) >= SY && (PY) <= (SY+7)) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	//
	//	Graphics
	//

	this.graphics = function (context) {
		for (var i = 0; i < ammount; i++) {
			sunlights[i].draw(context);
		}
	}

	this.reset = function () {
		for (i in sunlights) {
			sunlights[i].reset();
		}
	}
}