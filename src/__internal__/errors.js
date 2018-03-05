function customError(fn, BaseError) {
  BaseError = BaseError || Error;

  function SubError() {
    // eslint-disable-next-line no-proto
    const _this = SubError.__proto__.apply(this, arguments);
    Object.assign(_this, fn.apply(null, arguments));
    return _this;
  }

  Object.setPrototypeOf(SubError, BaseError);
  return SubError;
}

export const SubError = customError((errors) => {
  const multiStack = errors.reduce(function (str, error) {
    str += '\n\n' + error.stack;
    return str;
  }, '');

  return {
    name: 'SubError',
    message: 'SubError ' + multiStack,
  };
}, Error);


export const IterableError = customError((value) => {
  const type = (value === null) ? 'null' : typeof value;

  return {
    name: 'IterableError',
    message: 'expecting an array or an iterable object but got ' + type,
  };
}, TypeError);
