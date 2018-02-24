import concurrent from './internal/concurrent';
import { toArray } from './internal/utils';

export default function some(iterable, total) {
  const resolved = {};

  const promise = Promise.resolve(iterable)
    .then(concurrent({
      onResolved(value, key, values, count) {
        if (count <= total) {
          resolved[key] = value;
        }
      },
      shouldStop(count) {
        return (count === total || count === iterable.length);
      },
    }));

  return promise.then(() => toArray(resolved));
}
