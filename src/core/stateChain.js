import { Debug } from "../debug/Debug";

export const stateChain = (state, ...functions) => {
  if (functions.length === 0) {
    Debug.clear(state);
    return state;
  }

  const [nextFunction, ...rest] = functions;

  const nextState = nextFunction(state);

  Debug.push(nextFunction.name)(nextState);

  return stateChain(nextState, ...rest);
};
