'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mapSeries;

var _mapSeries2 = require('../mapSeries');

var _mapSeries3 = _interopRequireDefault(_mapSeries2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapSeries(mapper) {
  return function (iterable) {
    return (0, _mapSeries3.default)(iterable, mapper);
  };
}