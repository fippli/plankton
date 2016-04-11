var GameSound = function () {
	var snd = new Audio("res/snd/music.wav"); // buffers automatically when created
	
	snd.addEventListener('ended', function () {
		this.currentTime = 0;
    	this.play();
	}, false);
	
	

	this.startGameSound = function () {
		snd.play();
	}

	this.stopGameSound = function () {
		snd.pause();
	} 

	//
	// Reset method
	//
	/*
	This method resets the game sound after a game over
	*/
	this.reset = function () {
		this.stopGameSound();
		snd.currentTime = 0;
		this.startGameSound();
	}

	this.startGameSound();
}