import concurrent from './__internal__/concurrent';
import resolveIterable from './__internal__/resolveIterable';
import { toArray } from './__internal__/utils';

export default function map(iterable, mapper) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var concurrency = options.concurrency;


  if (!concurrency || iterable.length <= concurrency) {
    return resolveIterable(iterable).then(function (values) {
      return values.map(mapper);
    });
  }

  var resolved = {};

  return resolveIterable(iterable).then(concurrent({
    limit: concurrency,
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