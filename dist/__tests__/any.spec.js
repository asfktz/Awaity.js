var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import any from '../any';
import { wait } from './utils';

test('should take only one winner', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var promises, winner;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          promises = [100, 100, 30, 25, 200, 100].map(function (ms, i) {
            return wait(ms).then(function () {
              return 'index ' + i;
            });
          });
          _context.next = 3;
          return any(promises, 2);

        case 3:
          winner = _context.sent;


          expect(winner).toEqual('index 3');

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, _this);
})));

test('should continue even if some of promises fails', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  var promises, winner;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          promises = [100, 100, 30, 25, 100, 100].map(function (ms, i) {
            return wait(ms).then(function () {
              if (i === 1 || i === 4) {
                throw new Error();
              }

              return 'index ' + i;
            });
          });
          _context2.next = 3;
          return any(promises);

        case 3:
          winner = _context2.sent;

          expect(winner).toEqual('index 3');

        case 5:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, _this);
})));

test('should throw if all promises fails', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
  var promises, error;
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          promises = [100, 100, 30, 25, 100, 100].map(function (ms, i) {
            return wait(ms).then(function () {
              throw new Error(i);
            });
          });
          error = void 0;
          _context3.prev = 2;
          _context3.next = 5;
          return any(promises);

        case 5:
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3['catch'](2);

          error = _context3.t0;

        case 10:

          expect(error.message).toBe('3');

        case 11:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee3, _this, [[2, 7]]);
})));