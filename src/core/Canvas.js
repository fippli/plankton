const elementId = "canvas";

export const Canvas = () => {
  const arcadeWrapper = document.getElementById("root");
  const canvas = document.createElement("canvas");

  canvas.id = elementId;
  canvas.height = arcadeWrapper.offsetHeight;
  canvas.width = canvas.height * (16 / 9);
  canvas.className = elementId;
  arcadeWrapper.appendChild(canvas);

  return {
    context: canvas.getContext("2d"),
    canvas: { width: canvas.width, height: canvas.height },
  };
};
