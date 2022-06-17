import { updateState } from "../updateState";

export const gravity = (state) => {
  const {
    player: { y, speed, direction, gravity, isJumping, isOnPlatform },
  } = state;

  const updateWith = updateState(state);

  return updateWith({ player: { y: y + direction.y * speed.y * gravity } });
};
