var Bubble = function () {
	var img = new Image();												// The image of the bubble
	img.src = "res/img/items/bubbles/bubble.png";
	var speed = Math.floor((Math.random() * 2) + 1);					// Random between some values
	var x = Math.floor((Math.random() * 600) + 1);						// Random depending on the screen size
	var y = Math.floor((Math.random() * 400) + 410);					// Random depending on the screen size
	var timeout = 5;
	var burstRoof = 50;

	// The burst level should depend on the screen size
	var burstLevel = Math.floor((Math.random() * 100) + 1) + burstRoof;	// Set the level that the bubble should burst
	var remove = false;													// Set if the bubble should be displayed on the screen

	//
	// Logic
	//

	this.move = function () {
		y -= speed;
	}

	/*
	Reset the bubble when it bursts so that it can be reused
	*/
	this.reset = function () {
		y = Math.floor((Math.random() * 400) + 410);				// Pos y
		x = Math.floor((Math.random() * 600) + 1);					// Pos x
		speed = Math.floor((Math.random() * 2) + 1);				// Speed
		burstLevel = Math.floor((Math.random() * 100) + 50);		// Burstlevel
		setImg('bubble');											// Reset the image
		remove = false;												// Set remove to false
	}

	// Getters
	this.getBurst = function () {
		if (y < burstLevel) {
			setImg('burst');
			timeout -= 1;
			if (!timeout) {
				remove = true;
				timeout = 5;
			}
		}
	}

	this.getRemove = function () {
		return remove;
	}

	this.getX = function () {return x;}

	this.getY = function () {return y;}

	//
	// Setters
	//

	this.setBurstRoof = function (value) {
		burstRoof = value;
	}

	//
	// Graphics
	//

	var setImg = function (animation) {
		switch (animation) {
			case 'burst':
				img.src = "res/img/items/bubbles/burst.png";
				break;
			case 'bubble':
				img.src = "res/img/items/bubbles/bubble.png";
				break;
		}
	}

	this.draw = function (context) {
		img.onload = function () {
			context.drawImage(img, x, y);
		}
		context.drawImage(img, x, y);
	}
}

var Bubbles = function () {
	var bubbles = [];	// List with bubble objects
	var ammount = 10;	// Maximum ammuont of bubbles (This is hardcoded to allocate memory)
	
	// Initialize the bubbles
	for (i = 0; i < ammount; i++) {
		bubbles.push(new Bubble());
	}
	
	//
	// Logic
	//

	this.logic = function (player) {
		for (var i = 0; i < ammount; i++) {
			bubbles[i].getBurst();
			bubbles[i].move();
			checkRider(player, bubbles[i]);
			if (bubbles[i].getRemove()) {
				bubbles[i].reset();
			}
		}
	}

	var checkRider = function (player, bubble) {
		var BX = bubble.getX();
		var BY = bubble.getY();
		var PX = player.getX();
		var PY = player.getY();
		
		if (PX < (BX+20) && (PX+20) > BX) {
			if ((PY+20) >= BY && (PY+20) <= BY+5) {
				player.setY(BY-20);
				player.setYSpeed(0);
				player.setOnBubble(true);
			} else {
				player.setOnBubble(false);
			}
		}
	}

	this.setAmmount = function (value) {
		ammount = value;
	}

	this.decreaseBurstRoof = function () {
		for (i in bubbles) {
			bubbles[i].setBurstRoof("Some value (not a string)")
		}
	}

	//
	// Graphics
	//
	
	this.graphics = function (context) {
		for (var i = 0; i < ammount; i++) {
			bubbles[i].draw(context);
		}
	}

	this.reset = function () {
		for (i in bubbles) {
			bubbles[i].reset();
		}
		ammount = 10;
	}

}