function curryWrap(fn, prevArgs) {
  return function () {
    const newArgs = Array.from(arguments);
    const args = prevArgs.concat(newArgs);

    return (args.length >= fn.originalLength)
      ? fn.apply(null, args)
      : curryWrap(fn, args);
  };
}

export function curry(fn) {
  return curryWrap(fn, []);
}

export function flip(fn) {
  function flipped() {
    const args = Array.from(arguments);
    const first = args.shift();
    return fn.apply(null, args.concat(first));
  }

  flipped.originalLength = fn.length;

  return flipped;
}
