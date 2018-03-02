import _reduce from '../reduce';
export default function reduce(reducer) {
  return function (iterable) {
    return _reduce(iterable, reducer);
  };
}