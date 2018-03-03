import series from './__internal__/series';

export default function each(iterable, iterator) {
  return Promise.all(iterable)
    .then(series((results, value, key, values) => (
      iterator(value, key, values)
    )))
    .then(() => undefined);
}
