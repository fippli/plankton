export const drawObject =
  (context) =>
  ({ image, x, y, width, height }) => {
    try {
      context.drawImage(image, x, y, width, height);
    } catch (error) {
      console.log(image, x, y, width, height);
    }
  };

export const render = (state) => {
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
