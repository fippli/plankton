export const placeOnPlatform = (player) => (platform) => ({
  y: platform.y - player.height,
  isOnPlatform: true,
  isJumping: false,
  isAllowedToJump: true,
  direction: {
    ...player.direction,
    y: 0,
  },
});
