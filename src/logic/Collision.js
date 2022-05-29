const Collision = (function () {
  "use strict";

  return (state) => (actions) =>
    new Promise((resolve, _) => resolve([...actions, playerCollisions(state)]));
})();
