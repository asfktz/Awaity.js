'use strict';

var run = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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


            console.log(results);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function run() {
    return _ref.apply(this, arguments);
  };
}();

var _some = require('./some');

var _some2 = _interopRequireDefault(_some);

var _utils = require('./__tests__/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // import filter from './filter';
// import { wait } from './__tests__/utils';

// async function run() {
//   const promises = [100, 100, 50, 25, 200, 100].map((ms, i) => {
//     return wait(ms).then(() => `index ${i}`);
//   });

//   const results = await filter(promises, (txt) => {
//     return txt === 'index 2';
//   }, { concurrency: 2 });

//   console.log(results);
// }

// run().catch(console.error);


run().catch(console.error);