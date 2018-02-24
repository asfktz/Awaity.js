import * as awaity from '../src/index';

test('all', async () => {
  const promises = [1, 2, 3].map(i => Promise.resolve(`${i}!`));
  const results = await awaity.all(promises);
  expect(results).toEqual(['1!', '2!', '3!']);
});

// test('Reduce', async (t) => {
//   const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
//   const results = await async.reduce(numbers, async (str, i) => {
//     console.log(i);
//     await wait(500 + (i * 50));
//     const val = await Promise.resolve(`${i}!`);
//     return str + val;
//   }, '');
// });
