var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import map from '../map';
import { wait, measureTime, around, syncify } from './utils';

test('should resolve mapper promise concurrently', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  var results;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return map([1, 2, 3], function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(i) {
              var val;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return Promise.resolve(i + '!');

                    case 2:
                      val = _context.sent;
                      return _context.abrupt('return', val);

                    case 4:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, _this);
            }));

            return function (_x) {
              return _ref2.apply(this, arguments);
            };
          }());

        case 2:
          results = _context2.sent;


          expect(results).toEqual(['1!', '2!', '3!']);

        case 4:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, _this);
})));

test('should resolve iterable of promises ', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
  var promises, results;
  return regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          promises = [1, 2, 3].map(function (i) {
            return Promise.resolve(i);
          });
          _context4.next = 3;
          return map(promises, function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(i) {
              var val;
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return Promise.resolve(i + '!');

                    case 2:
                      val = _context3.sent;
                      return _context3.abrupt('return', val);

                    case 4:
                    case 'end':
                      return _context3.stop();
                  }
                }
              }, _callee3, _this);
            }));

            return function (_x2) {
              return _ref4.apply(this, arguments);
            };
          }());

        case 3:
          results = _context4.sent;


          expect(results).toEqual(['1!', '2!', '3!']);

        case 5:
        case 'end':
          return _context4.stop();
      }
    }
  }, _callee4, _this);
})));

test('should limit concurrent promises to 2', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
  var iterable, limit, duration, expectedTime, actualTime;
  return regeneratorRuntime.wrap(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          iterable = [1, 2, 3, 4, 5, 6];
          limit = 2;
          duration = 100;
          expectedTime = iterable.length * duration / limit;
          _context7.next = 6;
          return measureTime(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
            var results;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.next = 2;
                    return map(iterable, function () {
                      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(i) {
                        var val;
                        return regeneratorRuntime.wrap(function _callee5$(_context5) {
                          while (1) {
                            switch (_context5.prev = _context5.next) {
                              case 0:
                                _context5.next = 2;
                                return wait(duration);

                              case 2:
                                _context5.next = 4;
                                return Promise.resolve(i + '!');

                              case 4:
                                val = _context5.sent;
                                return _context5.abrupt('return', val);

                              case 6:
                              case 'end':
                                return _context5.stop();
                            }
                          }
                        }, _callee5, _this);
                      }));

                      return function (_x3) {
                        return _ref7.apply(this, arguments);
                      };
                    }(), { concurrency: limit });

                  case 2:
                    results = _context6.sent;


                    expect(results).toEqual(['1!', '2!', '3!', '4!', '5!', '6!']);

                  case 4:
                  case 'end':
                    return _context6.stop();
                }
              }
            }, _callee6, _this);
          })));

        case 6:
          actualTime = _context7.sent;


          expect(around(actualTime, expectedTime, 60)).toBe(true);

        case 8:
        case 'end':
          return _context7.stop();
      }
    }
  }, _callee7, _this);
})));

test('should fail on first error', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
  var promises, error;
  return regeneratorRuntime.wrap(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          promises = [100, 80, 50, 100, 100, 100].map(function (ms, i) {
            return wait(ms).then(function () {
              if (i === 1 || i === 2) {
                throw new Error(i);
              }

              return i;
            });
          });
          error = void 0;
          _context9.prev = 2;
          _context9.next = 5;
          return map(promises, function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(i) {
              var val;
              return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      _context8.next = 2;
                      return Promise.resolve(i + '!');

                    case 2:
                      val = _context8.sent;
                      return _context8.abrupt('return', val);

                    case 4:
                    case 'end':
                      return _context8.stop();
                  }
                }
              }, _callee8, _this);
            }));

            return function (_x4) {
              return _ref9.apply(this, arguments);
            };
          }());

        case 5:
          _context9.next = 10;
          break;

        case 7:
          _context9.prev = 7;
          _context9.t0 = _context9['catch'](2);

          error = _context9.t0;

        case 10:

          expect(error.message).toBe('2');

        case 11:
        case 'end':
          return _context9.stop();
      }
    }
  }, _callee9, _this, [[2, 7]]);
})));