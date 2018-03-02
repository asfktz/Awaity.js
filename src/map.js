import concurrent from './__internal__/concurrent';
import resolveIterable from './__internal__/resolveIterable';
import { toArray } from './__internal__/utils';

export default function map(iterable, mapper, options = {}) {
  if (iterable.length <= options.concurrency) {
    return Promise.all(iterable).then(values => values.map(mapper));
  }

  const resolved = {};
  return resolveIterable(iterable)
    .then(concurrent({
      limit: options.concurrency,
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

