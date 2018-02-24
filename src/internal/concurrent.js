import { repeat, identity, defaults, noop } from './utils';

function run(...args) {
  const [
    iterator, transform, shouldStop, onResolved, onRejected,
  ] = args;

  const iteration = iterator.next();

  if (iteration.done || shouldStop()) return;

  const [key, value] = iteration.value;

  transform(value, key)
    .then(resolved => onResolved(resolved, key))
    .catch(error => onRejected(error, key))
    .then(() => run(...args));
}

export default function concurrent(_options) {
  return values => new Promise((resolve, reject) => {
    const options = defaults(_options, {
      limit: values.length,
      breakOnError: true,
      onResolved: noop,
      onRejected: noop,
      transform: identity,
    });

    let count = 0;
    let fulfilled = false;

    const iterator = values.entries();

    const shouldStop = () => fulfilled || options.shouldStop(count, values);

    const onCall = fn => (...args) => {
      if (fulfilled) { return; }
      count += 1;

      // eslint-disable-next-line consistent-return
      return fn(...args);
    };

    const onRejected = onCall((err) => {
      options.onRejected(err);

      if (options.breakOnError) {
        reject();
        fulfilled = true;
      }
    });

    const onResolved = onCall((value, key) => {
      return Promise.resolve()
        .then(() => options.onResolved(value, key, values, count))
        .then(() => {
          if (shouldStop()) {
            resolve();
            fulfilled = true;
          }
        });
    });

    const transform = (value, key) => {
      return Promise.resolve(options.transform(value, key, values));
    };

    repeat(options.limit, () => run(iterator, transform, shouldStop, onResolved, onRejected));
  });
}
