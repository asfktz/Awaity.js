import _filter from '../filter';
export default function filter(filterer, options) {
  return function (iterable) {
    return _filter(iterable, filterer, options);
  };
}