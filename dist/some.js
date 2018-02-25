'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = some;

var _concurrent = require('./internal/concurrent');

var _concurrent2 = _interopRequireDefault(_concurrent);

var _utils = require('./internal/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function some(iterable, total) {
  var resolved = {};

  return Promise.resolve(iterable).then((0, _concurrent2.default)({
    breakOnError: false,
    onResolved: function onResolved(value, key, values, count) {
      if (count <= total) {
        resolved[key] = value;
      }
    },

    onCompleted: function onCompleted(done, throws) {
      return function (count, values, errors) {
        var tooManyFails = values.length - errors.length <= total;

        if (tooManyFails) {
          throws(errors[0]);
        } else if ((0, _utils.size)(resolved) === total) {
          done((0, _utils.toArray)(resolved));
        }
      };
    }
  }));
}