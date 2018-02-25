'use strict';

var _each = require('../each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

test('should iterate each serially', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  var iterable, str, returns;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          iterable = [1, 2, 3, 4, 5, 6];
          str = '';
          _context2.next = 4;
          return (0, _each2.default)(iterable, function () {
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

                      str += val;

                    case 4:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, undefined);
            }));

            return function (_x) {
              return _ref2.apply(this, arguments);
            };
          }(), '');

        case 4:
          returns = _context2.sent;


          expect(returns).toBe(undefined);
          expect(str).toBe('1!2!3!4!5!6!');

        case 7:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, undefined);
})));