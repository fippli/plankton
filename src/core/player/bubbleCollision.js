import { between, onTop } from "../functional";
import { placeisOnPlatform } from "../platform/placeisOnPlatform";
import { updateState } from "../updateState";

export const bubbleCollision = (state) => {
  const { player, bubbles } = state;
  const updateWith = updateState(state);

  const hitBubbles = bubbles.filter(
    (bubble) => between(player)(bubble) && onTop(player)(bubble)
  );

  if (hitBubbles.length > 0) {
    return updateWith({
      player: placeisOnPlatform(player)(hitBubbles[0]),
      eternalVoid: true,
      animateBackground: true,
    });
  }

  // return updateWith({
  //   player: {
  //     isOnPlatform: false,
  //   },
  // });
  return state;
};
