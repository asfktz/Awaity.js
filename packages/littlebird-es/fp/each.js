import _each from '../each';
export default function each(iterator) {
  return function (iterable) {
    return _each(iterable, iterator);
  };
}