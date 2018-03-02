'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mapSeries;

var _series = require('./__internal__/series');

var _series2 = _interopRequireDefault(_series);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function mapSeries(iterable, mapper) {
  return Promise.all(iterable).then((0, _series2.default)(function (results, value, key, values) {
    return Promise.resolve(value).then(function (resolved) {
      return mapper(resolved, key, values);
    }).then(function (resolved) {
      return [].concat(_toConsumableArray(results), [resolved]);
    });
  }));
}