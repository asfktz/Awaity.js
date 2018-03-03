const wrap = (fn, prevArgs) => (...newArgs) => {
  const args = prevArgs.concat(newArgs);

  return (args.length >= fn.length)
    ? fn(...args)
    : wrap(fn, args);
};

export default function curry(fn) {
  return wrap(fn, []);
}
