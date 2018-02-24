import props from '../props';

test('props', async () => {
  const results = await props({
    a: 'A',
    b: Promise.resolve('B'),
  });

  expect(results).toEqual({ a: 'A', b: 'B' });
});
