export default function curry(fn) {
  const wrap = (fn, prevArgs) => (...newArgs) => {
    const args = prevArgs.concat(newArgs);

    return (args.length >= fn.length)
      ? fn.apply(null, args)
      : wrap(fn, args);
  }

  return wrap(fn, []);
}
