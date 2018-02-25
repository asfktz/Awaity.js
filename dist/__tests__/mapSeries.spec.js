'use strict';

var _mapSeries = require('../mapSeries');

var _mapSeries2 = _interopRequireDefault(_mapSeries);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
          return (0, _utils.measureTime)(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var results;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return (0, _mapSeries2.default)(iterable, function () {
                      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(i) {
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                _context.next = 2;
                                return (0, _utils.wait)(duration);

                              case 2:
                                return _context.abrupt('return', Promise.resolve(i + '!'));

                              case 3:
                              case 'end':
                                return _context.stop();
                            }
                          }
                        }, _callee, undefined);
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
            }, _callee2, undefined);
          })));

        case 5:
          actualTime = _context3.sent;


          expect((0, _utils.around)(actualTime, expectedTime, 50)).toBe(true);

        case 7:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee3, undefined);
})));