import series from './internal/series';

export default function reduce(iterable, reducer) {
  return Promise.all(iterable).then(series(reducer));
}
