import concurrent from './__internal__/concurrent';
import resolveIterable from './__internal__/resolveIterable';
import { toArray, toBoolean } from './__internal__/utils';
import filter from './filter';

export default function filterLimit(iterable, filterer, limit) {
  const resolved = {};

  if (!limit || iterable.length <= limit) {
    return filter(iterable, filterer);
  }

  const promise = resolveIterable(iterable)
    .then(concurrent({
      limit: limit,
      onResolved(value, key, values) {
        const maybePromise = filterer(value, key, values);
        return Promise.resolve(maybePromise)
          .then(toBoolean)
          .then((bool) => {
            if (bool) {
              resolved[key] = value;
            }
          });
      },
      onCompleted: done => (count, values) => {
        if (count === values.length) {
          done(toArray(resolved));
        }
      },
    }));

  return promise.then(() => toArray(resolved));
}
