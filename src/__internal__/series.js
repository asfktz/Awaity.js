
export default function series(reducer, initial) {
  return (iterable) => {
    return iterable.reduce((chain, value, key) => {
      return chain.then(results => reducer(results, value, key, iterable));
    }, Promise.resolve(initial));
  };
}
