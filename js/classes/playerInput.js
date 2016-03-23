
var PlayerInput = function () {
	//alert("Player Input");
	this.getInput = function(player, gameState) {
		window.onkeydown = function(event) {
			var key = event.keyCode ? event.keyCode : event.which;
			//alert(key);

			switch (key) {
				case 13:
					// Enter
					if (gameState.getState() === "GAMEOVER") {
						gameState.setRun(false);
					}
					break;
				case 37:
					// Left
					player.moveLeft();
					break;
				case 38:
					// Up
					player.jump(gameState);
					break;
				case 39:
					// Right
					player.moveRight();
					break;
				case 40:
					// Down
					break;
				case 71:
					// G
					gameState.setState("GAMEOVER");

			}

		}

		window.onkeyup = function(event) {
			var key = event.keyCode ? event.keyCode : event.which;

			if (key === 37) {
					/* left */
					player.freeze();
				}
				if (key === 38) {
					/* up */
				}
				if (key === 39) {
					/* right */
					player.freeze();
				}
				if (key === 40) {
					/* down */
				}
		}
	}
}