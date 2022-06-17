import { between, onTop } from "../functional";

export const isOnPlatform = (object) => (platform) => {
  // TODO
  // add more complex solution for interpolating
  // collision with moving objects
  return between(object)(platform) && onTop(object)(platform);
};
