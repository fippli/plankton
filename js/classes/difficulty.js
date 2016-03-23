
var Difficulty = function (player, gameState, gameScreen, bubbles, sunlights) {
	var player = player;
	var gameState = gameState;
	var gameScreen = gameScreen;
	
	var increaseDifficulty = function () {
		switch (player.getPoints()) {
			case 10: {
				/*
				At this difficulty, the bubbles should decrease
				*/
				bubbles.setAmmount(7);
				console.log("Difficulty 1");
				break;
			}
			case 20: {
				/*
				At this difficulty a fish should enter the scene
				*/
				console.log("Difficulty 2");
				break;
			}
			case 50: {
				/*
				At this difficulty the bubbles burst-level should decrease
				*/
				console.log("Difficulty 3");
				break;
			}
			case 100: {
				/*
				Fewer bubbles
				*/
				console.log("Difficulty 4");
				break;
			}
			case 200: {
				/*
				More fish
				*/
				console.log("Difficulty 5");
				break;
			}
			case 500: {
				/*
				Lower burstroof
				*/
				console.log("Difficulty 6");
				break;
			}
			case 1000: {
				/*
				Boss - stage
				*/
				console.log("Difficulty 7");
				break;
			}
		}
	}

	this.logic = function () {
		increaseDifficulty();
	}

	var reset = function () {

	}
}