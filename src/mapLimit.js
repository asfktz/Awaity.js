/**
  @module collections
*/

import concurrent from './__internal__/concurrent';
import resolveIterable from './__internal__/resolveIterable';
import { toArray, identity } from './__internal__/utils';
import map from './map';

/**
 * @function mapLimit
 */
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

