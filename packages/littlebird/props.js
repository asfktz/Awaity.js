"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = props;
function props(obj) {
  var keys = Object.keys(obj);
  var values = Object.values(obj);

  return Promise.all(values).then(function (resolvedVals) {
    return resolvedVals.reduce(function (results, val, i) {
      results[keys[i]] = val;
      return results;
    }, {});
  });
}