import { IterableError } from './errors';
import { isIterable } from './utils';

function resolve(promises) {
  return Array.isArray(promises)
    ? Promise.all(promises)
    : Promise.resolve(promises);
}

export default function resolveAll(promises, rejectNonIterable = true) {
  return resolve(promises).then((resolved) => {
    if (rejectNonIterable && !isIterable(resolved)) {
      return Promise.reject(IterableError(resolved));
    }

    return resolved;
  });
}
