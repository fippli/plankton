const ENTER = "ENTER";
const LEFT = "LEFT";
const RIGHT = "RIGHT";
const UP = "UP";
const DOWN = "DOWN";
const G = "G";

const keymap = {
  13: ENTER,
  37: LEFT,
  38: UP,
  39: RIGHT,
  40: DOWN,
  71: G,
};

const getKey = (event) => (event.keyCode ? event.keyCode : event.which);

export const inputEvents = (function () {
  "use strict";

  let events = [];

  const add = (userEvent) => {
    events = events.includes(userEvent) ? events : [...events, userEvent];
  };

  const press = (event) => `PRESS_${keymap[getKey(event)]}`;
  const release = (event) => `RELEASE_${keymap[getKey(event)]}`;
  const remove = (match) => {
    events = events.filter((event) => event !== match);
  };

  window.onkeydown = (event) => {
    console.log(press(event));
    remove(release(event));
    add(press(event));
  };

  window.onkeyup = (event) => {
    console.log(release(event));
    remove(press(event));
    add(release(event));
  };

  return (state) => ({
    ...state,
    events,
  });
})();
