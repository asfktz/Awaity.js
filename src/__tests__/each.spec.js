import each from '../each';

test('should iterate each serially', async () => {
  const iterable = [1, 2, 3, 4, 5, 6];

  let str = '';
  const returns = await each(iterable, async (i) => {
    const val = await Promise.resolve(`${i}!`);
    str += val;
  }, '');

  expect(returns).toBe(undefined);
  expect(str).toBe('1!2!3!4!5!6!');
});
