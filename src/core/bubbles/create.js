import { range } from "../functional";

const lanePosition = ({ image, width, numberOfLanes, laneNumber }) =>
  (width - image.width) / (numberOfLanes / laneNumber) -
  width / numberOfLanes / 2;

export const createBubble = ({
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

export const createBubbles = ({
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
