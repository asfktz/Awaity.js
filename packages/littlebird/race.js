"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = race;
function race(iterable) {
  return Promise.race(iterable);
}