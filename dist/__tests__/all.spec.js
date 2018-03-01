var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import all from '../all';

test('all', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var promises, results;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          promises = [1, 2, 3].map(function (i) {
            return Promise.resolve(i + '!');
          });
          _context.next = 3;
          return all(promises);

        case 3:
          results = _context.sent;

          expect(results).toEqual(['1!', '2!', '3!']);

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, _this);
})));