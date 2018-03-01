import concurrent from './internal/concurrent';
import resolveIterable from './internal/resolveIterable';
import { toArray } from './internal/utils';

export default function map(iterable, mapper) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (iterable.length <= options.concurrency) {
    return Promise.all(iterable).then(function (values) {
      return values.map(mapper);
    });
  }

  var resolved = {};
  return resolveIterable(iterable).then(concurrent({
    limit: options.concurrency,
    breakOnError: true,
    transform: mapper,
    onResolved: function onResolved(value, key) {
      resolved[key] = value;
    },

    onCompleted: function onCompleted(done) {
      return function (count, values) {
        if (count === values.length) {
          done(toArray(resolved));
        }
      };
    }
  }));
}