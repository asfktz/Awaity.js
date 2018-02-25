'use strict';

var _some = require('../some');

var _some2 = _interopRequireDefault(_some);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

test('should take only the first two fulfilled promises', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var promises, results;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          promises = [100, 100, 50, 25, 200, 100].map(function (ms, i) {
            return (0, _utils.wait)(ms).then(function () {
              return 'index ' + i;
            });
          });
          _context.next = 3;
          return (0, _some2.default)(promises, 2);

        case 3:
          results = _context.sent;


          expect(results).toEqual(['index 2', 'index 3']);

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
})));

test('should take only the first two fulfilled promises', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
  var promises, error;
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          promises = [100, 100, 50, 25, 200, 100].map(function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ms, i) {
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return (0, _utils.wait)(ms);

                    case 2:
                      if (!(i < 3)) {
                        _context2.next = 4;
                        break;
                      }

                      throw new Error(i);

                    case 4:
                      return _context2.abrupt('return', 'index ' + i);

                    case 5:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee2, undefined);
            }));

            return function (_x, _x2) {
              return _ref3.apply(this, arguments);
            };
          }());
          error = void 0;
          _context3.prev = 2;
          _context3.next = 5;
          return (0, _some2.default)(promises, 3);

        case 5:
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3['catch'](2);

          error = _context3.t0;

        case 10:

          expect(error.message).toBe('2');

        case 11:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee3, undefined, [[2, 7]]);
})));