import { Background } from "./core/background/index.js";
import { Bubbles } from "./core/bubbles/index.js";
import { Canvas } from "./core/Canvas.js";
import { trace } from "./core/functional.js";
import { GameLoop } from "./core/GameLoop.js";
import { inputEvents } from "./core/inputEvents.js";
import { Player } from "./core/player/index.js";
import { stateChain } from "./core/stateChain.js";
import { Debug } from "./debug/Debug.js";
import { render } from "./render.js";
import { createState } from "./state/createState.js";

const gameLogic = (state, _) =>
  stateChain(
    state,
    inputEvents,

    Player.platformCollision,

    Player.jump,
    Background.move,
    Background.loop,

    Bubbles.move,
    Bubbles.loop,
    Bubbles.burst,

    Player.moveLeft,
    Player.moveRight,
    Player.gravity,

    Bubbles.reset,
    Debug.when((state) => false)
  );

const addDefaults = (state) => ({ ...state, defaults: state });
const game = GameLoop(gameLogic, render);

createState(Canvas()).then(trace).then(addDefaults).then(game);
