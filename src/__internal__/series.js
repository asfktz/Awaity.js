
export default function series(reducer) {
  return (iterable) => {
    const initial = Promise.resolve([]);
    return iterable.reduce((chain, value, key) => {
      return chain.then(results => reducer(results, value, key, iterable));
    }, initial);
  };
}
