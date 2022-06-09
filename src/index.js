import { Canvas } from "./core/Canvas.js";
import { trace } from "./core/functional.js";
import { GameLoop } from "./core/GameLoop.js";
import { inputEvents } from "./core/inputEvents.js";
import {
  playerGravity,
  playerGroundCollision,
  playerJump,
} from "./core/movement/player.js";
import { stateChain } from "./core/stateChain.js";
import { clearStack, Debug, pushStack } from "./debug/Debug.js";
import { throwWhen } from "./debug/throwWhen.js";
import { render } from "./render.js";
import { createState } from "./state/createState.js";

// (function () {
//   "use strict";

//   const gameLoop = (state) => () => {
//     try {
//       const nextState = stateChain(state, (state) => state);
//       const {} = nextState;
//       const renderObjects = [];
//       renderObjects.forEach(drawObject(context));

//       return nextState;

//       // Graphics(state);

//       // return Events()
//       //   .then(Actions(state))
//       //   .then(Movement(state))
//       //   .then(Collision(state))
//       //   .then(filter(isNotNull))
//       //   .then(updateState(state))
//       //   .then(gameLoop)
//       //   .then(requestAnimationFrame);
//     } catch (error) {
//       console.warn("Error update", state._update);
//       console.warn(state);
//       console.error(error);
//     }
//   };

//   gameLoop(initialState)();
// })();

const gameLogic = (state, _) =>
  stateChain(
    state,
    inputEvents,
    playerGravity,
    playerGroundCollision,
    playerJump,
    Debug.when((state) => false)
  );

const addDefaults = (state) => ({ ...state, defaults: state });
const game = GameLoop(gameLogic, render);

createState(Canvas()).then(addDefaults).then(game);
