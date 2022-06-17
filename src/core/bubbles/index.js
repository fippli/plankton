import { burstBubble } from "./burst";
import { createBubble, createBubbles } from "./create";
import { loopBubbles } from "./loop";
import { moveBubbles } from "./move";
import { resetBubble } from "./reset";

export const Bubbles = {
  move: moveBubbles,
  loop: loopBubbles,
  create: createBubble,
  init: createBubbles,
  burst: burstBubble,
  reset: resetBubble,
};
