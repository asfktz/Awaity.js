'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = some;

var _some2 = require('../some');

var _some3 = _interopRequireDefault(_some2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function some(total) {
  return function (iterable) {
    return (0, _some3.default)(iterable, total);
  };
}