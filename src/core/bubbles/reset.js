import { modifyObject } from "../modifyObject";
import { updateState } from "../updateState";

const reset = (bubble) => {
  if (bubble.y >= bubble.loop.stop.y + bubble.height / 2) {
    return modifyObject(bubble)({
      renderImage: "image",
    });
  }

  return bubble;
};

export const resetBubble = (state) => {
  const { bubbles } = state;

  const updateWith = updateState(state);

  return updateWith({
    bubbles: bubbles.map(reset),
  });
};
