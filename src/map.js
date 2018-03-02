import concurrent from './__internal__/concurrent';
import resolveIterable from './__internal__/resolveIterable';
import { toArray } from './__internal__/utils';

export default function map(iterable, mapper, options = {}) {
  const { concurrency } = options;
  const iterablePromise = resolveIterable(iterable);
  const resolved = {};

  if (!concurrency || iterable.length <= concurrency) {
    return iterablePromise.then(values => Promise.all(values.map(mapper)));
  }

  return iterablePromise
    .then(concurrent({
      limit: concurrency,
      breakOnError: true,
      transform: mapper,
      onResolved(value, key) {
        resolved[key] = value;
      },
      onCompleted: done => (count, values) => {
        if (count === values.length) {
          done(toArray(resolved));
        }
      },
    }));
}

