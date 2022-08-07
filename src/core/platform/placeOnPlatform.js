export const placeOnPlatform = (player) => (platform) => ({
  y: platform.y - player.height,
  isOnPlatform: true,
  direction: {
    ...player.direction,
    y: 0,
  },
});
