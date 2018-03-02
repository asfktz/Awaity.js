import _some from '../some';
export default function some(total) {
  return function (iterable) {
    return _some(iterable, total);
  };
}