const Graphics = (function () {
  "use strict";

  const Canvas = document.getElementById("game-screen");
  const Context = Canvas.getContext("2d");

  const drawGraphicElement = (graphicElement) => {
    Context.drawImage(
      graphicElement.image,
      graphicElement.x,
      graphicElement.y,
      graphicElement.width,
      graphicElement.height
    );
  };

  return ({
    background,
    seabottom,
    cliff1_0,
    cliff1_1,
    cliff2_0,
    cliff2_1,
    seaweed,
    player,
    bubbles,
  }) => {
    [
      background,
      seabottom,
      cliff1_0,
      cliff1_1,
      cliff2_0,
      cliff2_1,
      seaweed,
      player,
      ...bubbles,
    ].forEach(drawGraphicElement);
  };
})();
