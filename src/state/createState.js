import { loadImage } from "../core/loadImage.js";

export const createState = async (config) => {
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
      x: (config.canvas.width - playerImage.width) / 2,
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
    ...config,
  });
};
