/* eslint-disable no-unused-vars */

import fs from 'fs-extra';
import { join } from 'path';
import { fp, regular } from '../utils/packages';

const basePath = join(__dirname, 'playground');

async function oldSchollGetDirectories(basePath) {
  const files = await fs.readdir(basePath);
  const pairs = await Promise.all(files.map(async (filename) => {
    const stats = await fs.stat(join(basePath, filename));
    return [stats.isDirectory(), filename];
  }));

  return pairs
    .filter(([isDirectory, file]) => isDirectory)
    .map(([isDirectory, file]) => file);
}

test('getDirectories Regular Mode', async () => {
  const { flow, filter } = regular;

  async function getDirectories(basePath) {
    return flow(basePath, [
      basePath => fs.readdir(basePath),
      files => filter(files, async (filename) => {
        const stats = await fs.stat(join(basePath, filename));
        return stats.isDirectory();
      }),
    ]);
  }

  const expected = await oldSchollGetDirectories(basePath);
  const results = await getDirectories(basePath);
  expect(results).toEqual(expected);
});

test('getDirectories FP Mode 1', async () => {
  const { flow, filter } = fp;

  async function getDirectories(basePath) {
    return flow([
      basePath => fs.readdir(basePath),
      files => filter(async (filename) => {
        const stats = await fs.stat(join(basePath, filename));
        return stats.isDirectory();
      }, files),
    ], basePath);
  }

  const expected = await oldSchollGetDirectories(basePath);
  const results = await getDirectories(basePath);
  expect(results).toEqual(expected);
});

test('getDirectories FP Mode 2', async () => {
  const { flow, filter } = fp;

  const getDirectories = (basePath) => {
    return flow([
      fs.readdir,
      filter(async (filename) => {
        const stats = await fs.stat(join(basePath, filename));
        return stats.isDirectory();
      }),
    ])(basePath);
  };

  const expected = await oldSchollGetDirectories(basePath);
  const results = await getDirectories(basePath);
  expect(results).toEqual(expected);
});
