import concurrent from './__internal__/concurrent';
import resolveAll from './__internal__/resolveAll';
import { toArray, toBoolean } from './__internal__/utils';

export default function filterLimit(iterable, filterer, limit) {
  const resolved = {};

  return resolveAll(iterable)
    .then(concurrent({
      limit: limit,
      onItemResolved(value, key, values) {
        const maybePromise = filterer(value, key, values);
        return Promise.resolve(maybePromise)
          .then(toBoolean)
          .then((bool) => {
            if (bool) {
              resolved[key] = value;
            }
          });
      },
      onItemCompleted: done => (count, values) => {
        if (count === values.length) {
          done(toArray(resolved));
        }
      },
    }));
}
