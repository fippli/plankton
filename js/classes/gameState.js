var GameState = function (highscore) {
	var run 		= true;
	var state 		= "MAIN";
	var floating 	= false;
	var highscore 	= highscore;

	//
	// Getters
	//
	this.getState 	  =	function () {	return state;		}	// String
	this.getFloating  =	function () {	return floating;	}	// Boolean
	this.getRun 	  = function () {	return run;			}	// Boolean
	this.getHighScore = function () {	return highscore;	}	// Integer

	//
	// Setters
	//
	this.setState 	  = function (value) {	state 		= value;	}	// String
	this.setFloating  = function (value) {	floating 	= value;	}	// Boolean
	this.setRun 	  = function (value) {	run 		= value;	}	// Boolean
	this.setHighScore = function (value) {	highscore 	= value;	}	// Integer
	
	/*
	Reset when after gameover
	*/
	this.reset = function () {
		run 		= true;
		state 		= "MAIN";
		floating 	= false;
	}
}