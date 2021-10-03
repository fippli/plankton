const identity = (x) => x;

const isNull = (x) => x === null;
const isNotNull = (x) => x !== null;

const onCondition = (condition, yes, no) => {
  if (condition) {
    console.log("yes!", yes);
    return yes;
  }
  return no;
};

const random = (start, end) => Math.floor(Math.random() * end + start);

const between =
  ({ x: ax, width: aw }) =>
  ({ x: bx, width: bw }) =>
    ax < bx + bw && ax + aw > bx;

const onTop =
  ({ y: ay, height: ah }) =>
  ({ y: by, height: bh }) =>
    ay + ah - 5 <= by && ay + ah + 5 > by;

const filter = (f) => (xs) => xs.filter(f);
