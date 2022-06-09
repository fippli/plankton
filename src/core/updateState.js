export const updateState = (state) => (update) =>
  Object.keys(update).reduce((nextState, key) => {
    return {
      ...nextState,
      [key]: {
        ...nextState[key],
        ...update[key],
      },
    };
  }, state);
