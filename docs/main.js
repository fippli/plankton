(function () {
  'use strict';

  const modifyObject = (object) => (update) =>
    Object.keys(update).reduce((next, key) => {
      if (typeof object[key] !== "object" || Array.isArray(object[key])) {
        return Object.assign(next, {
          [key]: update[key],
        });
      }

      return Object.assign(next, {
        [key]: Object.assign(next[key], update[key]),
      });
    }, object);

  const move = (key) => (movable) => ({
    ...movable,
    [key]: movable[key] + movable.speed[key] * movable.direction[key],
  });

  const moveHorizonal = move("x");
  const moveVertical = move("y");

  const UP$1 = "UP";
  const DOWN$1 = "DOWN";
  const LEFT$1 = "LEFT";
  const RIGHT$1 = "RIGHT";

  const shouldLoop = (direction) => (loopable) => {
    switch (direction) {
      case UP$1: {
        return moveVertical(loopable).y <= loopable.loop.stop.y;
      }

      case DOWN$1: {
        return moveVertical(loopable).y >= loopable.loop.stop.y;
      }

      case RIGHT$1: {
        return moveHorizonal(loopable).x >= loopable.loop.stop.x;
      }

      case LEFT$1: {
        return moveHorizonal(loopable).x <= loopable.loop.stop.x;
      }
    }
  };

  const loop$1 = (direction) => (loopable) => {
    const updateWith = modifyObject(loopable);
    if (shouldLoop(direction)(loopable)) {
      switch (direction) {
        case UP$1: {
          return updateWith({ y: loopable.loop.start.y });
        }

        case DOWN$1: {
          return updateWith({ y: loopable.loop.start.y });
        }

        case RIGHT$1: {
          return updateWith({ x: loopable.loop.start.x });
        }

        case LEFT$1: {
          return updateWith({ x: loopable.loop.start.x });
        }
      }
    }

    return loopable;
  };

  const loopDown = loop$1(DOWN$1);
  const loopUp = loop$1(UP$1);

  const updateState = modifyObject;

  const loopBackgrounds = (state) => {
    const { cliff1_0, cliff1_1, cliff2_0, cliff2_1 } = state;

    const updateWith = updateState(state);

    if (state.animateBackground) {
      return updateWith({
        cliff1_0: loopDown(cliff1_0),
        cliff1_1: loopDown(cliff1_1),
        cliff2_0: loopDown(cliff2_0),
        cliff2_1: loopDown(cliff2_1),
      });
    }

    return state;
  };

  const moveBackgrounds = (state) => {
    const { seaweed, seabottom, cliff1_0, cliff1_1, cliff2_0, cliff2_1 } = state;

    const updateWith = updateState(state);

    if (state.animateBackground) {
      return updateWith({
        seaweed: moveVertical(seaweed),
        seabottom: moveVertical(seabottom),
        cliff1_0: moveVertical(cliff1_0),
        cliff1_1: moveVertical(cliff1_1),
        cliff2_0: moveVertical(cliff2_0),
        cliff2_1: moveVertical(cliff2_1),
      });
    }

    return state;
  };

  const Background = {
    move: moveBackgrounds,
    loop: loopBackgrounds,
  };

  const burst = (bubble) => {
    if (bubble.y <= bubble.loop.stop.y + bubble.height / 2) {
      return modifyObject(bubble)({
        renderImage: "burstImage",
      });
    }

    return bubble;
  };

  const burstBubble = (state) => {
    const { bubbles } = state;

    const updateWith = updateState(state);

    return updateWith({
      bubbles: bubbles.map(burst),
    });
  };

  const between =
    ({ x: ax, width: aw }) =>
    ({ x: bx, width: bw }) =>
      ax < bx + bw && ax + aw > bx;

  const onTop =
    ({ y: ay, height: ah }) =>
    ({ y: by, height: bh, hitbox }) =>
      ay + ah - hitbox <= by && ay + ah + hitbox > by;

  const trace = (x) => {
    console.log(x);
    return x;
  };

  const range = (number) => [...Array(number).keys()];

  const lanePosition = ({ image, width, numberOfLanes, laneNumber }) =>
    (width - image.width) / (numberOfLanes / laneNumber) -
    width / numberOfLanes / 2;

  const createBubble = ({
    image,
    burstImage,
    backgroundImage,
    canvas,
    lane,
    numberOfLanes,
  }) => ({
    image,
    burstImage,
    renderImage: "image",

    x: lanePosition({
      image,
      width: canvas.width,
      numberOfLanes,
      laneNumber: lane,
    }),
    y:
      canvas.height +
      ((lane * (image.height * canvas.width)) / backgroundImage.width) * 2,

    width: (image.width * canvas.width) / backgroundImage.width,
    height: (image.height * canvas.width) / backgroundImage.width,

    speed: {
      x: 0,
      y: canvas.height / (100 * lane),
    },

    direction: {
      x: 0,
      y: -1,
    },

    loop: {
      start: {
        x: lanePosition({
          image,
          width: canvas.width,
          numberOfLanes,
          laneNumber: lane,
        }),
        y: canvas.height,
      },
      stop: {
        x: 0,
        y: canvas.height / 3,
      },
    },

    burstLevel: canvas.height / 3,
    isActive: true,
  });

  const createBubbles = ({
    image,
    burstImage,
    canvas,
    backgroundImage,
    amount,
  }) =>
    range(amount).map((n) =>
      createBubble({
        image,
        burstImage,
        canvas,
        backgroundImage,
        lane: n + 1,
        numberOfLanes: amount,
      })
    );

  const loopBubbles = (state) => {
    const { bubbles } = state;

    const updateWith = updateState(state);

    return updateWith({
      bubbles: bubbles.map(loopUp),
    });
  };

  const moveBubbles = (state) => {
    const { bubbles } = state;

    const updateWith = updateState(state);

    return updateWith({
      bubbles: bubbles.map(moveVertical),
    });
  };

  const reset = (bubble) => {
    if (bubble.y >= bubble.loop.stop.y + bubble.height / 2) {
      return modifyObject(bubble)({
        renderImage: "image",
      });
    }

    return bubble;
  };

  const resetBubble = (state) => {
    const { bubbles } = state;

    const updateWith = updateState(state);

    return updateWith({
      bubbles: bubbles.map(reset),
    });
  };

  const Bubbles = {
    move: moveBubbles,
    loop: loopBubbles,
    create: createBubble,
    init: createBubbles,
    burst: burstBubble,
    reset: resetBubble,
  };

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
      events = events.includes(userEvent) ? events : [...events, userEvent];
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

  const gravity = (state) => {
    const {
      player: { y, speed, direction, gravity, isJumping, isOnPlatform },
    } = state;

    const updateWith = updateState(state);

    return updateWith({ player: { y: y + direction.y * speed.y * gravity } });
  };

  const PRESS_UP = "PRESS_UP";
  const PRESS_DOWN = "PRESS_DOWN";
  const PRESS_LEFT = "PRESS_LEFT";
  const PRESS_RIGHT = "PRESS_RIGHT";

  const Input = {
    PRESS_RIGHT,
    PRESS_DOWN,
    PRESS_LEFT,
    PRESS_UP,
  };

  const getDirectionYFrom = (player) => {
    if (player.direction.y === 0) {
      return -1;
    }
    return player.speed.y <= 0 ? 1 : player.direction.y;
  };

  const jump = (state) => {
    const { player, events } = state;

    const updateWith = updateState(state);

    if (player.isJumping) {
      const y = player.y + player.speed.y * player.gravity * player.direction.y;
      const directionY = getDirectionYFrom(player);
      const speedY = directionY < 0 ? player.speed.y - 0.1 : player.speed.y + 0.1;

      return updateWith({
        player: {
          y,
          speed: { ...player.speed, y: speedY },
          direction: { ...player.direction, y: directionY },
        },
      });
    }

    if (events.includes(Input.PRESS_UP) && !player.isJumping) {
      return updateWith({
        player: {
          direction: {
            ...player.direction,
            y: -1,
          },
          isJumping: player.isAllowedToJump ? true : player.isJumping,
          isAllowedToJump: false,
        },
        ground: {
          // isActive: false,
        },
        eternalVoid: true,
        animateBackground: true,
      });
    }

    return state;
  };

  const moveLeft = (state) => {
    const { events, player } = state;
    const updateWith = updateState(state);

    if (events.includes(Input.PRESS_LEFT)) {
      return updateWith({
        player: {
          x: player.x - player.speed.x,
        },
      });
    }

    return state;
  };

  const moveRight = (state) => {
    const { events, player } = state;
    const updateWith = updateState(state);

    if (events.includes(Input.PRESS_RIGHT)) {
      return updateWith({
        player: {
          x: player.x + player.speed.x,
        },
      });
    }

    return state;
  };

  const isOnPlatform = (object) => (platform) => {
    // TODO
    // add more complex solution for interpolating
    // collision with moving objects
    return between(object)(platform) && onTop(object)(platform);
  };

  const placeOnPlatform = (player) => (platform) => ({
    y: platform.y - player.height,
    isOnPlatform: true,
    isJumping: false,
    isAllowedToJump: true,
    direction: {
      ...player.direction,
      y: 0,
    },
  });

  const platformCollision = (state) => {
    const { player, ground, bubbles } = state;
    const updateWith = updateState(state);

    const platforms = [...bubbles, ground];

    const collidedPlatforms = platforms
      .filter((platform) => platform.isActive)
      .filter(isOnPlatform(player));

    if (
      !player.isOnPlatform &&
      collidedPlatforms.length > 0 &&
      player.direction.y >= 0
    ) {
      return updateWith({
        player: placeOnPlatform(player)(collidedPlatforms[0]),
      });
    }

    return updateWith({
      player: {
        isOnPlatform: false,
        direction: {
          ...player.direction,
          y: 1,
        },
      },
    });
  };

  const Player = {
    gravity,
    jump,
    moveLeft,
    moveRight,
    platformCollision,
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

  const drawObject = (context) => (renderObject, index) => {
    try {
      const { renderImage, x, y, width, height } = renderObject;
      context.drawImage(renderObject[renderImage], x, y, width, height);
    } catch (error) {
      console.log(index, image, x, y, width, height);
      throw error;
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
      ...bubbles,
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
    const bubbleBurstImage = await loadImage("images/bubbles/burst.png");
    await loadImage("images/sunlight/sunlight.png");

    return Object.freeze({
      _update: 0,
      background: {
        image: backgroundImage,
        renderImage: "image",
        y: 0,
        x: 0,
        width: config.canvas.width,
        height: config.canvas.height,
        speed: { x: 0, y: 0 },
        direction: { x: 0, y: 1 },
      },
      seabottom: {
        image: seaBottomImage,
        renderImage: "image",
        y: 0,
        x: 0,
        width: config.canvas.width,
        height: config.canvas.height,
        speed: { x: 0, y: 0.05 },
        direction: { x: 0, y: 1 },
      },
      cliff1_0: {
        image: cliff1Image,
        renderImage: "image",
        y: 0,
        x: 0,
        loop: {
          start: { x: 0, y: -config.canvas.height },
          stop: { x: 0, y: config.canvas.height },
        },
        speed: { x: 0, y: 0.3 },
        direction: { x: 0, y: 1 },
        width: config.canvas.width,
        height: config.canvas.height,
      },
      cliff1_1: {
        image: cliff1Image,
        renderImage: "image",
        x: 0,
        y: -config.canvas.height,
        loop: {
          start: { x: 0, y: -config.canvas.height },
          stop: { x: 0, y: config.canvas.height },
        },
        speed: { x: 0, y: 0.3 },
        direction: { x: 0, y: 1 },
        width: config.canvas.width,
        height: config.canvas.height,
      },
      cliff2_0: {
        image: cliff2Image,
        renderImage: "image",
        x: 0,
        y: 0,
        loop: {
          start: { x: 0, y: -config.canvas.height },
          stop: { x: 0, y: config.canvas.height },
        },
        speed: { x: 0, y: 0.7 },
        direction: { x: 0, y: 1 },
        width: config.canvas.width,
        height: config.canvas.height,
      },
      cliff2_1: {
        image: cliff2Image,
        renderImage: "image",
        x: 0,
        y: -config.canvas.height,
        loop: {
          start: { x: 0, y: -config.canvas.height },
          stop: { x: 0, y: config.canvas.height },
        },
        speed: { x: 0, y: 0.7 },
        direction: { x: 0, y: 1 },
        width: config.canvas.width,
        height: config.canvas.height,
      },
      seaweed: {
        image: seaweedImage,
        renderImage: "image",
        y: 0,
        x: 0,
        speed: { x: 0, y: 1.5 },
        direction: { x: 0, y: 1 },
        width: config.canvas.width,
        height: config.canvas.height,
      },
      player: {
        image: playerImage,
        renderImage: "image",
        speed: { x: config.canvas.width / 100, y: config.canvas.height / 100 },
        direction: { x: 0, y: 0 },
        x: (config.canvas.width - playerImage.width) / 2,
        y:
          config.canvas.height -
          (playerImage.height * config.canvas.width) / backgroundImage.width,
        width: (playerImage.width * config.canvas.width) / backgroundImage.width,
        height:
          (playerImage.height * config.canvas.width) / backgroundImage.width,
        isJumping: false,
        isAllowedToJump: true,
        gravity: config.canvas.height / 1000,
        isOnPlatform: true,
      },

      ground: {
        x: 0,
        y: config.canvas.height + 1,
        width: config.canvas.width,
        height: 1,
        isActive: true,
        hitbox: config.canvas.height / 100,
      },

      bubbles: Bubbles.init({
        image: bubbleImage,
        burstImage: bubbleBurstImage,
        backgroundImage,
        canvas: config.canvas,
        amount: 5,
      }),

      eternalVoid: false,
      animateBackground: false,
      ...config,
    });
  };

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

})();
