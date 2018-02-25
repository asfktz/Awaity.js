'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.any = any;

var _all = require('./all');

var _all2 = _interopRequireDefault(_all);

var _race = require('./race');

var _race2 = _interopRequireDefault(_race);

var _props = require('./props');

var _props2 = _interopRequireDefault(_props);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

var _mapSeries = require('./mapSeries');

var _mapSeries2 = _interopRequireDefault(_mapSeries);

var _reduce = require('./reduce');

var _reduce2 = _interopRequireDefault(_reduce);

var _each = require('./each');

var _each2 = _interopRequireDefault(_each);

var _filter = require('./filter');

var _filter2 = _interopRequireDefault(_filter);

var _some = require('./some');

var _some2 = _interopRequireDefault(_some);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  all: _all2.default,
  race: _race2.default,
  props: _props2.default,
  map: _map2.default,
  mapSeries: _mapSeries2.default,
  reduce: _reduce2.default,
  each: _each2.default,
  filter: _filter2.default,
  some: _some2.default
};
function any() {}