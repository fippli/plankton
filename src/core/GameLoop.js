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

export const GameLoop = (gameLogic, render) => (initialState) => {
  const gameLoop = loop(gameLogic, render, initialState);
  requestAnimationFrame(gameLoop);
};
