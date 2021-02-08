function deepClone(obj) {
  let buf;
  if (Array.isArray(obj)) {
    buf = obj.map((item) => {
      return deepClone(item);
    });
  } else if (obj instanceof Object) {
    buf = {};
    Object.keys((obj)).forEach((key) => {
      buf[key] = deepClone(obj[key]);
    });
  } else {
    buf = obj;
  }
  return buf;
}
