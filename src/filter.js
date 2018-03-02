import concurrent from './__internal__/concurrent';
import { toArray, toBoolean } from './__internal__/utils';

export default function filter(iterable, _filterer, options = {}) {
  const resolved = {};

  const filterer = (value, key, values) => {
    const maybePromise = _filterer(value, key, values);
    return Promise.resolve(maybePromise).then(toBoolean);
  };

  const promise = Promise.all(iterable)
    .then(concurrent({
      limit: options.concurrency,
      onResolved(value, key, values) {
        return filterer(value, key, values)
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
