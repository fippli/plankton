import { Bubbles } from "../core/bubbles/index.js";
import { loadImage } from "../core/loadImage.js";

export const createState = async (config) => {
  const backgroundImage = await loadImage("images/backgrounds/background.png");
  const seaBottomImage = await loadImage("images/backgrounds/seabottom2.png");
  const cliff1Image = await loadImage("images/backgrounds/cliff1.png");
  const cliff2Image = await loadImage("images/backgrounds/cliff2.png");
  const seaweedImage = await loadImage("images/backgrounds/seaweed.png");
  const playerImage = await loadImage("images/player/red.png");
  const bubbleImage = await loadImage("images/bubbles/bubble.png");
  const bubbleBurstImage = await loadImage("images/bubbles/burst.png");
  const sunlightImage = await loadImage("images/sunlight/sunlight.png");

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
