(function () {
  'use strict';

  (function () {

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

})();
