import filter from '../filter';
import { wait, measureTime, around } from './utils';

test.only('should limit concurrent promises to 2', async () => {
  const iterable = [1, 2, 3, 4, 5, 6];
  const limit = 2;
  const duration = 100;
  const expectedTime = (iterable.length * duration) / limit;

  const actualTime = await measureTime(async () => {
    const results = await filter(iterable, async (i) => {
      await wait(duration);
      return (i <= 3);
    }, { concurrency: limit });

    expect(results).toEqual([1, 2, 3]);
  });

  expect(around(actualTime, expectedTime, 50)).toBe(true);
});
