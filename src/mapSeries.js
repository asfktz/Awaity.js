/**
  @module collections
*/

import series from './__internal__/series';

/**
 * @function mapSeries
 */
export default function mapSeries(iterable, mapper) {
  return Promise.all(iterable)
    .then(series((results, value, key, values) => {
      return Promise.resolve(value)
        .then(resolved => mapper(resolved, key, values))
        .then((resolved) => {
          results.push(resolved);
          return results;
        });
    }, []));
}
