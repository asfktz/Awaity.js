function curryWrap(fn, len, prevArgs) {
  return function () {
    const newArgs = Array.from(arguments);
    const args = prevArgs.concat(newArgs);
    return (args.length >= len)
      ? fn.apply(null, args)
      : curryWrap(fn, len, args);
  };
}

export function curry(fn, len) {
  if (len === undefined) {
    throw new Error('must specify args\'s length');
  }

  return curryWrap(fn, len, []);
}

export function flip(fn) {
  return function () {
    const args = Array.from(arguments);
    const last = args.pop();
    return fn.apply(null, [].concat([last], args));
  };
}
