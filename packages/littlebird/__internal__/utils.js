"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.size = size;
exports.repeat = repeat;
exports.toArray = toArray;
exports.toBoolean = toBoolean;
exports.identity = identity;
exports.defaults = defaults;
exports.noop = noop;
function size(obj) {
  return Array.isArray(obj) ? obj.length : Object.keys(obj).length;
}

function repeat(count, fn) {
  // eslint-disable-next-line no-plusplus
  for (var i = 0; i < count; i++) {
    fn(i);
  }
}

function toArray(obj) {
  return Object.keys(obj).map(function (i) {
    return obj[i];
  });
}

function toBoolean(val) {
  return !!val;
}

function identity(value) {
  return value;
}

function defaults(obj, defaultObj) {
  var initial = Object.assign({}, defaultObj);
  return Object.keys(obj).reduce(function (results, key) {
    results[key] = obj[key] === undefined ? defaultObj[key] : obj[key];
    return results;
  }, initial);
}

function noop() {}