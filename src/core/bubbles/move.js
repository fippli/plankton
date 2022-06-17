import { moveVertical } from "../movement/move";
import { updateState } from "../updateState";

export const moveBubbles = (state) => {
  const { bubbles } = state;

  const updateWith = updateState(state);

  return updateWith({
    bubbles: bubbles.map(moveVertical),
  });
};
