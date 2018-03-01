function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import series from './internal/series';

export default function mapSeries(iterable, mapper) {
  return Promise.all(iterable).then(series(function (results, value, key, values) {
    return Promise.resolve(value).then(function (resolved) {
      return mapper(resolved, key, values);
    }).then(function (resolved) {
      return [].concat(_toConsumableArray(results), [resolved]);
    });
  }));
}