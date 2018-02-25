'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;

var _concurrent = require('./internal/concurrent');

var _concurrent2 = _interopRequireDefault(_concurrent);

var _utils = require('./internal/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filter(iterable, _filterer) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var resolved = {};

  var filterer = function filterer(value, key, values) {
    var maybePromise = _filterer(value, key, values);
    return Promise.resolve(maybePromise).then(_utils.toBoolean);
  };

  var promise = Promise.all(iterable).then((0, _concurrent2.default)({
    limit: options.concurrency,
    onResolved: function onResolved(value, key, values) {
      return filterer(value, key, values).then(_utils.toBoolean).then(function (bool) {
        if (bool) {
          resolved[key] = value;
        }
      });
    },

    onCompleted: function onCompleted(done) {
      return function (count, values) {
        if (count === values.length) {
          done((0, _utils.toArray)(resolved));
        }
      };
    }
  }));

  return promise.then(function () {
    return (0, _utils.toArray)(resolved);
  });
}