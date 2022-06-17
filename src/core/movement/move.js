export const move = (key) => (movable) => ({
  ...movable,
  [key]: movable[key] + movable.speed[key] * movable.direction[key],
});

export const moveHorizonal = move("x");
export const moveVertical = move("y");
