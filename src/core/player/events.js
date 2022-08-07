import { Input } from "../Input/index.js";
import { updateState } from "../updateState";

export const events = (state) => {
  const { events, player } = state;
  const updateWith = updateState(state);

  if (events.includes(Input.PRESS_LEFT)) {
    return updateWith({
      player: {
        direction: {
          ...player.direction,
          x: -1,
        },
        speed: {
          ...player.speed,
          x: 10, // fixme
        },
      },
    });
  }

  if (events.includes(Input.PRESS_RIGHT)) {
    return updateWith({
      player: {
        direction: {
          ...player.direction,
          x: 1,
        },
        speed: {
          ...player.speed,
          x: 10, // fixme
        },
      },
    });
  }

  if (events.includes(Input.RELEASE_LEFT)) {
    return updateWith({
      player: {
        speed: {
          ...player.speed,
          x: 0,
        },
      },
    });
  }

  if (events.includes(Input.RELEASE_RIGHT)) {
    return updateWith({
      player: {
        speed: {
          ...player.speed,
          x: 0,
        },
      },
    });
  }

  return state;
};
