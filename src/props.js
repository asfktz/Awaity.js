export default function props(obj) {
  const keys = Object.keys(obj);
  const values = Object.values(obj);

  return Promise.all(values).then((resolvedVals) => {
    return resolvedVals.reduce((results, val, i) => {
      return { ...obj, [keys[i]]: val };
    }, {});
  });
}
