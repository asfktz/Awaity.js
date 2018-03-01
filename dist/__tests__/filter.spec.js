var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import filter from '../filter';
import { wait, measureTime, around } from './utils';

test('should limit concurrent promises to 2', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
  var iterable, limit, duration, expectedTime, actualTime;
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          iterable = [1, 2, 3, 4, 5, 6];
          limit = 2;
          duration = 100;
          expectedTime = iterable.length * duration / limit;
          _context3.next = 6;
          return measureTime(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var results;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return filter(iterable, function () {
                      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(i) {
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                _context.next = 2;
                                return wait(duration);

                              case 2:
                                return _context.abrupt('return', i <= 3);

                              case 3:
                              case 'end':
                                return _context.stop();
                            }
                          }
                        }, _callee, _this);
                      }));

                      return function (_x) {
                        return _ref3.apply(this, arguments);
                      };
                    }(), { concurrency: limit });

                  case 2:
                    results = _context2.sent;


                    expect(results).toEqual([1, 2, 3]);

                  case 4:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2, _this);
          })));

        case 6:
          actualTime = _context3.sent;


          expect(around(actualTime, expectedTime, 60)).toBe(true);

        case 8:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee3, _this);
})));

test('should fail on first error ', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
  var promises, error;
  return regeneratorRuntime.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
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
          _context5.prev = 2;
          _context5.next = 5;
          return filter(promises, function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(i) {
              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      return _context4.abrupt('return', i === '3');

                    case 1:
                    case 'end':
                      return _context4.stop();
                  }
                }
              }, _callee4, _this);
            }));

            return function (_x2) {
              return _ref5.apply(this, arguments);
            };
          }());

        case 5:
          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5['catch'](2);

          error = _context5.t0;

        case 10:

          expect(error.message).toBe('2');

        case 11:
        case 'end':
          return _context5.stop();
      }
    }
  }, _callee5, _this, [[2, 7]]);
})));