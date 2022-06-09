let stack = [];

export const push = (caller) => (state) => {
  stack = [...stack, { caller, state }];
  return state;
};
export const clear = (state) => {
  stack = [];
  return state;
};

export const throwWhen = (fn) => (state) => {
  if (fn(state) === true) {
    console.warn(stack);
    console.error(state);
    throw new Error(`Something is up!`);
  }

  return state;
};

export const Debug = {
  push,
  clear,
  when: throwWhen,
};
