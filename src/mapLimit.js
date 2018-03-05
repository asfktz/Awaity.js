import concurrent from './__internal__/concurrent';
import resolveIterable from './__internal__/resolveAll';
import { toArray, identity } from './__internal__/utils';
import map from './map';

export default function mapLimit(iterable, mapper = identity, limit) {
  const resolved = {};

  if (!limit || iterable.length <= limit) {
    return map(iterable, mapper);
  }

  return resolveIterable(iterable)
    .then(concurrent({
      limit: limit,
      breakOnError: true,
      transform: mapper,
      onItemResolved(value, key) {
        resolved[key] = value;
      },
      onItemCompleted: done => (count, values) => {
        if (count === values.length) {
          done(toArray(resolved));
        }
      },
    }));
}

