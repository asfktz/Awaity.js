/**
  * @module collections
*/

import resolveIterable  from './__internal__/resolveIterable';
import { identity } from './__internal__/utils';

/**
 * @function map
 * @param {array|promise|promise[]} iterable - The first color, in hexadecimal format.
 * @param {function} mapper - a mapper function
 * @return {promise}
 */
export default function map(iterable, mapper = identity) {
  return resolveIterable(iterable).then((values) => {
    return Promise.all(values.map(mapper));
  });
}
