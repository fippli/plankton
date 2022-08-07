import { updateState } from "../updateState";

export const move = (state) => {
  const { player } = state;
  const updateWith = updateState(state);

  updateWith({
    player: {
      x: player.x + player.speed.x * player.direction.x,
      y: player.y + player.speed.y * player.direction.y,
    },
  });

  return state;
};
