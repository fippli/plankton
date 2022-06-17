import { Input } from "../Input/index.js";
import { updateState } from "../updateState";

export const moveLeft = (state) => {
  const { events, player } = state;
  const updateWith = updateState(state);

  if (events.includes(Input.PRESS_LEFT)) {
    return updateWith({
      player: {
        x: player.x - player.speed.x,
      },
    });
  }

  return state;
};
