import { repeat, identity } from './utils';

function run(...args) {
  const [
    iterator, transform, shouldStop, onResolved, onRejected,
  ] = args;

  const iteration = iterator.next();

  if (iteration.done || shouldStop()) return;

  const [key, value] = iteration.value;

  transform(value, key)
    .then(resolved => onResolved(resolved, key))
    .then(() => run(...args))
    .catch(onRejected);
}

export default function concurrent(options) {
  return values => new Promise((resolve, reject) => {
    const limit = options.limit || values.length;

    let count = 0;
    let fulfilled = false;

    const iterator = values.entries();

    const done = () => {
      resolve();
      fulfilled = true;
    };

    const onRejected = reject;

    const shouldStop = () => fulfilled || options.shouldStop(count, values);

    const transform = (value, key) => {
      const callback = options.transform || identity;
      return Promise.resolve(callback(value, key, values));
    };

    const onResolved = (value, key) => {
      if (fulfilled) { return Promise.resolve(); }

      count += 1;

      return Promise.resolve()
        .then(() => options.onResolved(value, key, values, count))
        .then(() => {
          if (shouldStop()) {
            done();
          }
        });
    };

    repeat(limit, () => run(iterator, transform, shouldStop, onResolved, onRejected));
  });
}
