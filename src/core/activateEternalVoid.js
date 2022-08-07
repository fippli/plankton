import { updateState } from "./updateState";

export const activateEternalVoid = (state) => {
  const { player, canvas } = state;

  const updateWith = updateState(state);

  if (player.y < canvas.height - player.height) {
    updateWith({
      eternalVoid: true,
      animateBackground: true,
      ground: {
        isActive: false,
      },
    });
  }

  return state;
};
