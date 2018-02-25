import concurrent from './internal/concurrent';

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
          throws(errors[0]);
        }
      },
    }));
}
