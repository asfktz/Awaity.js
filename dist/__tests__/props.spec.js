var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import props from '../props';

test('props', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var results;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return props({
            a: 'A',
            b: Promise.resolve('B')
          });

        case 2:
          results = _context.sent;


          expect(results).toEqual({ a: 'A', b: 'B' });

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, _this);
})));