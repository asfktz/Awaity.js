import series from './__internal__/series';

export default function reduce(iterable, reducer, initial) {
  return Promise.all(iterable).then(series(reducer, initial));
}
