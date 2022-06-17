import { between, onTop } from "../functional";
import { placeisOnPlatform } from "../platform/placeisOnPlatform";
import { updateState } from "../updateState";

export const groundCollision = (state) => {
  const { player, eternalVoid, ground } = state;

  const updateWith = updateState(state);

  if (!eternalVoid && between(player)(ground) && onTop(player)(ground)) {
    return updateWith({
      player: placeisOnPlatform(player)(ground),
    });
  }

  return state;
};
