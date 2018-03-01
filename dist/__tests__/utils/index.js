function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

export var wait = function wait(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};

export var measureTime = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(fn) {
    var startTime, endTime;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            startTime = Date.now();
            _context.next = 3;
            return fn();

          case 3:
            endTime = Date.now();
            return _context.abrupt("return", endTime - startTime);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function measureTime(_x) {
    return _ref.apply(this, arguments);
  };
}();

export function around(actualTime, expectedTime, offset) {
  if (Math.abs(expectedTime - actualTime) > offset) {
    console.error({
      diff: expectedTime - actualTime,
      expectedTime: expectedTime,
      actualTime: actualTime,
      offset: offset
    });

    return false;
  }

  return true;
}

export var syncify = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(fn) {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return fn();

          case 3:
            result = _context2.sent;
            return _context2.abrupt("return", function () {
              return result;
            });

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", function () {
              throw _context2.t0;
            });

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 7]]);
  }));

  return function syncify(_x2) {
    return _ref2.apply(this, arguments);
  };
}();