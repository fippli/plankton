(function () {
  'use strict';

  const elementId = "canvas";

  const Canvas = () => {
    const arcadeWrapper = document.getElementById("root");
    const canvas = document.createElement("canvas");

    canvas.id = elementId;
    canvas.height = arcadeWrapper.offsetHeight;
    canvas.width = canvas.height * (16 / 9);
    canvas.className = elementId;
    arcadeWrapper.appendChild(canvas);

    return {
      context: canvas.getContext("2d"),
      canvas: { width: canvas.width, height: canvas.height },
    };
  };

  const clearCanvas = (context, canvas) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const loop = (gameLogic, render, state) => (timestamp) => {
    try {
      const { canvas, context } = state;
      clearCanvas(context, canvas);
    } catch (error) {
      console.log(context, canvas);
      throw new Error("Game loop requires canvas dimensions and context");
    }
    const nextState = gameLogic(state, timestamp);
    render(nextState);
    requestAnimationFrame(loop(gameLogic, render, nextState));
  };

  const GameLoop = (gameLogic, render) => (initialState) => {
    const gameLoop = loop(gameLogic, render, initialState);
    requestAnimationFrame(gameLoop);
  };

  const ENTER = "ENTER";
  const LEFT = "LEFT";
  const RIGHT = "RIGHT";
  const UP = "UP";
  const DOWN = "DOWN";
  const G = "G";

  const keymap = {
    13: ENTER,
    37: LEFT,
    38: UP,
    39: RIGHT,
    40: DOWN,
    71: G,
  };

  const getKey = (event) => (event.keyCode ? event.keyCode : event.which);

  const inputEvents = (function () {

    let events = [];

    const add = (userEvent) => {
      events = [...events, userEvent];
    };

    const press = (event) => `PRESS_${keymap[getKey(event)]}`;
    const release = (event) => `RELEASE_${keymap[getKey(event)]}`;
    const remove = (match) => {
      events = events.filter((event) => event !== match);
    };

    window.onkeydown = (event) => {
      console.log(press(event));
      remove(release(event));
      add(press(event));
    };

    window.onkeyup = (event) => {
      console.log(release(event));
      remove(press(event));
      add(release(event));
    };

    return (state) => ({
      ...state,
      events,
    });
  })();

  const PRESS_UP = "PRESS_UP";

  const updateState = (state) => (update) =>
    Object.keys(update).reduce((nextState, key) => {
      return {
        ...nextState,
        [key]: {
          ...nextState[key],
          ...update[key],
        },
      };
    }, state);

  const playerGravity = (state) => {
    const {
      player: { y, speed, gravity, jumping },
    } = state;

    const updateWith = updateState(state);

    if (!jumping) {
      return updateWith({ player: { y: y + speed.y * gravity } });
    }

    return state;
  };

  const playerGroundCollision = (state) => {
    const {
      player: { y, height },
      eternalVoid,
      canvas,
      defaults,
    } = state;

    const updateWith = updateState(state);

    if (!eternalVoid && y + height > canvas.height) {
      return updateWith({
        player: {
          onGround: true,
          y: defaults.player.y,
        },
      });
    }

    return state;
  };

  const playerJump = (state) => {
    const { player, events } = state;

    const updateWith = updateState(state);

    if (player.jumping) {
      const y = player.y + player.speed.y * player.gravity * player.direction.y;
      const directionY = player.speed.y <= 0 ? 1 : player.direction.y;
      const speedY = directionY < 0 ? player.speed.y - 0.1 : player.speed.y + 0.1;

      return updateWith({
        player: {
          y,
          speed: { ...player.speed, y: speedY },
          direction: { ...player.direction, y: directionY },
        },
      });
    }

    if (events.includes(PRESS_UP)) {
      return updateWith({
        player: {
          jumping: player.allowJump ? true : player.jumping,
          allowJump: false,
        },
        eternalVoid: true,
        animateBackground: true,
      });
    }

    return state;
  };

  let stack = [];

  const push = (caller) => (state) => {
    stack = [...stack, { caller, state }];
    return state;
  };
  const clear = (state) => {
    stack = [];
    return state;
  };

  const throwWhen = (fn) => (state) => {
    if (fn(state) === true) {
      console.warn(stack);
      console.error(state);
      throw new Error(`Something is up!`);
    }

    return state;
  };

  const Debug = {
    push,
    clear,
    when: throwWhen,
  };

  const stateChain = (state, ...functions) => {
    if (functions.length === 0) {
      Debug.clear(state);
      return state;
    }

    const [nextFunction, ...rest] = functions;

    const nextState = nextFunction(state);
    Debug.push(nextFunction.name)(nextState);
    return stateChain(nextState, ...rest);
  };

  const drawObject =
    (context) =>
    ({ image, x, y, width, height }) => {
      try {
        context.drawImage(image, x, y, width, height);
      } catch (error) {
        console.log(image, x, y, width, height);
      }
    };

  const render = (state) => {
    const {
      context,
      background,
      seabottom,
      seaweed,
      cliff1_0,
      cliff1_1,
      cliff2_0,
      cliff2_1,
      player,
      bubbles,
    } = state;

    const renderObjects = [
      background,
      seabottom,
      cliff1_0,
      cliff1_1,
      cliff2_0,
      cliff2_1,
      seaweed,
      // ...bubbles,
      player,
    ];

    renderObjects.forEach(drawObject(context));
  };

  const loadImage = (imageUrl) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        resolve(image);
      };

      image.onerror = () => {
        const loadError = new Error(
          `Failed to load image: \n${imageUrl} \nDo you have a typo in you image url?`
        );
        reject(loadError);
      };

      image.src = imageUrl;
    });

  const createState = async (config) => {
    const backgroundImage = await loadImage("images/backgrounds/background.png");
    const seaBottomImage = await loadImage("images/backgrounds/seabottom2.png");
    const cliff1Image = await loadImage("images/backgrounds/cliff1.png");
    const cliff2Image = await loadImage("images/backgrounds/cliff2.png");
    const seaweedImage = await loadImage("images/backgrounds/seaweed.png");
    const playerImage = await loadImage("images/player/red.png");
    const bubbleImage = await loadImage("images/bubbles/bubble.png");

    return Object.freeze({
      _update: 0,
      background: {
        image: backgroundImage,
        y: 0,
        x: 0,
        speed: { x: 0, y: 0 },
        direction: { x: 0, y: 1 },
        width: config.canvas.width,
        height: config.canvas.height,
      },
      seabottom: {
        image: seaBottomImage,
        y: 0,
        x: 0,
        speed: { x: 0, y: 0.05 },
        direction: { x: 0, y: 1 },
        width: config.canvas.width,
        height: config.canvas.height,
      },
      cliff1_0: {
        image: cliff1Image,
        y: 0,
        x: 0,
        speed: { x: 0, y: 0.3 },
        direction: { x: 0, y: 1 },
        width: config.canvas.width,
        height: config.canvas.height,
      },
      cliff1_1: {
        image: cliff1Image,
        y: -config.canvas.height,
        x: 0,
        speed: { x: 0, y: 0.3 },
        direction: { x: 0, y: 1 },
        width: config.canvas.width,
        height: config.canvas.height,
      },
      cliff2_0: {
        image: cliff2Image,
        y: 0,
        x: 0,
        speed: { x: 0, y: 0.7 },
        direction: { x: 0, y: 1 },
        width: config.canvas.width,
        height: config.canvas.height,
      },
      cliff2_1: {
        image: cliff2Image,
        y: -config.canvas.height,
        x: 0,
        speed: { x: 0, y: 0.7 },
        direction: { x: 0, y: 1 },
        width: config.canvas.width,
        height: config.canvas.height,
      },
      seaweed: {
        image: seaweedImage,
        y: 0,
        x: 0,
        speed: { x: 0, y: 1.5 },
        direction: { x: 0, y: 1 },
        width: config.canvas.width,
        height: config.canvas.height,
      },
      player: {
        image: playerImage,
        speed: { x: 2, y: 10 },
        direction: { x: 1, y: 1 },
        x: (config.canvas.width - 20) / 2,
        y:
          config.canvas.height -
          (playerImage.height * config.canvas.width) / backgroundImage.width,
        width: (playerImage.width * config.canvas.width) / backgroundImage.width,
        height:
          (playerImage.height * config.canvas.width) / backgroundImage.width,
        jumping: false,
        allowJump: true,
        gravity: 0.2,
      },

      bubbles: [
        {
          x: (config.canvas.width - 20) / 5 - config.canvas.width / 5 / 2,
          y: config.canvas.height,
          speed: { x: 0, y: 2 },
          direction: { x: 0, y: -1 },
          image: bubbleImage,
          burstLevel: 100,
          width: 20,
          height: 20,
        },
        {
          x: (config.canvas.width - 20) / (5 / 2) - config.canvas.width / 5 / 2,
          y: config.canvas.height,
          speed: { x: 0, y: 2 },
          direction: { x: 0, y: -1 },
          image: bubbleImage,
          burstLevel: 100,
          width: 20,
          height: 20,
        },
        {
          x: (config.canvas.width - 20) / (5 / 3) - config.canvas.width / 5 / 2,
          y: config.canvas.height,
          speed: { x: 0, y: 2 },
          direction: { x: 0, y: -1 },
          image: bubbleImage,
          burstLevel: 100,
          width: 20,
          height: 20,
        },
        {
          x: (config.canvas.width - 20) / (5 / 4) - config.canvas.width / 5 / 2,
          y: config.canvas.height,
          speed: { x: 0, y: 2 },
          direction: { x: 0, y: -1 },
          image: bubbleImage,
          burstLevel: 100,
          width: 20,
          height: 20,
        },
        {
          x: config.canvas.width - 20 - config.canvas.width / 5 / 2,
          y: config.canvas.height,
          speed: { x: 0, y: 2 },
          direction: { x: 0, y: -1 },
          image: bubbleImage,
          burstLevel: 100,
          width: 20,
          height: 20,
        },
      ],

      eternalVoid: false,
      animateBackground: false,
      gravity: 0.2,
      ...config,
    });
  };

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
      Debug.when((state) => state.player.jumping === undefined)
    );

  const addDefaults = (state) => ({ ...state, defaults: state });
  const game = GameLoop(gameLogic, render);

  createState(Canvas()).then(addDefaults).then(game);

})();
