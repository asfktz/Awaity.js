import concurrent from './__internal__/concurrent';
import { toArray, size } from './__internal__/utils';

export default function some(iterable, total) {
  const resolved = {};

  return Promise.resolve(iterable)
    .then(concurrent({
      breakOnError: false,
      onItemResolved(value, key) {
        resolved[key] = value;
      },
      onItemCompleted: (done, throws) => (count, values, errors) => {
        const tooManyFails = (values.length - errors.length) <= total;

        if (tooManyFails) {
          throws(errors[0]);
        } else if (size(resolved) === total) {
          done(toArray(resolved));
        }
      },
    }));
}
