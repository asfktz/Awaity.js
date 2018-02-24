import concurrent from './internal/concurrent';

export default function any(iterable) {
  let winner;
  let errors = [];

  const promise = Promise.resolve(iterable)
    .then(concurrent({
      breakOnError: false,
      onResolved(value) {
        winner = value;
      },
      onRejected(error) {
        errors = errors.concat(error);
        console.log('rejected', errors);
      },
      shouldStop(count) {
        console.log('shouldStop', count, errors.length, iterable.length);
        return (count > 0 || errors.length === iterable.length);
      },
    }));

  return promise.then(() => {
    console.log('doneWDDFSD')
    return winner === undefined
      ? Promise.resolve(winner)
      : Promise.reject(errors[0]);
  });
}
