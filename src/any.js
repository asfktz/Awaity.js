/**
  @module collections
*/

import concurrent from './__internal__/concurrent';
import SubError from './__internal__/SubError';

/**
 * @function any
 */
export default function any(iterable) {
  let winner;

  return Promise.resolve(iterable)
    .then(concurrent({
      breakOnError: false,
      onResolved(value) {
        winner = value;
      },
      onCompleted: (done, throws) => (count, values, errors) => {
        if (winner) {
          done(winner);
        } else if (errors.length === values.length) {
          throws(new SubError(errors));
        }
      },
    }));
}
