'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reduce;

var _reduce2 = require('../reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reduce(reducer) {
  return function (iterable) {
    return (0, _reduce3.default)(iterable, reducer);
  };
}