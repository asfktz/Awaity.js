/**
  @module collections
*/

import filterLimit from './filterLimit';

/**
 * @function filter
 */
export default function filter(iterable, filterer) {
  return filterLimit(iterable, filterer);
}
