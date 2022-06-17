import { Input } from "../Input/index.js";
import { updateState } from "../updateState";

const getDirectionYFrom = (player) => {
  if (player.direction.y === 0) {
    return -1;
  }
  return player.speed.y <= 0 ? 1 : player.direction.y;
};

export const jump = (state) => {
  const { player, events } = state;

  const updateWith = updateState(state);

  if (player.isJumping) {
    const y = player.y + player.speed.y * player.gravity * player.direction.y;
    const directionY = getDirectionYFrom(player);
    const speedY = directionY < 0 ? player.speed.y - 0.1 : player.speed.y + 0.1;

    return updateWith({
      player: {
        y,
        speed: { ...player.speed, y: speedY },
        direction: { ...player.direction, y: directionY },
      },
    });
  }

  if (events.includes(Input.PRESS_UP) && !player.isJumping) {
    return updateWith({
      player: {
        direction: {
          ...player.direction,
          y: -1,
        },
        isJumping: player.isAllowedToJump ? true : player.isJumping,
        isAllowedToJump: false,
      },
      ground: {
        // isActive: false,
      },
      eternalVoid: true,
      animateBackground: true,
    });
  }

  return state;
};
