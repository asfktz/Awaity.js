'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = each;

var _series = require('./__internal__/series');

var _series2 = _interopRequireDefault(_series);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function each(iterable, iterator) {
  return Promise.all(iterable).then((0, _series2.default)(function (results, value, key, values) {
    return iterator(value, key, values);
  })).then(function () {
    return undefined;
  });
}