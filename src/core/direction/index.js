export const Direction = {
  isUp: (movable) => movable.direction.y === -1,
  isDown: (movable) => movable.direction.y === 1,
  isLeft: (movable) => movable.direction.y === -1,
  isRight: (movable) => movable.direction.y === 1,
  isNeutral: (movable) => movable.direction.y === 0,
  UP: -1,
  DOWN: 1,
  LEFT: -1,
  RIGHT: 1,
  NEUTRAL: 0,
};
