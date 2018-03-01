export function size(obj) {
  return Array.isArray(obj) ? obj.length : Object.keys(obj).length;
}

export function repeat(count, fn) {
  // eslint-disable-next-line no-plusplus
  for (var i = 0; i < count; i++) {
    fn(i);
  }
}

export function toArray(obj) {
  return Object.keys(obj).map(function (i) {
    return obj[i];
  });
}

export function toBoolean(val) {
  return !!val;
}

export function identity(value) {
  return value;
}

export function defaults(obj, defaultObj) {
  var initial = Object.assign({}, defaultObj);
  return Object.keys(obj).reduce(function (results, key) {
    results[key] = obj[key] === undefined ? defaultObj[key] : obj[key];
    return results;
  }, initial);
}

export function noop() {}