import concurrent from './internal/concurrent';
import { toArray } from './internal/utils';

export default function some(iterable, total) {
  const limit = Infinity;
  const resolved = {};
  let count = 0;

  const promise = concurrent(iterable, limit, {
    onResolved(value, key) {
      count += 1;

      if (count <= total) {
        resolved[key] = value;
      }
    },
    shouldStop() {
      console.log(count, total, iterable.length);
      return (count === total || count === iterable.length);
    },
  });

  return promise.then(() => toArray(resolved));
}
