import { isOnPlatform } from "../platform/isOnPlatform";

const find = (movable, ...movables) =>
  movables.filter((x) => x.isActive).filter(isOnPlatform(movable));

export const Collision = {
  find,
  platforms: (state) => {
    const { player, bubbles, ground } = state;
    return find(player, ...bubbles, ground);
  },
};
