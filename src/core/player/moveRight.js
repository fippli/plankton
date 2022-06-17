import { updateState } from "../updateState";
import { Input } from "../Input/index.js";

export const moveRight = (state) => {
  const { events, player } = state;
  const updateWith = updateState(state);

  if (events.includes(Input.PRESS_RIGHT)) {
    return updateWith({
      player: {
        x: player.x + player.speed.x,
      },
    });
  }

  return state;
};
