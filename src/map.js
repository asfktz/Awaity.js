import resolveIterable from './__internal__/resolveIterable';
import { identity } from './__internal__/utils';

export default function map(iterable, mapper = identity) {
  return resolveIterable(iterable).then((values) => {
    return Promise.all(values.map(mapper));
  });
}

