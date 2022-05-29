const Actions = (function () {
  "use strict";

  const pressUp = ({ player: { allowJump, jumping } }) => ({
    player: {
      jumping: allowJump ? true : jumping,
      allowJump: false,
    },
    eternalVoid: true,
    animateBackground: true,
  });

  const pressRight = ({ player }) => ({
    player: {
      x: player.x + player.speed.x,
    },
  });

  const pressLeft = ({ player }) => ({
    player: {
      x: player.x - player.speed.x,
    },
  });

  const getAction = (state) => (eventActions, nextEvent) => {
    switch (nextEvent) {
      case "PRESS_UP": {
        return [...eventActions, pressUp(state)];
      }

      case "PRESS_RIGHT": {
        return [...eventActions, pressRight(state)];
      }

      case "PRESS_LEFT": {
        return [...eventActions, pressLeft(state)];
      }
      default: {
        return eventActions;
      }
    }
  };

  const convertEventsToActions = (state, events) =>
    events.reduce(getAction(state), []);

  return (state) => (events) =>
    new Promise((resolve, _) => resolve(convertEventsToActions(state, events)));
})();
