import { loopUp } from "../movement/loop";
import { updateState } from "../updateState";

export const loopBubbles = (state) => {
  const { bubbles } = state;

  const updateWith = updateState(state);

  return updateWith({
    bubbles: bubbles.map(loopUp),
  });
};
