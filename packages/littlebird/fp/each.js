'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = each;

var _each2 = require('../each');

var _each3 = _interopRequireDefault(_each2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function each(iterator) {
  return function (iterable) {
    return (0, _each3.default)(iterable, iterator);
  };
}