import series from './__internal__/series';
import resolveIterable from './__internal__/resolveIterable';

export default function reduce(iterable, reducer, initial) {
  return resolveIterable(iterable).then(series(reducer, initial));
}
