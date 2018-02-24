import all from '../all';

test('all', async () => {
  const promises = [1, 2, 3].map(i => Promise.resolve(`${i}!`));
  const results = await all(promises);
  expect(results).toEqual(['1!', '2!', '3!']);
});
