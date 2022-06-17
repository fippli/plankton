import { moveVertical } from "../movement/move";
import { updateState } from "../updateState";

export const moveBackgrounds = (state) => {
  const { seaweed, seabottom, cliff1_0, cliff1_1, cliff2_0, cliff2_1 } = state;

  const updateWith = updateState(state);

  if (state.animateBackground) {
    return updateWith({
      seaweed: moveVertical(seaweed),
      seabottom: moveVertical(seabottom),
      cliff1_0: moveVertical(cliff1_0),
      cliff1_1: moveVertical(cliff1_1),
      cliff2_0: moveVertical(cliff2_0),
      cliff2_1: moveVertical(cliff2_1),
    });
  }

  return state;
};
