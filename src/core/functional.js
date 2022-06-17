export const identity = (x) => x;

export const isNull = (x) => x === null;
export const isNotNull = (x) => x !== null;

export const onCondition = (condition, yes, no) => {
  if (condition) {
    return yes;
  }
  return no;
};

export const random = (start, end) => Math.floor(Math.random() * end + start);

export const between =
  ({ x: ax, width: aw }) =>
  ({ x: bx, width: bw }) =>
    ax < bx + bw && ax + aw > bx;

export const onTop =
  ({ y: ay, height: ah }) =>
  ({ y: by, height: bh, hitbox }) =>
    ay + ah - hitbox <= by && ay + ah + hitbox > by;

export const filter = (f) => (xs) => xs.filter(f);

export const trace = (x) => {
  console.log(x);
  return x;
};

export const range = (number) => [...Array(number).keys()];
