import reduce from '../reduce';
import { wait, measureTime, around } from './utils';

test('should reduce serially', async () => {
  const iterable = [1, 2, 3, 4, 5, 6];
  const duration = 100;
  const expectedTime = (iterable.length * duration);

  const actualTime = await measureTime(async () => {
    const results = await reduce(iterable, async (str, i) => {
      await wait(duration);
      const val = await Promise.resolve(`${i}!`);
      return str + val;
    }, '');

    expect(results).toEqual('1!2!3!4!5!6!');
  });

  expect(around(actualTime, expectedTime, 50)).toBe(true);
});
