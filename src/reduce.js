import series from './__internal__/series';
import resolveAll from './__internal__/resolveAll';

export default function reduce(iterable, reducer, initial) {
  return resolveAll(iterable).then(series(reducer, initial));
}
