export const modifyObject = (object) => (update) =>
  Object.keys(update).reduce((next, key) => {
    if (typeof object[key] !== "object" || Array.isArray(object[key])) {
      return Object.assign(next, {
        [key]: update[key],
      });
    }

    return Object.assign(next, {
      [key]: Object.assign(next[key], update[key]),
    });
  }, object);
