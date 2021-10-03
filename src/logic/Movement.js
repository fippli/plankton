const move = (key) => (movable) => ({
  ...movable,
  [key]: movable[key] + movable.speed[key] * movable.direction[key],
});

const moveHorizonal = move("x");
const moveVertical = move("y");

const loopBackground = (state, background) =>
  moveVertical(state[background]).y >= 400
    ? { [background]: { y: state[background].y - 800 } }
    : moveVertical(state[background]);

const moveBubble = (bubble) => {
  const nextBubble = moveVertical(bubble);

  if (nextBubble.y <= bubble.burstLevel && nextBubble.burst !== true) {
    return { ...nextBubble, image: bubbleBurstImage, burst: true };
  }
  if (nextBubble.burst === true) {
    return {
      ...bubble,
      image: bubbleImage,
      x: random(1, 600),
      y: random(410, 400),
      burst: false,
      speed: { x: 0, y: random(1, 2) },
    };
  }

  return nextBubble;
};

const backgroundAnimations = (state) => {
  if (state.animateBackground) {
    return [
      { seabottom: moveVertical(state.seabottom) },
      { cliff1_0: loopBackground(state, "cliff1_0") },
      { cliff1_1: loopBackground(state, "cliff1_1") },
      { cliff2_0: loopBackground(state, "cliff2_0") },
      { cliff2_1: loopBackground(state, "cliff2_1") },
      { seaweed: moveVertical(state.seaweed) },
      { bubbles: state.bubbles.map(moveBubble) },
    ];
  }

  return [{ bubbles: state.bubbles.map(moveBubble) }];
};

const Movement = (function () {
  "use strict";

  return (state) => (actions) =>
    new Promise((resolve, _) =>
      resolve([...actions, ...backgroundAnimations(state)])
    );
})();
