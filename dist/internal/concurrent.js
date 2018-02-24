'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = concurrent;

var _utils = require('./utils');

function run(iterator, onResolved, onRejected) {
  var iteration = iterator.next();

  if (iteration.done) return;

  var _iteration$value = _slicedToArray(iteration.value, 2),
      key = _iteration$value[0],
      lazyPromise = _iteration$value[1];

  lazyPromise().then(function (value) {
    onResolved(value, key);
    run(iterator, onResolved);
  }).catch(onRejected);
}

function concurrent(lazyPromises, limit) {
  return new Promise(function (resolve, reject) {
    var resolved = {};
    var iterator = lazyPromises.entries();
    var onRejected = reject;
    var onResolved = function onResolved(value, key) {
      resolved[key] = value;

      if ((0, _utils.size)(resolved) === (0, _utils.size)(lazyPromises)) {
        resolve((0, _utils.toArray)(resolved));
      }
    };

    (0, _utils.repeat)(limit, function () {
      return run(iterator, onResolved, onRejected);
    });
  });
}