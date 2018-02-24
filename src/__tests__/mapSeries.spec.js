import mapSeries from '../mapSeries';
import { wait, measureTime, around } from './utils';

test('should run serially', async () => {
  const iterable = [1, 2, 3, 4, 5, 6];
  const duration = 100;
  const expectedTime = (iterable.length * duration);

  const actualTime = await measureTime(async () => {
    const results = await mapSeries(iterable, async (i) => {
      await wait(duration);
      return Promise.resolve(`${i}!`);
    });

    expect(results).toEqual(['1!', '2!', '3!', '4!', '5!', '6!']);
  });

  expect(around(actualTime, expectedTime, 50)).toBe(true);
});
