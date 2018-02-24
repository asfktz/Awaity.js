import { repeat, size, toArray } from './utils';

function run(iterator, onResolved, onRejected) {
  const iteration = iterator.next();

  if (iteration.done) return;

  const [key, lazyPromise] = iteration.value;

  lazyPromise()
    .then((value) => {
      onResolved(value, key);
      run(iterator, onResolved);
    })
    .catch(onRejected);
}

export default function concurrent(lazyPromises, limit) {
  return new Promise((resolve, reject) => {
    const resolved = {};
    const iterator = lazyPromises.entries();
    const onRejected = reject;
    const onResolved = (value, key) => {
      resolved[key] = value;

      if (size(resolved) === size(lazyPromises)) {
        resolve(toArray(resolved));
      }
    };

    repeat(limit, () => run(iterator, onResolved, onRejected));
  });
}
