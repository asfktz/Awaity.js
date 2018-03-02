import _mapSeries from '../mapSeries';
export default function mapSeries(mapper) {
  return function (iterable) {
    return _mapSeries(iterable, mapper);
  };
}