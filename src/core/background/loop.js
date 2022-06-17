import { loopDown } from "../movement/loop";
import { updateState } from "../updateState";

export const loopBackgrounds = (state) => {
  const { cliff1_0, cliff1_1, cliff2_0, cliff2_1 } = state;

  const updateWith = updateState(state);

  if (state.animateBackground) {
    return updateWith({
      cliff1_0: loopDown(cliff1_0),
      cliff1_1: loopDown(cliff1_1),
      cliff2_0: loopDown(cliff2_0),
      cliff2_1: loopDown(cliff2_1),
    });
  }

  return state;
};
