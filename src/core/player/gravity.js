import { updateState } from "../updateState";

// const getNextDirectionYFrom = (direction, speed) => {
//   return speed.y < 0 ? 1 : direction.y;
// };

export const gravity = (state) => {
  const {
    player: { y, speed, direction, gravity },
  } = state;

  const updateWith = updateState(state);

  // const nextDirectionY = getNextDirectionYFrom(direction, speed);

  // console.table(speed);
  // console.table(direction);

  return updateWith({
    player: {
      y: y + direction.y * speed.y,
      speed: {
        ...speed,
        y: speed.y + gravity * direction.y,
      },
      direction: {
        ...direction,
        y: speed.y < 0 ? 1 : direction.y,
      },
    },
  });
};

// if (player.direction.y !== 0) {
//   const y = player.y + player.speed.y * player.gravity * player.direction.y;
//   const directionY = getDirectionYFrom(player);
//   const speedY = directionY < 0 ? player.speed.y - 0.1 : player.speed.y + 0.1;

//   return updateWith({
//     player: {
//       y,
//       speed: { ...player.speed, y: speedY },
//       direction: { ...player.direction, y: directionY },
//     },
//   });
// }
