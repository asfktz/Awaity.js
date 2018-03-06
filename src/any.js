import concurrent from './__internal__/concurrent';
import { SubError } from './__internal__/errors';
import { size } from './__internal__/utils';

export default function any(iterable) {
  let winner;

  return Promise.resolve(iterable)
    .then(concurrent({
      breakOnError: false,
      onItemResolved(value) {
        winner = value;
      },
      onItemCompleted: (done, throws) => (count, values, errors) => {
        if (winner) {
          done(winner);
        } else if (size(errors) === size(values)) {
          throws(new SubError(errors));
        }
      },
    }));
}
