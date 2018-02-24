export function size(obj) {
  return Array.isArray(obj) ? obj.length : Object.keys(obj).length;
}

export function repeat(count, fn) {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < count; i++) { fn(i); }
}

export function toArray(obj) {
  return Object.keys(obj).map(i => obj[i]);
}

export function toBoolean(val) {
  return !!val;
}

export function identity(value) {
  return value;
}
