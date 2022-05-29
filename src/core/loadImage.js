export const loadImage = (imageUrl) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };

    image.onerror = () => {
      const loadError = new Error(
        `Failed to load image: \n${imageUrl} \nDo you have a typo in you image url?`
      );
      reject(loadError);
    };

    image.src = imageUrl;
  });
