import concurrent from './__internal__/concurrent';
import { SubError } from './__internal__/errors';
import { size, isDefined } from './__internal__/utils';

export default function any(iterable) {
  let winner;

  return Promise.resolve(iterable)
    .then(concurrent({
      breakOnError: false,
      onItemResolved(value) {
        if (!isDefined(winner)) { winner = value };
      },
      onItemCompleted: (done, throws) => (count, values, errors) => {
        if (isDefined(winner)) {
          done(winner);
        }
        else if (size(errors) === size(values)) {
          throws(new SubError(errors));
        }
      },
    }));
}
