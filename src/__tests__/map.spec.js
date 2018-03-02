import map from '../map';
import { wait, measureTime, around } from './utils';

test('should resolve mapper promise concurrently', async () => {
  const results = await map([1, 2, 3], async (i) => {
    const val = await Promise.resolve(`${i}!`);
    return val;
  });

  expect(results).toEqual(['1!', '2!', '3!']);
});

test('should resolve iterable of promises ', async () => {
  const promises = [1, 2, 3].map(i => Promise.resolve(i));

  const results = await map(promises, async (i) => {
    const val = await Promise.resolve(`${i}!`);
    return val;
  });

  expect(results).toEqual(['1!', '2!', '3!']);
});


test('should limit concurrent promises to 2', async () => {
  const iterable = [1, 2, 3, 4, 5, 6];
  const limit = 2;
  const duration = 100;
  const expectedTime = (iterable.length * duration) / limit;

  const actualTime = await measureTime(async () => {
    const results = await map(iterable, async (i) => {
      await wait(duration);
      const val = await Promise.resolve(`${i}!`);
      return val;
    }, { concurrency: limit });

    expect(results).toEqual(['1!', '2!', '3!', '4!', '5!', '6!']);
  });

  expect(around(actualTime, expectedTime, 60)).toBe(true);
});


test('should fail on first error', async () => {
  const promises = [100, 80, 50, 100, 100, 100].map((ms, i) => {
    return wait(ms).then(() => {
      if (i === 1 || i === 2) {
        throw new Error(i);
      }

      return i;
    });
  });

  let error;
  try {
    await map(promises, async (i) => {
      const val = await Promise.resolve(`${i}!`);
      return val;
    });
  } catch (_error) {
    error = _error;
  }

  expect(error.message).toBe('2');
});

test('should handle an array resolved from a single promise', async () => {
  const promise = Promise.resolve([1, 2, 3]);
  const results = await map(promise, async (i) => {
    const val = await Promise.resolve(`${i}!`);
    return val;
  });

  expect(results).toEqual(['1!', '2!', '3!']);
});

test('should defaults to identity when no mapper provided', async () => {
  const results = await map([1, 2, 3]);
  expect(results).toEqual([1, 2, 3]);
});
