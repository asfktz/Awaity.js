import map from '../map';
import { wait, measureTime, around } from './utils';

// test('should resolve mapper promise concurrently', async () => {
//   const results = await map([1, 2, 3], async (i) => {
//     const val = await Promise.resolve(`${i}!`);
//     return val;
//   });

//   expect(results).toEqual(['1!', '2!', '3!']);
// });

test('should resolve iterable of promises ', async () => {
  const promises = [1, 2, 3].map(i => Promise.resolve(i));

  const results = await map(promises, async (i) => {
    const val = await Promise.resolve(`${i}!`);
    return val;
  });

  expect(results).toEqual(['1!', '2!', '3!']);
});


// test('should limit concurrent promises to 2', async () => {
//   const iterable = [1, 2, 3, 4, 5, 6];
//   const limit = 2;
//   const duration = 100;
//   const expectedTime = (iterable.length * duration) / limit;

//   const actualTime = await measureTime(async () => {
//     const results = await map(iterable, async (i) => {
//       await wait(duration);
//       const val = await Promise.resolve(`${i}!`);
//       return val;
//     }, { concurrency: limit });

//     expect(results).toEqual(['1!', '2!', '3!', '4!', '5!', '6!']);
//   });

//   expect(around(actualTime, expectedTime, 60)).toBe(true);
// });
