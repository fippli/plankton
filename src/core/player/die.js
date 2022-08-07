import { updateState } from "../updateState";

export const die = (state) => {
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
