const logIfNotEmpty = (xs) => {
  if (xs.length > 0) {
    console.log(xs);
  }
};

const trace =
  (message = "trace ->") =>
  (xs) => {
    if (true) {
      if (false) console.log(message);
      logIfNotEmpty(xs);
      return xs;
    }
  };

(function () {
  "use strict";

  const gameLoop = (state) => () => {
    try {
      Graphics(state);

      return Events()
        .then(Actions(state))
        .then(Movement(state))
        .then(Collision(state))
        .then(filter(isNotNull))
        .then(updateState(state))
        .then(gameLoop)
        .then(requestAnimationFrame);
    } catch (error) {
      console.warn("Error update", state._update);
      console.warn(state);
      console.error(error);
    }
  };

  gameLoop(initialState)();
})();
