'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = map;

var _concurrent = require('./__internal__/concurrent');

var _concurrent2 = _interopRequireDefault(_concurrent);

var _resolveIterable = require('./__internal__/resolveIterable');

var _resolveIterable2 = _interopRequireDefault(_resolveIterable);

var _utils = require('./__internal__/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function map(iterable, mapper) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var concurrency = options.concurrency;


  if (!concurrency || iterable.length <= concurrency) {
    return (0, _resolveIterable2.default)(iterable).then(function (values) {
      return values.map(mapper);
    });
  }

  var resolved = {};

  return (0, _resolveIterable2.default)(iterable).then((0, _concurrent2.default)({
    limit: concurrency,
    breakOnError: true,
    transform: mapper,
    onResolved: function onResolved(value, key) {
      resolved[key] = value;
    },

    onCompleted: function onCompleted(done) {
      return function (count, values) {
        if (count === values.length) {
          done((0, _utils.toArray)(resolved));
        }
      };
    }
  }));
}