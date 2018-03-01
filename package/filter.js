import concurrent from './internal/concurrent';
import { toArray, toBoolean } from './internal/utils';

export default function filter(iterable, _filterer) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var resolved = {};

  var filterer = function filterer(value, key, values) {
    var maybePromise = _filterer(value, key, values);
    return Promise.resolve(maybePromise).then(toBoolean);
  };

  var promise = Promise.all(iterable).then(concurrent({
    limit: options.concurrency,
    onResolved: function onResolved(value, key, values) {
      return filterer(value, key, values).then(toBoolean).then(function (bool) {
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