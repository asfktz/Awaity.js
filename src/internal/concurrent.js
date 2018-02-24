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

export default function concurrent(iterable, limit, callbacks) {
  return Promise.all(iterable).then((values) => {
    return new Promise((resolve, reject) => {
      let count = 0;
      const iterator = values.entries();
      const onRejected = reject;

      const transform = (value, key) => {
        const callback = callbacks.transform || identity;
        return Promise.resolve(callback(value, key, values));
      };

      const shouldStop = () => {
        return callbacks.shouldStop(count, values);
      };

      const onResolved = (value, key) => {
        return Promise.resolve()
          .then(() => callbacks.onResolved(value, key, values))
          .then(() => {
            count += 1;

            if (shouldStop()) {
              resolve();
            }
          });
      };

      repeat(limit, () => run(iterator, transform, shouldStop, onResolved, onRejected));
    });
  });
}
