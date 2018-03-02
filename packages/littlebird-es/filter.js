import concurrent from './__internal__/concurrent';
import resolveIterable from './__internal__/resolveIterable';
import { toArray, toBoolean } from './__internal__/utils';

export default function filter(iterable, filterer) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var resolved = {};

  var promise = resolveIterable(iterable).then(concurrent({
    limit: options.concurrency,
    onResolved: function onResolved(value, key, values) {
      var maybePromise = filterer(value, key, values);
      return Promise.resolve(maybePromise).then(toBoolean).then(function (bool) {
        if (bool) {
          resolved[key] = value;
        }
      });
    },

    onCompleted: function onCompleted(done) {
      return function (count, values) {
        if (count === values.length) {
          done(toArray(resolved));
        }
      };
    }
  }));

  return promise.then(function () {
    return toArray(resolved);
  });
}