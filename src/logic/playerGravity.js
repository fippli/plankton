const playerGravity = (state) => {
  const {
    player: { y, speed, onGround, jumping },
    gravity,
  } = state;
  if (!jumping && !onGround) {
    return {
      player: {
        y: y + speed.y * gravity,
      },
    };
  }

  return null;
};
