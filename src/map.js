import resolveAll from './__internal__/resolveAll';
import { identity } from './__internal__/utils';

export default function map(iterable, mapper = identity) {
  return resolveAll(iterable).then((values) => {
    return Promise.all(values.map(mapper));
  });
}
