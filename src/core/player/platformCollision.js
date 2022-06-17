import { isOnPlatform } from "../platform/isOnPlatform";
import { placeOnPlatform } from "../platform/placeOnPlatform";
import { updateState } from "../updateState";

export const platformCollision = (state) => {
  const { player, ground, bubbles } = state;
  const updateWith = updateState(state);

  const platforms = [...bubbles, ground];

  const collidedPlatforms = platforms
    .filter((platform) => platform.isActive)
    .filter(isOnPlatform(player));

  if (
    !player.isOnPlatform &&
    collidedPlatforms.length > 0 &&
    player.direction.y >= 0
  ) {
    return updateWith({
      player: placeOnPlatform(player)(collidedPlatforms[0]),
    });
  }

  return updateWith({
    player: {
      isOnPlatform: false,
      direction: {
        ...player.direction,
        y: 1,
      },
    },
  });
};
