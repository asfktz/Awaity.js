var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { repeat, identity, defaults, noop } from './utils';

function run() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var iterator = args[0],
      isFulfilled = args[1],
      transform = args[2],
      onResolved = args[3],
      onRejected = args[4],
      onCompleted = args[5];


  var iteration = iterator.next();

  if (iteration.done || isFulfilled()) return;

  var _iteration$value = _slicedToArray(iteration.value, 2),
      key = _iteration$value[0],
      value = _iteration$value[1];

  transform(value, key).then(function (resolved) {
    return onResolved(resolved, key);
  }).catch(function (error) {
    return onRejected(error, key);
  }).then(function () {
    onCompleted();
    run.apply(undefined, args);
  });
}

export default function concurrent(_options) {
  return function (values) {
    return new Promise(function (resolve, reject) {
      var options = defaults(_options, {
        limit: values.length,
        breakOnError: true,
        transform: identity,
        onCompleted: function onCompleted() {
          return noop;
        },
        onResolved: noop,
        onRejected: noop
      });

      var count = 0;
      var fulfilled = false;
      var errors = [];

      var iterator = values.entries();

      var isFulfilled = function isFulfilled() {
        return fulfilled;
      };

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
        if (fulfilled) {
          return;
        }
        count += 1;
        errors = errors.concat(error);
        return options.onRejected(error);
      }

      function onResolved(value, key) {
        if (fulfilled) {
          return;
        }
        count += 1;

        return options.onResolved(value, key, values, count);
      }

      var transform = function transform(value, key) {
        return Promise.resolve(options.transform(value, key, values, count));
      };

      repeat(options.limit, function () {
        return run(iterator, isFulfilled, transform, onResolved, onRejected, onCompleted);
      });
    });
  };
}