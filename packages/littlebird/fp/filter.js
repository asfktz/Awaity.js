'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;

var _filter2 = require('../filter');

var _filter3 = _interopRequireDefault(_filter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filter(filterer, options) {
  return function (iterable) {
    return (0, _filter3.default)(iterable, filterer, options);
  };
}