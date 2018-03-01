function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SubError = function (_Error) {
  _inherits(SubError, _Error);

  function SubError(errors) {
    _classCallCheck(this, SubError);

    var _this = _possibleConstructorReturn(this, (SubError.__proto__ || Object.getPrototypeOf(SubError)).call(this, errors));

    var multiStack = errors.reduce(function (str, error) {
      str += '\n\n' + error.stack;
      return str;
    }, '');

    _this.message = 'SubError ' + multiStack;
    return _this;
  }

  return SubError;
}(Error);

export default SubError;