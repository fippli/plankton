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

  const updateState = modifyObject;

  const activateEternalVoid = (state) => {
    const { player, canvas } = state;

    const updateWith = updateState(state);

    if (player.y < canvas.height - player.height) {
      updateWith({
        eternalVoid: true,
        animateBackground: true,
        ground: {
          isActive: false,
        },
      });
    }

    return state;
  };

  const move$1 = (key) => (movable) => ({
    ...movable,
    [key]: movable[key] + movable.speed[key] * movable.direction[key],
  });

  const moveHorizonal = move$1("x");
  const moveVertical = move$1("y");

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
    hitbox: 10,
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

  const events$1 = (function () {

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

  const PRESS_UP = "PRESS_UP";
  const PRESS_DOWN = "PRESS_DOWN";
  const PRESS_LEFT = "PRESS_LEFT";
  const PRESS_RIGHT = "PRESS_RIGHT";
  const RELEASE_UP = "RELEASE_UP";
  const RELEASE_DOWN = "RELEASE_DOWN";
  const RELEASE_LEFT = "RELEASE_LEFT";
  const RELEASE_RIGHT = "RELEASE_RIGHT";

  const Input = {
    PRESS_RIGHT,
    PRESS_DOWN,
    PRESS_LEFT,
    PRESS_UP,
    RELEASE_RIGHT,
    RELEASE_DOWN,
    RELEASE_LEFT,
    RELEASE_UP,
    events: events$1,
  };

  // const getNextDirectionYFrom = (direction, speed) => {
  //   return speed.y < 0 ? 1 : direction.y;
  // };

  const gravity = (state) => {
    const {
      player: { y, speed, direction, gravity },
    } = state;

    const updateWith = updateState(state);

    // const nextDirectionY = getNextDirectionYFrom(direction, speed);

    // console.table(speed);
    // console.table(direction);

    return updateWith({
      player: {
        y: y + direction.y * speed.y,
        speed: {
          ...speed,
          y: speed.y + gravity * direction.y,
        },
        direction: {
          ...direction,
          y: speed.y < 0 ? 1 : direction.y,
        },
      },
    });
  };

  // if (player.direction.y !== 0) {
  //   const y = player.y + player.speed.y * player.gravity * player.direction.y;
  //   const directionY = getDirectionYFrom(player);
  //   const speedY = directionY < 0 ? player.speed.y - 0.1 : player.speed.y + 0.1;

  //   return updateWith({
  //     player: {
  //       y,
  //       speed: { ...player.speed, y: speedY },
  //       direction: { ...player.direction, y: directionY },
  //     },
  //   });
  // }

  const isOnPlatform = (object) => (platform) => {
    // TODO
    // add more complex solution for interpolating
    // collision with moving objects
    return between(object)(platform) && onTop(object)(platform);
  };

  const find = (movable, ...movables) =>
    movables.filter((x) => x.isActive).filter(isOnPlatform(movable));

  const Collision = {
    find,
    platforms: (state) => {
      const { player, bubbles, ground } = state;
      return find(player, ...bubbles, ground);
    },
  };

  const jump = (state) => {
    const { player, events } = state;

    const updateWith = updateState(state);
    Collision.platforms(state);

    if (events.includes(Input.PRESS_UP) && player.isOnPlatform) {
      return updateWith({
        player: {
          direction: {
            ...player.direction,
            y: -1,
          },
          speed: {
            ...player.speed, // todo: add platform speed
            y: 15, // fixme
          },
        },
      });
    }

    return state;
  };

  const Direction = {
    isUp: (movable) => movable.direction.y === -1,
    isDown: (movable) => movable.direction.y === 1,
    isLeft: (movable) => movable.direction.y === -1,
    isRight: (movable) => movable.direction.y === 1,
    isNeutral: (movable) => movable.direction.y === 0,
    UP: -1,
    DOWN: 1,
    LEFT: -1,
    RIGHT: 1,
    NEUTRAL: 0,
  };

  const placeOnPlatform = (player) => (platform) => ({
    y: platform.y - player.height,
    isOnPlatform: true,
    direction: {
      ...player.direction,
      y: 0,
    },
  });

  const platformCollision = (state) => {
    const { player, ground, bubbles, eternalVoid } = state;
    const updateWith = updateState(state);

    const collidedPlatforms = Collision.find(player, ...bubbles, ground);

    if (collidedPlatforms.length === 0) {
      updateWith({
        player: {
          isOnPlatform: false,
        },
      });
    }

    if (!player.isOnPlatform) {
      if (collidedPlatforms.length > 0) {
        if (Direction.isDown(player)) {
          return updateWith({
            player: placeOnPlatform(player)(collidedPlatforms[0]),
          });
        } else {
          if (eternalVoid) {
            return updateWith({
              player: {
                isOnPlatform: false,
                direction: {
                  ...player.direction,
                  y: Direction.DOWN,
                },
              },
            });
          }

          return state;
        }
      } else {
        if (Direction.isDown(player)) {
          return state;
        } else {
          return updateWith({
            player: {
              direction: {
                ...player.direction,
                y: Direction.DOWN,
              },
              speed: {
                ...player.speed,
                y: 1,
              },
            },
          });
        }
      }
    } else {
      if (collidedPlatforms.length > 0) {
        return updateWith({
          player: placeOnPlatform(player)(collidedPlatforms[0]),
        });
      }

      // if (collidedPlatforms.length === 0) {
      //   updateWith({
      //     player: {
      //       isOnPlatform: false,
      //     },
      //   });
      // }

      return state;
    }
  };

  const move = (state) => {
    const { player } = state;
    const updateWith = updateState(state);

    updateWith({
      player: {
        x: player.x + player.speed.x * player.direction.x,
        y: player.y + player.speed.y * player.direction.y,
      },
    });

    return state;
  };

  const events = (state) => {
    const { events, player } = state;
    const updateWith = updateState(state);

    if (events.includes(Input.PRESS_LEFT)) {
      return updateWith({
        player: {
          direction: {
            ...player.direction,
            x: -1,
          },
          speed: {
            ...player.speed,
            x: 10, // fixme
          },
        },
      });
    }

    if (events.includes(Input.PRESS_RIGHT)) {
      return updateWith({
        player: {
          direction: {
            ...player.direction,
            x: 1,
          },
          speed: {
            ...player.speed,
            x: 10, // fixme
          },
        },
      });
    }

    if (events.includes(Input.RELEASE_LEFT)) {
      return updateWith({
        player: {
          speed: {
            ...player.speed,
            x: 0,
          },
        },
      });
    }

    if (events.includes(Input.RELEASE_RIGHT)) {
      return updateWith({
        player: {
          speed: {
            ...player.speed,
            x: 0,
          },
        },
      });
    }

    return state;
  };

  const die = (state) => {
    const { canvas, player } = state;
    const updateWith = updateState(state);

    if (player.y > canvas.height + player.height * 2) {
      return updateWith({
        player: {
          alive: false,
        },
      });
    }

    return state;
  };

  const Player = {
    gravity,
    jump,
    platformCollision,
    move,
    events,
    die,
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
        speed: {
          x: config.canvas.width / 100,
          y: config.canvas.height / 100,
        },
        direction: {
          x: 0,
          y: 0,
        },
        x: (config.canvas.width - playerImage.width) / 2,
        y:
          config.canvas.height -
          (playerImage.height * config.canvas.width) / backgroundImage.width,
        width: (playerImage.width * config.canvas.width) / backgroundImage.width,
        height:
          (playerImage.height * config.canvas.width) / backgroundImage.width,
        gravity: 0.2,
        isOnPlatform: true,
        alive: true,
      },

      ground: {
        x: 0,
        y: config.canvas.height + 1,
        speed: {
          x: 0,
          y: 0,
        },
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
      Input.events,

      activateEternalVoid,

      Player.platformCollision,

      Player.jump,
      Background.move,
      Background.loop,

      Bubbles.move,
      Bubbles.loop,
      Bubbles.burst,

      Player.events,
      Player.move,
      Player.gravity,
      Player.die,

      Bubbles.reset,
      Debug.when((state) => false)
    );

  const addDefaults = (state) => ({ ...state, defaults: state });
  const game = GameLoop(gameLogic, render);

  createState(Canvas()).then(trace).then(addDefaults).then(trace).then(game);

})();
