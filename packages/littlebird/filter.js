'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;

var _concurrent = require('./__internal__/concurrent');

var _concurrent2 = _interopRequireDefault(_concurrent);

var _resolveIterable = require('./__internal__/resolveIterable');

var _resolveIterable2 = _interopRequireDefault(_resolveIterable);

var _utils = require('./__internal__/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filter(iterable, filterer) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var resolved = {};

  var promise = (0, _resolveIterable2.default)(iterable).then((0, _concurrent2.default)({
    limit: options.concurrency,
    onResolved: function onResolved(value, key, values) {
      var maybePromise = filterer(value, key, values);
      return Promise.resolve(maybePromise).then(_utils.toBoolean).then(function (bool) {
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