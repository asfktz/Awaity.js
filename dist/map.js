'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = map;

var _concurrent = require('./internal/concurrent');

var _concurrent2 = _interopRequireDefault(_concurrent);

var _utils = require('./internal/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function map(iterable, mapper) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (iterable.length <= options.concurrency) {
    return Promise.all(iterable).then(function (values) {
      return values.map(mapper);
    });
  }

  var resolved = {};
  return Promise.all(iterable).then((0, _concurrent2.default)({
    limit: options.concurrency,
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