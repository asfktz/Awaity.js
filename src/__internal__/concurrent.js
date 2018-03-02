import { repeat, identity, defaults, noop } from './utils';

function run(...args) {
  const [
    iterator,
    isFulfilled,
    transform,
    onResolved,
    onRejected,
    onCompleted,
  ] = args;

  const iteration = iterator.next();

  if (iteration.done || isFulfilled()) return;

  const [key, value] = iteration.value;

  transform(value, key)
    .then(resolved => onResolved(resolved, key))
    .catch(error => onRejected(error, key))
    .then(() => {
      onCompleted();
      run(...args);
    });
}

export default function concurrent(_options) {
  return values => new Promise((resolve, reject) => {
    const options = defaults(_options, {
      limit: values.length,
      breakOnError: true,
      transform: identity,
      onCompleted: () => noop,
      onResolved: noop,
      onRejected: noop,
    });

    let count = 0;
    let fulfilled = false;
    let errors = [];

    const iterator = values.entries();

    const isFulfilled = () => fulfilled;

    function done(value) {
      resolve(value);
      fulfilled = true;
    }

    function throws(error) {
      reject(error);
      fulfilled = true;
    }

    function onCompleted() {
      if (options.breakOnError && errors.length) {
        throws(errors[0]);
        return;
      }

      options.onCompleted(done, throws)(count, values, errors);
    }

    function onRejected(error) {
      if (fulfilled) { return; }
      count += 1;
      errors = errors.concat(error);
      return options.onRejected(error);
    }

    function onResolved(value, key) {
      if (fulfilled) { return; }
      count += 1;

      return options.onResolved(value, key, values, count);
    }

    const transform = (value, key) => {
      return Promise.resolve(options.transform(value, key, values, count));
    };

    repeat(options.limit, () => run(
      iterator,
      isFulfilled,
      transform,
      onResolved,
      onRejected,
      onCompleted,
    ));
  });
}
