

export default function resolveIterable(iterable) {
  if (!Array.isArray(iterable)) {
    return Promise.resolve(iterable);
  }

  return Promise.all(iterable);
}
