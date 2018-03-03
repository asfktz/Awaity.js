/**
  @module collections
*/

/**
 * @function race
 */
export default function race(iterable) {
  return Promise.race(iterable);
}
