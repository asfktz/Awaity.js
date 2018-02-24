"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = series;
function series(reducer) {
  return function (iterable) {
    var initial = Promise.resolve([]);
    return iterable.reduce(function (chain, value, key) {
      return chain.then(function (results) {
        return reducer(results, value, key);
      });
    }, initial);
  };
}