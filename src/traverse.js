let seenObjects = new Set();

export default (value) => {
  _traverse(value, seenObjects);
  seenObjects.clear();
};

let _traverse = (val, seen) => {
  if (val.__ob__) {
    if (seen.has(val.__ob__.dep.id)) return;
    seen.add(val.__ob__.dep.id)
  }
  if (typeof val === 'object') {
    if (val instanceof Array) {
      let i = val.length;
      while (i--) {
        _traverse(val[i], seen)
      }
    } else {
      let keys = Object.keys(val);
      let i = keys.length;
      while (i--) {
        _traverse(val[keys[i]], seen)
      }
    }
  }
};
