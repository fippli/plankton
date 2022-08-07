import { Collision } from "../collision/index.js";
import { Direction } from "../direction/index.js";
import { placeOnPlatform } from "../platform/placeOnPlatform";
import { updateState } from "../updateState";

export const platformCollision = (state) => {
  const { player, ground, bubbles, eternalVoid } = state;
  const updateWith = updateState(state);

  const collidedPlatforms = Collision.find(player, ...bubbles, ground);

  if (collidedPlatforms.length === 0) {
    updateWith({
      player: {
        isOnPlatform: false,
      },
    });
  }

  if (!player.isOnPlatform) {
    if (collidedPlatforms.length > 0) {
      if (Direction.isDown(player)) {
        return updateWith({
          player: placeOnPlatform(player)(collidedPlatforms[0]),
        });
      } else {
        if (eternalVoid) {
          return updateWith({
            player: {
              isOnPlatform: false,
              direction: {
                ...player.direction,
                y: Direction.DOWN,
              },
            },
          });
        }

        return state;
      }
    } else {
      if (Direction.isDown(player)) {
        return state;
      } else {
        return updateWith({
          player: {
            direction: {
              ...player.direction,
              y: Direction.DOWN,
            },
            speed: {
              ...player.speed,
              y: 1,
            },
          },
        });
      }
    }
  } else {
    if (collidedPlatforms.length > 0) {
      return updateWith({
        player: placeOnPlatform(player)(collidedPlatforms[0]),
      });
    }

    // if (collidedPlatforms.length === 0) {
    //   updateWith({
    //     player: {
    //       isOnPlatform: false,
    //     },
    //   });
    // }

    return state;
  }
};
