import concurrent from './internal/concurrent';
import { toArray, size } from './internal/utils';

export default function some(iterable, total) {
  var resolved = {};

  return Promise.resolve(iterable).then(concurrent({
    breakOnError: false,
    onResolved: function onResolved(value, key, values, count) {
      if (count <= total) {
        resolved[key] = value;
      }
    },

    onCompleted: function onCompleted(done, throws) {
      return function (count, values, errors) {
        var tooManyFails = values.length - errors.length <= total;

        if (tooManyFails) {
          throws(errors[0]);
        } else if (size(resolved) === total) {
          done(toArray(resolved));
        }
      };
    }
  }));
}