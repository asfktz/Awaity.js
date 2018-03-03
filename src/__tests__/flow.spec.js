import flow from '../flow';
// import map from '../map';
// import reduce from '../reduce';

test('should pass an array', async () => {
  await flow(Promise.resolve([1, 2, 3]), [
    (nums) => {
      expect(nums).toEqual([1, 2, 3]);
    },
  ]);
});

test('should resolve an array of promises', async () => {
  const promises = [1, 2, 3].map(i => Promise.resolve(i));

  await flow(promises, [
    (nums) => {
      expect(nums).toEqual([1, 2, 3]);
    },
  ]);
});

test('should resolve a single promise', async () => {
  const promises = [1, 2, 3].map(i => Promise.resolve(i));

  await flow(Promise.resolve([1, 2, 3]), [
    (nums) => {
      expect(nums).toEqual([1, 2, 3]);
    },
  ]);

  await flow(Promise.resolve('TEST'), [
    (val) => {
      expect(val).toEqual('TEST');
    },
  ]);
});

test('should go thru each of the fns provided from top down', async () => {
  const calls = [];

  const results = await flow(Promise.resolve('A'), [
    (str) => {
      calls.push(1);
      return Promise.resolve(str + 'B');
    },
    (str) => {
      calls.push(2);
      return Promise.resolve(str + 'C');
    },
    (str) => {
      calls.push(3);
      return str + 'D';
    },
  ]);

  expect(results).toEqual('ABCD');
  expect(calls).toEqual([1, 2, 3]);
});
