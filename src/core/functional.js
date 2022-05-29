export const identity = (x) => x;

export const isNull = (x) => x === null;
export const isNotNull = (x) => x !== null;

export const onCondition = (condition, yes, no) => {
  if (condition) {
    console.log("yes!", yes);
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
  ({ y: by, height: bh }) =>
    ay + ah - 5 <= by && ay + ah + 5 > by;

export const filter = (f) => (xs) => xs.filter(f);
