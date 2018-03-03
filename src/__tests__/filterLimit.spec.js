import filterLimit from '../filterLimit';
import { wait, measureTime, around } from './utils';

test('should limit concurrent promises to 2', async () => {
  const iterable = [1, 2, 3, 4, 5, 6];
  const limit = 2;
  const duration = 100;
  const expectedTime = (iterable.length * duration) / limit;

  const actualTime = await measureTime(async () => {
    const results = await filterLimit(iterable, async (i) => {
      await wait(duration);
      return (i <= 3);
    }, limit);

    expect(results).toEqual([1, 2, 3]);
  });

  expect(around(actualTime, expectedTime, 60)).toBe(true);
});


test('should fail on first error ', async () => {
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
    await filterLimit(promises, async (i) => {
      return i === '3';
    });
  } catch (_error) {
    error = _error;
  }

  expect(error.message).toBe('2');
});
