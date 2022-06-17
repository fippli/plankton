import { modifyObject } from "../modifyObject";
import { updateState } from "../updateState";

const burst = (bubble) => {
  if (bubble.y <= bubble.loop.stop.y + bubble.height / 2) {
    return modifyObject(bubble)({
      renderImage: "burstImage",
    });
  }

  return bubble;
};

export const burstBubble = (state) => {
  const { bubbles } = state;

  const updateWith = updateState(state);

  return updateWith({
    bubbles: bubbles.map(burst),
  });
};
