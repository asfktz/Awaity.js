import series from './__internal__/series';

export default function each(iterable, iterator) {
  return Promise.all(iterable).then(series(function (results, value, key, values) {
    return iterator(value, key, values);
  })).then(function () {
    return undefined;
  });
}