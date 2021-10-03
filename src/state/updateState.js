const typeSwitch = (state, key, update) => {
  if (Array.isArray(update[key])) {
    return update[key];
  }
  if (typeof update[key] === "object") {
    return { ...state[key], ...update[key] };
  }

  return update[key];
};

const dispatch = (update) => (state, key) => ({
  ...state,
  _update: state._update + 1,
  [key]: typeSwitch(state, key, update),
});

const updateReducer = (nextState, update) =>
  Object.keys(update).reduce(dispatch(update), nextState);

const updateState = (state) => (updates) =>
  updates.reduce(updateReducer, state);
