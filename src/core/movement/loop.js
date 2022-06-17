import { modifyObject } from "../modifyObject";
import { moveHorizonal, moveVertical } from "./move";

export const UP = "UP";
export const DOWN = "DOWN";
export const LEFT = "LEFT";
export const RIGHT = "RIGHT";

export const shouldLoop = (direction) => (loopable) => {
  switch (direction) {
    case UP: {
      return moveVertical(loopable).y <= loopable.loop.stop.y;
    }

    case DOWN: {
      return moveVertical(loopable).y >= loopable.loop.stop.y;
    }

    case RIGHT: {
      return moveHorizonal(loopable).x >= loopable.loop.stop.x;
    }

    case LEFT: {
      return moveHorizonal(loopable).x <= loopable.loop.stop.x;
    }
  }
};

export const loop = (direction) => (loopable) => {
  const updateWith = modifyObject(loopable);
  if (shouldLoop(direction)(loopable)) {
    switch (direction) {
      case UP: {
        return updateWith({ y: loopable.loop.start.y });
      }

      case DOWN: {
        return updateWith({ y: loopable.loop.start.y });
      }

      case RIGHT: {
        return updateWith({ x: loopable.loop.start.x });
      }

      case LEFT: {
        return updateWith({ x: loopable.loop.start.x });
      }
    }
  }

  return loopable;
};

export const loopDown = loop(DOWN);
export const loopUp = loop(UP);
export const loopRight = loop(RIGHT);
export const loopLeft = loop(LEFT);
