import concurrent from './internal/concurrent';
import { toArray, toBoolean } from './internal/utils';

export default function filter(iterable, _filterer, options = {}) {
  const limit = options.concurrency || Infinity;
  const resolved = {};

  const filterer = (value, key, values) => {
    const maybePromise = _filterer(value, key, values);
    return Promise.resolve(maybePromise).then(toBoolean);
  };

  const promise = concurrent(iterable, limit, {
    onResolved(value, key, values) {
      return filterer(value, key, values)
        .then(toBoolean)
        .then((bool) => {
          if (bool) {
            resolved[key] = value;
          }
        });
    },
    shouldStop(count, values) {
      return (count === values.length);
    },
  });

  return promise.then(() => toArray(resolved));
}

