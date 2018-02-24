import concurrent from './internal/concurrent';
import { toArray } from './internal/utils';

export default function map(iterable, mapper, options = {}) {
  const limit = options.concurrency || Infinity;

  if (iterable.length <= limit) {
    const promises = iterable.map((value, key) => {
      return Promise.resolve(value).then((resolved) => {
        return mapper(resolved, key, iterable);
      });
    });

    return Promise.all(promises);
  }

  const resolved = {};
  const promise = concurrent(iterable, limit, {
    transform: mapper,
    onResolved(value, key) {
      resolved[key] = value;
    },
    shouldStop(count, values) {
      return (count === values.length);
    },
  });

  return promise.then(() => toArray(resolved));
}

