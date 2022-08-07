import { Collision } from "../collision/index.js";
import { Input } from "../Input/index.js";
import { updateState } from "../updateState";

export const jump = (state) => {
  const { player, events } = state;

  const updateWith = updateState(state);
  const [collidedPlatform] = Collision.platforms(state);

  if (events.includes(Input.PRESS_UP) && player.isOnPlatform) {
    return updateWith({
      player: {
        direction: {
          ...player.direction,
          y: -1,
        },
        speed: {
          ...player.speed, // todo: add platform speed
          y: 15, // fixme
        },
      },
    });
  }

  return state;
};
