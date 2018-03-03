import { curry, flip } from '../__internal__/fp';
import fp from './utils/fp';
import map from '../map';

test('should flip the last arg to be the first', () => {
  const fn = (a, b, c) => [a, b, c];
  const flipped = flip(fn);

  expect(fn(1, 2, 3)).toEqual([1, 2, 3]);
  expect(flipped(1, 2, 3)).toEqual([3, 1, 2]);
});

test('should curry a function curreclty', () => {
  const fn = (a, b, c) => [a, b, c];
  const curried = curry(fn, 3);
  expect(curried(1, 2, 3)).toEqual([1, 2, 3]);
  expect(curried(1)(2, 3)).toEqual([1, 2, 3]);
  expect(curried(1, 2)(3)).toEqual([1, 2, 3]);
  expect(curried(1)(2)(3)).toEqual([1, 2, 3]);
});

test('should curry a flipped function curreclty', () => {
  const fn = (a, b, c) => [a, b, c];
  const curried = curry(flip(fn), 3);
  expect(curried(1, 2, 3)).toEqual([3, 1, 2]);
  expect(curried(1)(2, 3)).toEqual([3, 1, 2]);
  expect(curried(1, 2)(3)).toEqual([3, 1, 2]);
  expect(curried(1)(2)(3)).toEqual([3, 1, 2]);
  expect(curried()(1)()(2)()(3)).toEqual([3, 1, 2]);
});

test('should curry map', async () => {
  const mapper = i => i + '!';
  const arr = [1, 2, 3];

  expect(await fp.map(mapper, arr)).toEqual(['1!', '2!', '3!']);
  expect(await fp.map(mapper)(arr)).toEqual(['1!', '2!', '3!']);
});

test('should curry reduce', async () => {
  const reducer = (sum, i) => sum + i;
  const arr = [1, 2, 3];

  expect(await fp.reduce(reducer, 0, arr)).toEqual(6);
  expect(await fp.reduce(reducer)(0)(arr)).toEqual(6);
  expect(await fp.reduce(reducer, 0)(arr)).toEqual(6);
  expect(await fp.reduce()(reducer, 0)()(arr)).toEqual(6);
});
