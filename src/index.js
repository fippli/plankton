import { initialState } from "./state/initialState.js";

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

const GameLoop = (function () {
  "use strict";

  const clearCanvas = (context, canvas) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const loop = (gameLogic, state) => (timestamp) => {
    try {
      const { canvas, context } = state;
      clearCanvas(context, canvas);
    } catch (error) {
      console.log(context, canvas);
      throw new Error("Game loop requires canvas dimensions and context");
    }

    const nextState = gameLogic(state, timestamp);

    window.requestAnimationFrame(loop(gameLogic, nextState));
  };

  return (gameLogic) => (initialState) => {
    const gameLoop = loop(gameLogic, initialState);
    window.requestAnimationFrame(gameLoop);
  };
})();

const stateChain = (state, ...functions) => {
  if (functions.length === 0) {
    return state;
  }

  const [nextFunction, ...rest] = functions;

  const nextState = nextFunction(state);
  return stateChain(nextState, ...rest);
};

(function () {
  "use strict";

  const gameLoop = (state) => () => {
    try {
      const nextState = stateChain(state, (state) => state);
      const {} = nextState;
      const renderObjects = [];
      renderObjects.forEach(drawObject(context));

      return nextState;

      // Graphics(state);

      // return Events()
      //   .then(Actions(state))
      //   .then(Movement(state))
      //   .then(Collision(state))
      //   .then(filter(isNotNull))
      //   .then(updateState(state))
      //   .then(gameLoop)
      //   .then(requestAnimationFrame);
    } catch (error) {
      console.warn("Error update", state._update);
      console.warn(state);
      console.error(error);
    }
  };

  gameLoop(initialState)();
})();
