var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import mapSeries from '../mapSeries';
import { wait, measureTime, around } from './utils';

test('should run serially', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
  var iterable, duration, expectedTime, actualTime;
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          iterable = [1, 2, 3, 4, 5, 6];
          duration = 100;
          expectedTime = iterable.length * duration;
          _context3.next = 5;
          return measureTime(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var results;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return mapSeries(iterable, function () {
                      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(i) {
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                _context.next = 2;
                                return wait(duration);

                              case 2:
                                return _context.abrupt('return', Promise.resolve(i + '!'));

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
                    }());

                  case 2:
                    results = _context2.sent;


                    expect(results).toEqual(['1!', '2!', '3!', '4!', '5!', '6!']);

                  case 4:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2, _this);
          })));

        case 5:
          actualTime = _context3.sent;


          expect(around(actualTime, expectedTime, 50)).toBe(true);

        case 7:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee3, _this);
})));