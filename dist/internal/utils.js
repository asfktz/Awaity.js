"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.size = size;
exports.repeat = repeat;
exports.toArray = toArray;
exports.invoke = invoke;
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

function invoke(fn) {
  return fn();
}