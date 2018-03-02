"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveIterable;
function resolveIterable(iterable) {
  if (!Array.isArray(iterable)) {
    return Promise.resolve(iterable);
  }

  return Promise.all(iterable);
}