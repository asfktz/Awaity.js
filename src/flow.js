import resolveAll from './__internal__/resolveAll';
import series from './__internal__/series';

export default function flow(value, fns) {
  return resolveAll(value, false).then((initial) => {
    return series((val, fn) => fn(val), initial)(fns);
  });
}
