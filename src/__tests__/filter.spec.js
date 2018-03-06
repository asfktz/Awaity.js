/* eslint-disable no-unused-vars */

import fs from 'fs-extra';
import filter from '../filter';

test('should filter plain values', async () => {
  const nums = await filter([1, 2, 3], i => i % 2);
  expect(nums).toEqual([1, 3]);
});

test('should resolve iterable promise before reaching filterer', async () => {
  const nums = await filter(Promise.resolve([1, 2, 3]), i => i % 2);
  expect(nums).toEqual([1, 3]);
});

test('should resolve an array of promises before reaching filterer', async () => {
  const promises = [1, 2, 3].map(i => Promise.resolve(i));
  const nums = await filter(promises, i => i % 2);
  expect(nums).toEqual([1, 3]);
});

test('should resolve filterer\'s promise', async () => {
  const nums = await filter([1, 2, 3], i => Promise.resolve(i % 2));
  expect(nums).toEqual([1, 3]);
});
