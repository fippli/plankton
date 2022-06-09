import { PRESS_UP } from "../inputTypes.js";
import { updateState } from "../updateState.js";

export const playerGravity = (state) => {
  const {
    player: { y, speed, gravity, jumping, onGround },
  } = state;

  const updateWith = updateState(state);

  if (!jumping && !onGround) {
    return updateWith({ player: { y: y + speed.y * gravity } });
  }

  return state;
};

export const playerGroundCollision = (state) => {
  const {
    player: { y, height },
    eternalVoid,
    canvas,
    defaults,
  } = state;

  const updateWith = updateState(state);

  if (!eternalVoid && y + height > canvas.height) {
    return updateWith({
      player: {
        onGround: true,
        y: defaults.player.y,
      },
    });
  }

  return state;
};

export const playerJump = (state) => {
  const { player, events } = state;

  const updateWith = updateState(state);

  if (player.jumping) {
    const y = player.y + player.speed.y * player.gravity * player.direction.y;
    const directionY = player.speed.y <= 0 ? 1 : player.direction.y;
    const speedY = directionY < 0 ? player.speed.y - 0.1 : player.speed.y + 0.1;

    return updateWith({
      player: {
        y,
        speed: { ...player.speed, y: speedY },
        direction: { ...player.direction, y: directionY },
      },
    });
  }

  if (events.includes(PRESS_UP)) {
    return updateWith({
      player: {
        jumping: player.allowJump ? true : player.jumping,
        allowJump: false,
      },
      eternalVoid: true,
      animateBackground: true,
    });
  }

  return state;
};

export const playerMovementLeft = () => {};
export const playerMovementRight = () => {};
