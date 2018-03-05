import { repeat, identity, defaults, noop } from './utils';

function run(...args) {
  const [
    iterator,
    isFulfilled,
    transform,
    onItemResolved,
    onItemRejected,
    onItemCompleted,
  ] = args;

  const iteration = iterator.next();

  if (iteration.done || isFulfilled()) return;

  const key = iteration.value[0];
  const value = iteration.value[1];

  transform(value, key)
    .then(resolved => onItemResolved(resolved, key))
    .catch(error => onItemRejected(error, key))
    .then(() => {
      onItemCompleted();
      run(...args);
    });
}

export default function concurrent(_options) {
  return values => new Promise((resolve, reject) => {
    const options = defaults(_options, {
      limit: values.length,
      breakOnError: true,
      transform: identity,
      onItemCompleted: () => noop,
      onItemResolved: noop,
      onItemRejected: noop,
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

    function onItemCompleted() {
      count += 1;

      if (options.breakOnError && errors.length) {
        throws(errors[0]);
        return;
      }

      options.onItemCompleted(done, throws)(count, values, errors);
    }

    function onItemRejected(error) {
      if (fulfilled) { return; }
      errors = errors.concat(error);
      return options.onItemRejected(error);
    }

    function onItemResolved(value, key) {
      if (fulfilled) { return; }
      return options.onItemResolved(value, key, values);
    }

    const transform = (value, key) => {
      return Promise.resolve(options.transform(value, key, values));
    };

    repeat(options.limit, () => run(
      iterator,
      isFulfilled,
      transform,
      onItemResolved,
      onItemRejected,
      onItemCompleted,
    ));
  });
}
