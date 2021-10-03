const playerFloat = (state) =>
  state.bubbles
    .filter(between(state.player))
    .filter(onTop(state.player))
    .map((bubble) => ({
      player: {
        y: bubble.y - state.player.height,
        onGround: true,
      },
    }));
