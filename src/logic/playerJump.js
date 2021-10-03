const playerJump = ({ player, gravity, jumping }) => {
  if (jumping) {
    const y = player.y + player.speed.y * gravity * player.direction.y;
    const directionY = player.speed.y <= 0 ? 1 : player.direction.y;
    const speedY = directionY < 0 ? player.speed.y - 0.1 : player.speed.y + 0.1;

    return {
      player: {
        y,
        speed: { ...player.speed, y: speedY },
        direction: { ...player.direction, y: directionY },
      },
    };
  }

  return null;
};
