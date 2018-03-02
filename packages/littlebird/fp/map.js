'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = map;

var _map2 = require('../map');

var _map3 = _interopRequireDefault(_map2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function map(mapper, options) {
  return function (iterable) {
    return (0, _map3.default)(iterable, mapper, options);
  };
}