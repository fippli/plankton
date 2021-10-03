const playerCollisions = (state) => {
  const {
    player: { y, height },
    eternalVoid,
  } = state;

  if (!eternalVoid && y + height > 400) {
    return {
      player: {
        onGround: true,
        y: 400 - height,
      },
    };
  }
  return null;
};
