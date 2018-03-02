import _map from '../map';
export default function map(mapper, options) {
  return function (iterable) {
    return _map(iterable, mapper, options);
  };
}