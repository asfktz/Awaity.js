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

test('Realworld | should return a list of direcrories', async () => {
  async function oldSchollGetDirectories(path) {
    const files = await fs.readdir(path);
    const pairs = await Promise.all(files.map(async (file) => {
      const stats = await fs.stat(file);
      return [stats.isDirectory(), file];
    }));
    return pairs
      .filter(([isDirectory, file]) => isDirectory)
      .map(([isDirectory, file]) => file);
  }

  async function getDirectories(path) {
    const files = await fs.readdir(path);
    return filter(files, async (filepath) => {
      const stats = await fs.stat(filepath);
      return stats.isDirectory();
    });
  }

  const expected = await oldSchollGetDirectories('.');
  const results = await getDirectories('.');

  expect(results).toEqual(expected);
});
